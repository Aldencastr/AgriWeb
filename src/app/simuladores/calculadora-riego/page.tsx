'use client'

import { useState } from 'react'
import { Download, Share2, CheckCircle2, AlertCircle, Info, Loader2, Zap } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import { formatNumber, formatCurrency } from '@/lib/utils'
import { Analytics } from '@/services/analytics.service'
import { useToast } from '@/hooks/useToast'

// Soil properties database
const SOIL_PROPERTIES = {
  arenoso: { FC: 0.12, PMP: 0.05, density: 1.6, kSat: 50, name: 'Arenoso' },
  franco: { FC: 0.25, PMP: 0.12, density: 1.4, kSat: 15, name: 'Franco' },
  arcilloso: { FC: 0.40, PMP: 0.22, density: 1.2, kSat: 3, name: 'Arcilloso' },
}

// Crop coefficients (Kc) - simplified
const CROP_KC = {
  maiz: { Kc: 1.15, rootDepth: 1.0, name: 'Maíz' },
  frijol: { Kc: 1.05, rootDepth: 0.6, name: 'Frijol' },
  tomate: { Kc: 1.15, rootDepth: 0.8, name: 'Tomate' },
  cana: { Kc: 1.25, rootDepth: 1.5, name: 'Caña de azúcar' },
  cafe: { Kc: 1.05, rootDepth: 1.2, name: 'Café' },
  pastos: { Kc: 1.0, rootDepth: 0.5, name: 'Pastos' },
  otro: { Kc: 1.0, rootDepth: 0.8, name: 'Otro / Personalizado' },
}

// Irrigation efficiency defaults
const IRRIGATION_EFFICIENCY = {
  goteo: { Ea: 0.90, name: 'Goteo' },
  aspersion: { Ea: 0.75, name: 'Aspersión' },
  pivote: { Ea: 0.85, name: 'Pivote central' },
  gravedad: { Ea: 0.60, name: 'Gravedad (superficial)' },
}

type SoilType = keyof typeof SOIL_PROPERTIES
type CropType = keyof typeof CROP_KC
type IrrigationType = keyof typeof IRRIGATION_EFFICIENCY

interface FormData {
  tipoRiego: IrrigationType
  caudal: number
  tiempoRiego: number
  areaRegada: number
  tipoSuelo: SoilType
  ecAgua: number
  cultivo: CropType
  precioEnergia: number
  eficienciaBomba: number
}

interface Result {
  eficienciaAplicacion: number
  clasificacion: 'Excelente' | 'Buena' | 'Regular' | 'Mala'
  laminaNeta: number
  laminaBruta: number
  volumenTotal: number
  costoEstimado?: number
  profundidadHumedecimiento: number
  requerimientoLavado: number
  laminaNetaAjustada: number
  caudarRequerido?: number
  tiempoOptimo?: number
}

const initialForm: FormData = {
  tipoRiego: 'goteo',
  caudal: 5,
  tiempoRiego: 4,
  areaRegada: 1,
  tipoSuelo: 'franco',
  ecAgua: 0.5,
  cultivo: 'maiz',
  precioEnergia: 0.15,
  eficienciaBomba: 0.75,
}

export default function CalculadoraRiegoPage() {
  const [form, setForm] = useState<FormData>(initialForm)
  const [result, setResult] = useState<Result | null>(null)
  const [calculating, setCalculating] = useState(false)
  const { success, error } = useToast()

  const calculate = () => {
    setCalculating(true)
    Analytics.simulatorStart('calculadora-riego')

    // Simulate calculation delay
    setTimeout(() => {
      const soil = SOIL_PROPERTIES[form.tipoSuelo]
      const crop = CROP_KC[form.cultivo]
      const irrigation = IRRIGATION_EFFICIENCY[form.tipoRiego]

      // Volumen total aplicado (m³)
      const volumenTotal = form.caudal * form.tiempoRiego * 3600 / 1000

      // Lámina bruta (mm) = Volumen (m³) / Área (ha) * 10
      const laminaBruta = (volumenTotal / form.areaRegada) * 10

      // Eficiencia de aplicación
      const Ea = irrigation.Ea

      // Lámina neta (mm)
      const laminaNeta = laminaBruta * Ea

      // Agua disponible en suelo (mm/m)
      const AD = (soil.FC - soil.PMP) * 1000 // mm/m

      // Agua disponible en zona radicular (mm)
      const ADrz = AD * crop.rootDepth

      // Requerimiento de lavado (LR) - Ayers & Westcot
      // LR = ECw / (5 * ECe - ECw) donde ECe ≈ 4 * ECw para la mayoría de cultivos
      // Simplificado: LR = ECw / (5 * ECe_max - ECw)
      const ECe_max = 4 // dS/m típico para cultivos moderadamente sensibles
      const LR = form.ecAgua / (5 * ECe_max - form.ecAgua)
      const requerimientoLavado = Math.max(0, Math.min(0.3, LR))

      // Lámina neta ajustada por lavado
      const laminaNetaAjustada = laminaNeta * (1 - requerimientoLavado)

      // Profundidad de humedecimiento estimada
      // Para goteo: bulbo húmedo aproximado
      let profundidadHumedecimiento = 0
      if (form.tipoRiego === 'goteo') {
        // Aproximación empírica para goteo
        profundidadHumedecimiento = Math.min(crop.rootDepth * 1000, 600 + form.tiempoRiego * 50)
      } else {
        profundidadHumedecimiento = Math.min(crop.rootDepth * 1000, laminaNeta * 1.2)
      }

      // Costo energético estimado
      let costoEstimado: number | undefined
      if (form.precioEnergia > 0) {
        // Potencia hidráulica (kW) = Q (L/s) * H (m) / 102 * eficiencia
        // Asumimos altura manométrica típica de 30m para cálculo
        const H = 30 // m
        const potenciaHidraulica = (form.caudal * H) / (102 * form.eficienciaBomba)
        const energiaKWh = potenciaHidraulica * form.tiempoRiego
        costoEstimado = energiaKWh * form.precioEnergia
      }

      // Clasificación
      let clasificacion: Result['clasificacion']
      if (Ea >= 0.9) clasificacion = 'Excelente'
      else if (Ea >= 0.8) clasificacion = 'Buena'
      else if (Ea >= 0.7) clasificacion = 'Regular'
      else clasificacion = 'Mala'

      // Caudal y tiempo óptimo sugerido
      const laminaObjetivo = ADrz * 0.5 // Riego al 50% de capacidad de campo
      const caudarRequerido = (laminaObjetivo * form.areaRegada) / (10 * form.tiempoRiego * 3600 / 1000) * 1000
      const tiempoOptimo = (laminaObjetivo * form.areaRegada * 1000) / (form.caudal * 3600 / 1000 * Ea * 10) * 1000

      const newResult: Result = {
        eficienciaAplicacion: Ea * 100,
        clasificacion,
        laminaNeta: Math.round(laminaNeta * 10) / 10,
        laminaBruta: Math.round(laminaBruta * 10) / 10,
        volumenTotal: Math.round(volumenTotal * 100) / 100,
        costoEstimado: costoEstimado ? Math.round(costoEstimado * 100) / 100 : undefined,
        profundidadHumedecimiento: Math.round(profundidadHumedecimiento),
        requerimientoLavado: Math.round(requerimientoLavado * 1000) / 10,
        laminaNetaAjustada: Math.round(laminaNetaAjustada * 10) / 10,
        caudarRequerido: Math.round(caudarRequerido * 10) / 10,
        tiempoOptimo: Math.round(tiempoOptimo * 10) / 10,
      }

      setResult(newResult)
      setCalculating(false)
      success('Cálculo completado', 'Resultados generados correctamente')
      Analytics.simulatorComplete('calculadora-riego', { clasificacion, Ea: Ea * 100 })
    }, 500)
  }

  const handleChange = (field: keyof FormData, value: string | number) => {
    setForm(prev => ({ ...prev, [field]: value }))
    setResult(null)
  }

  const handleDownload = async () => {
    if (!result) return
    
    try {
      // Generate PDF using jsPDF
      const { jsPDF } = await import('jspdf')
      const doc = new jsPDF()
      
      doc.setFontSize(20)
      doc.text('Calculadora de Eficiencia de Riego - Reporte', 20, 20)
      
      doc.setFontSize(12)
      doc.text(`Fecha: ${new Date().toLocaleDateString('es-NI')}`, 20, 30)
      doc.text(`Tipo de riego: ${IRRIGATION_EFFICIENCY[form.tipoRiego].name}`, 20, 38)
      doc.text(`Suelo: ${SOIL_PROPERTIES[form.tipoSuelo].name}`, 20, 46)
      doc.text(`Cultivo: ${CROP_KC[form.cultivo].name}`, 20, 54)
      
      doc.setFontSize(14)
      doc.text('Resultados:', 20, 68)
      
      doc.setFontSize(11)
      doc.text(`Eficiencia de aplicación (Ea): ${result.eficienciaAplicacion.toFixed(1)}% (${result.clasificacion})`, 20, 76)
      doc.text(`Lámina bruta: ${result.laminaBruta} mm`, 20, 84)
      doc.text(`Lámina neta: ${result.laminaNeta} mm`, 20, 92)
      doc.text(`Lámina neta ajustada (lavado): ${result.laminaNetaAjustada} mm`, 20, 100)
      doc.text(`Volumen total aplicado: ${result.volumenTotal} m³`, 20, 108)
      doc.text(`Profundidad de humedecimiento: ${result.profundidadHumedecimiento} mm`, 20, 116)
      doc.text(`Requerimiento de lavado: ${result.requerimientoLavado}%`, 20, 124)
      
      if (result.costoEstimado) {
        doc.text(`Costo energético estimado: $${result.costoEstimado.toFixed(2)}`, 20, 132)
      }
      
      if (result.caudarRequerido && result.tiempoOptimo) {
        doc.text(`Sugerencia - Caudal óptimo: ${result.caudarRequerido} L/s`, 20, 140)
        doc.text(`Sugerencia - Tiempo óptimo: ${result.tiempoOptimo} h`, 20, 148)
      }

      doc.save(`calculadora-riego-${form.tipoRiego}-${Date.now()}.pdf`)
      Analytics.pdfDownload('calculadora-riego', 'calculadora-riego')
    } catch {
      error('Error', 'No se pudo generar el PDF')
    }
  }

  const handleShare = () => {
    if (!result) return
    
    const params = new URLSearchParams()
    params.set('tipoRiego', form.tipoRiego)
    params.set('caudal', form.caudal.toString())
    params.set('tiempoRiego', form.tiempoRiego.toString())
    params.set('areaRegada', form.areaRegada.toString())
    params.set('tipoSuelo', form.tipoSuelo)
    params.set('ecAgua', form.ecAgua.toString())
    params.set('cultivo', form.cultivo)
    params.set('precioEnergia', form.precioEnergia.toString())
    params.set('eficienciaBomba', form.eficienciaBomba.toString())
    
    const url = `${window.location.origin}/simuladores/calculadora-riego?${params.toString()}`
    
    if (navigator.share) {
      navigator.share({
        title: 'Calculadora de Eficiencia de Riego',
        text: `Mi cálculo: Ea ${result.eficienciaAplicacion.toFixed(1)}% (${result.clasificacion})`,
        url,
      })
    } else {
      navigator.clipboard.writeText(url)
      success('Enlace copiado', 'URL del cálculo copiada al portapapeles')
    }
  }

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950">
      <section className="py-12 lg:py-16 bg-gradient-to-b from-primary-50 to-surface-1 dark:from-primary-900/20 dark:to-neutral-950" aria-labelledby="calc-hero-title">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <Badge variant="secondary" className="mb-4">
              Simulador interactivo · 100% client-side
            </Badge>
            <h1 id="calc-hero-title" className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-neutral-900 dark:text-neutral-100 mb-4">
              Calculadora de <span className="text-primary-600 dark:text-primary-400">Eficiencia de Riego</span>
            </h1>
            <p className="text-lg text-neutral-600 dark:text-neutral-400">
              Calcula eficiencia de aplicación (Ea), lámina neta/bruta, volumen, costo energético y requerimiento de lavado.
              Compatible con goteo, aspersión, pivote y gravedad.
            </p>
          </div>
        </div>
      </section>

      <section className="py-12 lg:py-16 bg-surface-1">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Form Panel */}
            <div className="lg:col-span-1">
              <Card variant="elevated" className="sticky top-24 h-fit">
                <div className="p-6 space-y-5">
                  <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-2">
                    Parámetros de Entrada
                  </h2>

                  <div className="space-y-4">
                    <Select
                      label="Tipo de riego *"
                      value={form.tipoRiego}
                      onChange={(e) => handleChange('tipoRiego', e.target.value as IrrigationType)}
                      options={Object.entries(IRRIGATION_EFFICIENCY).map(([k, v]) => ({ value: k as IrrigationType, label: v.name }))}
                      placeholder="Seleccionar"
                    />

                    <div className="grid gap-4 sm:grid-cols-2">
                      <Input
                        label="Caudal (L/s) *"
                        type="number"
                        min="0.1"
                        max="1000"
                        step="0.1"
                        value={form.caudal}
                        onChange={(e) => handleChange('caudal', parseFloat(e.target.value) || 0)}
                        required
                      />
                      <Input
                        label="Tiempo de riego (h) *"
                        type="number"
                        min="0.1"
                        max="24"
                        step="0.1"
                        value={form.tiempoRiego}
                        onChange={(e) => handleChange('tiempoRiego', parseFloat(e.target.value) || 0)}
                        required
                      />
                    </div>

                    <Input
                      label="Área regada (ha) *"
                      type="number"
                      min="0.01"
                      max="10000"
                      step="0.01"
                      value={form.areaRegada}
                      onChange={(e) => handleChange('areaRegada', parseFloat(e.target.value) || 0)}
                      required
                    />

                    <Select
                      label="Tipo de suelo *"
                      value={form.tipoSuelo}
                      onChange={(e) => handleChange('tipoSuelo', e.target.value as SoilType)}
                      options={Object.entries(SOIL_PROPERTIES).map(([k, v]) => ({ value: k as SoilType, label: v.name }))}
                      placeholder="Seleccionar"
                    />

                    <div className="grid gap-4 sm:grid-cols-2">
                      <Input
                        label="EC del agua (dS/m)"
                        type="number"
                        min="0"
                        max="5"
                        step="0.1"
                        value={form.ecAgua}
                        onChange={(e) => handleChange('ecAgua', parseFloat(e.target.value) || 0)}
                        hint="Conductividad eléctrica del agua de riego"
                      />
                      <Select
                        label="Cultivo"
                        value={form.cultivo}
                        onChange={(e) => handleChange('cultivo', e.target.value as CropType)}
                        options={Object.entries(CROP_KC).map(([k, v]) => ({ value: k as CropType, label: v.name }))}
                        placeholder="Seleccionar"
                      />
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <Input
                        label="Precio energía ($/kWh)"
                        type="number"
                        min="0"
                        step="0.01"
                        value={form.precioEnergia}
                        onChange={(e) => handleChange('precioEnergia', parseFloat(e.target.value) || 0)}
                        hint="Opcional: para calcular costo energético"
                      />
                      <Input
                        label="Eficiencia bomba (0-1)"
                        type="number"
                        min="0.1"
                        max="1"
                        step="0.01"
                        value={form.eficienciaBomba}
                        onChange={(e) => handleChange('eficienciaBomba', parseFloat(e.target.value) || 0.75)}
                        hint="Típico: 0.70 - 0.85"
                      />
                    </div>

                    <Button onClick={calculate} disabled={calculating} className="w-full" size="lg">
                      {calculating ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin mr-2" />
                          Calculando...
                        </>
                      ) : (
                        'Calcular Eficiencia'
                      )}
                    </Button>

                    {result && (
                      <div className="flex gap-2">
                        <Button variant="outline" onClick={handleDownload} className="flex-1">
                          <Download className="h-4 w-4 mr-1" />
                          PDF
                        </Button>
                        <Button variant="ghost" onClick={handleShare} className="flex-1">
                          <Share2 className="h-4 w-4 mr-1" />
                          Compartir
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </Card>
            </div>

            {/* Results Panel */}
            <div className="lg:col-span-2 space-y-6">
              {!result ? (
                <Card variant="bordered" className="h-96 flex items-center justify-center">
                  <div className="text-center text-neutral-500 dark:text-neutral-400 w-full">
                    <Info className="h-16 w-16 mx-auto mb-4 opacity-50" />
                    <h3 className="text-lg font-medium mb-2">Completa el formulario</h3>
                    <p className="text-sm">Ingresa los parámetros de tu sistema de riego y presiona "Calcular Eficiencia" para ver los resultados.</p>
                  </div>
                </Card>
              ) : (
                <>
                  {/* Main Result Card */}
                  <Card variant={result.clasificacion === 'Excelente' || result.clasificacion === 'Buena' ? 'elevated' : 'bordered'} className="border-l-4" style={{ borderLeftColor: result.clasificacion === 'Excelente' ? '#10b981' : result.clasificacion === 'Buena' ? '#3b82f6' : result.clasificacion === 'Regular' ? '#f59e0b' : '#ef4444' }}>
                    <div className="p-6">
                      <div className="flex items-start justify-between gap-4 mb-6">
                        <div>
                          <h3 className="text-xl font-bold text-neutral-900 dark:text-neutral-100">
                            Resultado del Cálculo
                          </h3>
                          <p className="text-neutral-600 dark:text-neutral-400 mt-1">
                            {IRRIGATION_EFFICIENCY[form.tipoRiego].name} · {SOIL_PROPERTIES[form.tipoSuelo].name} · {CROP_KC[form.cultivo].name}
                          </p>
                        </div>
                        <Badge variant={
                          result.clasificacion === 'Excelente' ? 'success' :
                          result.clasificacion === 'Buena' ? 'default' :
                          result.clasificacion === 'Regular' ? 'warning' : 'destructive'
                        } className="text-base px-4 py-2 flex-shrink-0">
                          {result.clasificacion}
                          <span className="ml-2 font-mono">{result.eficienciaAplicacion.toFixed(1)}% Ea</span>
                        </Badge>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <ResultCard
                          label="Lámina Neta"
                          value={`${result.laminaNeta.toFixed(1)} mm`}
                          description="Agua efectiva en zona radicular"
                          icon="💧"
                        />
                        <ResultCard
                          label="Lámina Bruta"
                          value={`${result.laminaBruta.toFixed(1)} mm`}
                          description="Agua total aplicada"
                          icon="📏"
                        />
                        <ResultCard
                          label="Volumen Total"
                          value={`${formatNumber(result.volumenTotal)} m³`}
                          description="En el riego completo"
                          icon="📦"
                        />
                        <ResultCard
                          label="Prof. Humedecimiento"
                          value={`${result.profundidadHumedecimiento} mm`}
                          description="Zona mojada estimada"
                          icon="📍"
                        />
                      </div>
                    </div>
                  </Card>

                  {/* Details Grid */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <Card variant="bordered">
                      <div className="p-6">
                        <h4 className="font-semibold text-neutral-900 dark:text-neutral-100 mb-4 flex items-center gap-2">
                          <AlertCircle className="h-5 w-5 text-orange-500" />
                          Requerimiento de Lavado
                        </h4>
                        <div className="space-y-3 text-sm">
                          <div className="flex justify-between">
                            <span className="text-neutral-600 dark:text-neutral-400">EC del agua</span>
                            <span className="font-mono font-medium">{form.ecAgua} dS/m</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-neutral-600 dark:text-neutral-400">Fracción de lavado (LR)</span>
                            <span className="font-mono font-medium text-orange-600 dark:text-orange-400">{result.requerimientoLavado.toFixed(1)}%</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-neutral-600 dark:text-neutral-400">Lámina neta ajustada</span>
                            <span className="font-mono font-medium text-primary-600 dark:text-primary-400">{result.laminaNetaAjustada.toFixed(1)} mm</span>
                          </div>
                          <p className="text-xs text-neutral-500 dark:text-neutral-500">
                            Basado en método Ayers & Westcot. LR = ECw / (5×ECe - ECw). 
                            Ajusta la lámina neta para evitar acumulación de sales.
                          </p>
                        </div>
                      </div>
                    </Card>

                    <Card variant="bordered">
                      <div className="p-6">
                        <h4 className="font-semibold text-neutral-900 dark:text-neutral-100 mb-4 flex items-center gap-2">
                          <Info className="h-5 w-5 text-blue-500" />
                          Agua Disponible en Suelo
                        </h4>
                        <div className="space-y-3 text-sm">
                          <div className="flex justify-between">
                            <span className="text-neutral-600 dark:text-neutral-400">Capacidad de campo (FC)</span>
                            <span className="font-mono font-medium">{(SOIL_PROPERTIES[form.tipoSuelo].FC * 100).toFixed(0)}%</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-neutral-600 dark:text-neutral-400">Punto de marchitez (PMP)</span>
                            <span className="font-mono font-medium">{(SOIL_PROPERTIES[form.tipoSuelo].PMP * 100).toFixed(0)}%</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-neutral-600 dark:text-neutral-400">Agua disponible (AD)</span>
                            <span className="font-mono font-medium">{(SOIL_PROPERTIES[form.tipoSuelo].FC - SOIL_PROPERTIES[form.tipoSuelo].PMP) * 1000} mm/m</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-neutral-600 dark:text-neutral-400">AD en zona radicular</span>
                            <span className="font-mono font-medium text-primary-600 dark:text-primary-400">{(SOIL_PROPERTIES[form.tipoSuelo].FC - SOIL_PROPERTIES[form.tipoSuelo].PMP) * 1000 * CROP_KC[form.cultivo].rootDepth} mm</span>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </div>

                  {/* Recommendations */}
                  {result.caudarRequerido && result.tiempoOptimo && (
                    <Card variant="elevated">
                      <div className="p-6">
                        <h4 className="font-semibold text-neutral-900 dark:text-neutral-100 mb-4 flex items-center gap-2">
                          <CheckCircle2 className="h-5 w-5 text-green-500" />
                          Sugerencias de Optimización
                        </h4>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="p-4 rounded-lg bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800">
                            <p className="text-sm text-green-700 dark:text-green-300 mb-1">Caudal óptimo sugerido</p>
                            <p className="text-2xl font-bold text-green-600 dark:text-green-400">{result.caudarRequerido} L/s</p>
                            <p className="text-xs text-green-600 dark:text-green-400">Para lámina objetivo del 50% AD</p>
                          </div>
                          <div className="p-4 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
                            <p className="text-sm text-blue-700 dark:text-blue-300 mb-1">Tiempo óptimo sugerido</p>
                            <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{result.tiempoOptimo.toFixed(1)} h</p>
                            <p className="text-xs text-blue-600 dark:text-blue-400">Con caudal actual</p>
                          </div>
                        </div>
                      </div>
                    </Card>
                  )}

                  {/* Cost Card */}
                  {result.costoEstimado !== undefined && (
                    <Card variant="bordered">
                      <div className="p-6">
                        <h4 className="font-semibold text-neutral-900 dark:text-neutral-100 mb-4 flex items-center gap-2">
                          <Zap className="h-5 w-5 text-yellow-500" />
                          Costo Energético Estimado
                        </h4>
                        <div className="text-3xl font-bold text-yellow-600 dark:text-yellow-400">
                          ${result.costoEstimado.toFixed(2)} / riego
                        </div>
                        <p className="text-sm text-neutral-500 dark:text-neutral-500 mt-2">
                          Basado en H = 30m, eficiencia bomba {form.eficienciaBomba}, precio ${form.precioEnergia}/kWh.
                          Costo por ha: ${(result.costoEstimado / form.areaRegada).toFixed(2)}
                        </p>
                      </div>
                    </Card>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

function ResultCard({ label, value, description, icon }: { label: string; value: string; description: string; icon: string }) {
  return (
    <div className="p-4 rounded-lg bg-neutral-50 dark:bg-neutral-800/50 border border-surface-border">
      <div className="flex items-center gap-2 mb-2">
        <span className="text-2xl">{icon}</span>
        <span className="text-sm text-neutral-600 dark:text-neutral-400">{label}</span>
      </div>
      <p className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 font-mono">{value}</p>
      <p className="text-xs text-neutral-500 dark:text-neutral-500">{description}</p>
    </div>
  )
}