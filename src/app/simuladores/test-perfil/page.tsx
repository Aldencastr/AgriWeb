'use client'

import { useState } from 'react'
import { Brain, Zap, Droplets, Cpu, Map, Leaf, ArrowRight, CheckCircle2, Loader2, BarChart3, Target } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import { Analytics } from '@/services/analytics.service'
import { useToast } from '@/hooks/useToast'

const QUESTIONS: Question[] = [
  { id: 1, dimension: 'agua', text: 'Disfruto analizar datos de humedad, caudales y diseñar sistemas de riego eficientes.', icon: Droplets },
  { id: 2, dimension: 'maquinaria', text: 'Me motiva programar tractores, drones o robots agrícolas y optimizar flotas de maquinaria.', icon: Cpu },
  { id: 3, dimension: 'datos', text: 'Me gusta programar en Python/R y buscar patrones en imágenes satelitales o sensores IoT.', icon: BarChart3 },
  { id: 4, dimension: 'gis', text: 'Me atrae mapear, zonificar suelos y cultivos, y decidir dónde producir qué usando SIG/GIS.', icon: Map },
  { id: 5, dimension: 'gestion', text: 'Veo la finca como una empresa: analizo costos, mercados, financiamiento y rentabilidad.', icon: Zap },
  { id: 6, dimension: 'ambiente', text: 'Priorizo huella hídrica, carbono, biodiversidad y agricultura regenerativa en cada decisión.', icon: Leaf },
  { id: 7, dimension: 'agua', text: 'Me interesa modelar acuíferos, cuencas hidrológicas y predecir disponibilidad de agua futura.', icon: Droplets },
  { id: 8, dimension: 'maquinaria', text: 'Disfruto el diagnóstico de fallas en motores, hidráulica y sistemas de transmisión agrícola.', icon: Cpu },
  { id: 9, dimension: 'datos', text: 'Creo que los datos (NDVI, clima, suelo) son la clave para decisiones agronómicas precisas.', icon: BarChart3 },
  { id: 10, dimension: 'gis', text: 'Me gusta volar drones, procesar nubes de puntos y generar modelos digitales de terreno.', icon: Map },
  { id: 11, dimension: 'gestion', text: 'Me veo liderando proyectos agroindustriales, buscando financiamiento y escalando soluciones.', icon: Zap },
  { id: 12, dimension: 'ambiente', text: 'Quiero diseñar sistemas productivos que regeneren suelos, capturen carbono y protejan cuencas.', icon: Leaf },
]

const DIMENSIONS = [
  { key: 'agua', label: 'Agua & Suelo', icon: Droplets, color: 'tech' },
  { key: 'maquinaria', label: 'Maquinaria & Automatización', icon: Cpu, color: 'primary' },
  { key: 'datos', label: 'Datos & Modelado', icon: BarChart3, color: 'tech' },
  { key: 'gis', label: 'Territorio & GIS', icon: Map, color: 'primary' },
  { key: 'gestion', label: 'Gestión & Negocios', icon: Zap, color: 'tech' },
  { key: 'ambiente', label: 'Sostenibilidad & Ambiente', icon: Leaf, color: 'primary' },
]

const ROLES: Role[] = [
  { id: 'riego', title: 'Especialista en Riego y Gestión Hídrica', dimensions: ['agua', 'gis'], description: 'Diseña, automatiza y optimiza sistemas de riego a escala finca y cuenca. Modela acuíferos y gestiona recursos hídricos.', skills: ['Hidráulica', 'Automatización SCADA/IoT', 'Modelado hidrológico (HEC-RAS, MODFLOW)', 'Normativa hídrica'], subjects: ['Hidráulica I-II', 'Ingeniería de Riego I-II', 'Hidrología Subterránea', 'SIG', 'Estaciones de Bombeo'], icon: Droplets, gradient: 'from-tech-500 to-tech-600' },
  { id: 'precision', title: 'Ingeniero de Agricultura de Precisión', dimensions: ['datos', 'gis', 'maquinaria'], description: 'Integra sensores, drones, satélites y maquinaria autónoma para dosificación variable (VRA) y monitoreo en tiempo real.', skills: ['Teledetección (NDVI/EVI)', 'Machine Learning aplicado', 'ISOBUS/CAN', 'Plataformas AgTech'], subjects: ['Agricultura de Precisión (opt.)', 'SIG', 'Mecanización Agrícola I-II', 'Programación', 'Estadística'], icon: Cpu, gradient: 'from-primary-500 to-primary-600' },
  { id: 'data', title: 'Data Scientist Agro', dimensions: ['datos', 'gis'], description: 'Construye modelos predictivos de rendimiento, estrés hídrico, plagas y mercados. Dashboards para toma de decisión.', skills: ['Python (pandas, sklearn, xgboost)', 'Series temporales', 'SQL/PostgreSQL', 'Power BI/Tableau', 'GEE'], subjects: ['Estadística', 'Métodos Numéricos', 'Programación', 'SIG', 'Agricultura de Precisión (opt.)'], icon: BarChart3, gradient: 'from-tech-500 to-primary-500' },
  { id: 'ambiental', title: 'Consultor Ambiental y de Sostenibilidad', dimensions: ['ambiente', 'agua', 'gestion'], description: 'Estudios de impacto, huella hídrica/carbono, certificaciones (GlobalGAP, Rainforest), agricultura regenerativa.', skills: ['LCA (ACV)', 'ISO 14001', 'BPA', 'Economía circular', 'Créditos de carbono'], subjects: ['Ambiente y Cambio Climático', 'Buenas Prácticas Agrícolas', 'Ingeniería Económica', 'Hidrología'], icon: Leaf, gradient: 'from-green-500 to-green-600' },
  { id: 'emprendedor', title: 'Emprendedor AgTech / Fundador', dimensions: ['gestion', 'datos', 'maquinaria'], description: 'Crea startups: sensores IoT, marketplaces, trazabilidad blockchain, bioinsumos, plataformas de servicios.', skills: ['Lean Startup', 'Fundraising', 'Producto', 'Desarrollo de negocio', 'Tecnología'], subjects: ['Innovación y Emprendimiento', 'Gerencia Empresarial', 'Formulación de Proyectos', 'Programación'], icon: Zap, gradient: 'from-yellow-500 to-orange-500' },
  { id: 'estructuras', title: 'Ingeniero de Estructuras Rurales y Suelos', dimensions: ['maquinaria', 'agua', 'gestion'], description: 'Diseña galpones, silos, invernaderos, caminos, cimentaciones. Mecánica de suelos, materiales, normativa sísmica.', skills: ['AutoCAD Civil 3D', 'Revit', 'Mecánica de suelos (CBR, triaxial)', 'Normativa NIC/INEN', 'Presupuestos'], subjects: ['Resistencia de Materiales', 'Mecánica de Suelos', 'Construcciones Rurales', 'Materiales', 'Topografía I-II'], icon: Target, gradient: 'from-amber-500 to-amber-600' },
]

const SCALE_LABELS = ['En desacuerdo', 'Poco de acuerdo', 'Neutral', 'De acuerdo', 'Muy de acuerdo']

// Type definitions
type Question = { id: number; dimension: string; text: string; icon: React.ElementType }
type Role = { id: string; title: string; dimensions: string[]; description: string; skills: string[]; subjects: string[]; icon: React.ElementType; gradient: string }
type RoleWithMatch = Role & { match: number }

function IconRenderer({ icon: Icon, className }: { icon: React.ElementType; className?: string }) {
  return <Icon className={className} />
}

function getIconGradient(icon: React.ElementType) {
  if (icon === Droplets || icon === Leaf) return 'linear-gradient(135deg, #10b981, #059669)'
  if (icon === Cpu || icon === Target) return 'linear-gradient(135deg, #3b82f6, #2563eb)'
  if (icon === BarChart3 || icon === Map) return 'linear-gradient(135deg, #8b5cf6, #7c3aed)'
  if (icon === Zap) return 'linear-gradient(135deg, #f59e0b, #d97706)'
  return 'linear-gradient(135deg, #ec4899, #db2777)'
}

function ResultsView({ results, restart }: { results: { scores: Record<string, number>; topRoles: RoleWithMatch[]; radarData: { axis: string; value: number }[] }; restart: () => void }) {
  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950">
      <section className="py-12 lg:py-16 bg-gradient-to-b from-primary-50 to-surface-1 dark:from-primary-900/20 dark:to-neutral-950">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <Badge variant="success" className="mb-4">Test completado</Badge>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 dark:text-neutral-100 mb-4">
            Tu Perfil Profesional <span className="text-primary-600 dark:text-primary-400">Agrícola</span>
          </h1>
          <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
            Basado en tus respuestas, estos son los 3 roles con mayor afinidad. 
            El porcentaje indica cuánto coinciden tus intereses con cada perfil.
          </p>
        </div>
      </section>

      <section className="py-12 lg:py-16 bg-surface-1">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Radar Chart */}
          <Card variant="elevated" className="mb-8 max-w-2xl mx-auto">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-center mb-6">Tu Radar de Afinidad</h3>
              <div className="relative h-80" style={{ width: '100%' }}>
                <svg viewBox="0 0 400 400" className="w-full h-full" style={{ transform: 'rotate(-90deg)' }}>
                  {[20, 40, 60, 80, 100].map(v => (
                    <circle key={v} cx="200" cy="200" r={v * 1.5} fill="none" stroke="#e5e7eb" strokeWidth="1" />
                  ))}
                  {DIMENSIONS.map((d, i) => {
                    const angle = (i / DIMENSIONS.length) * 2 * Math.PI - Math.PI / 2
                    const x = 200 + Math.cos(angle) * 150
                    const y = 200 + Math.sin(angle) * 150
                    return (
                      <g key={d.key}>
                        <line x1="200" y1="200" x2={x} y2={y} stroke="#e5e7eb" strokeWidth="1" />
                        <text x={x * 1.15} y={y * 1.15} textAnchor="middle" dominantBaseline="middle" fontSize="11" fill="#6b7280" fontWeight="600">{d.label}</text>
                      </g>
                    )
                  })}
                  <polygon
                    points={results.radarData.map((d, i) => {
                      const angle = (i / DIMENSIONS.length) * 2 * Math.PI - Math.PI / 2
                      const r = d.value * 1.5
                      return `${200 + Math.cos(angle) * r},${200 + Math.sin(angle) * r}`
                    }).join(' ')}
                    fill="url(#radarGradient)" stroke="#10b981" strokeWidth="2" fillOpacity="0.15"
                  />
                  <defs>
                    <linearGradient id="radarGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#10b981" stopOpacity="0.3" />
                      <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.1" />
                    </linearGradient>
                  </defs>
                  {results.radarData.map((d, i) => {
                    const angle = (i / DIMENSIONS.length) * 2 * Math.PI - Math.PI / 2
                    const r = d.value * 1.5
                    const x = 200 + Math.cos(angle) * r
                    const y = 200 + Math.sin(angle) * r
                    return <circle key={i} cx={x} cy={y} r={5} fill="#10b981" />
                  })}
                </svg>
              </div>
            </div>
          </Card>

          {/* Top Roles */}
          <div className="grid gap-6 md:grid-cols-3">
            {results.topRoles.map((role, i) => (
              <Card key={role.id} variant="elevated" className="relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br" style={{ background: role.gradient, opacity: 0.05 }} />
                <div className="relative p-6 h-full flex flex-col">
                  <div className="flex items-center justify-between mb-4">
                    <div className="h-12 w-12 rounded-xl flex items-center justify-center text-white" style={{ background: role.gradient }}>
                      <IconRenderer icon={role.icon} className="h-7 w-7" />
                    </div>
                    <Badge variant="success" className="text-base">
                      Match {role.match}%
                    </Badge>
                  </div>
                  <h3 className="text-xl font-bold text-neutral-900 dark:text-neutral-100 mb-2">
                    {role.title}
                  </h3>
                  <p className="text-neutral-600 dark:text-neutral-400 text-sm mb-4 flex-1">
                    {role.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {role.skills.slice(0, 4).map((s, si) => (
                      <Badge key={si} variant="outline" className="text-xs">{s}</Badge>
                    ))}
                  </div>
                  <div className="mt-auto pt-4 border-t border-surface-border">
                    <p className="text-xs text-neutral-500 dark:text-neutral-500 mb-2">Asignaturas clave:</p>
                    <div className="flex flex-wrap gap-1">
                      {role.subjects.slice(0, 3).map((s, si) => (
                        <Badge key={si} variant="secondary" className="text-[10px]">{s}</Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* All Scores */}
          <Card variant="bordered" className="mt-8">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-4">
                Desglose por Dimensión
              </h3>
              <div className="space-y-4">
                {DIMENSIONS.map(d => (
                  <div key={d.key} className="flex items-center gap-4">
                    <IconRenderer icon={d.icon} className={cn('h-5 w-5', d.color === 'tech' ? 'text-tech-500' : 'text-primary-500')} />
                    <div className="flex-1">
                      <div className="flex justify-between text-sm mb-1">
                        <span className="font-medium">{d.label}</span>
                        <span className="font-mono font-bold text-primary-600 dark:text-primary-400">{results.scores[d.key]}%</span>
                      </div>
                      <div className="h-2 bg-neutral-200 dark:bg-neutral-700 rounded-full overflow-hidden">
                        <div className="h-full rounded-full" style={{ width: `${results.scores[d.key]}%`, background: d.color === 'tech' ? 'linear-gradient(90deg, #3b82f6, #10b981)' : 'linear-gradient(90deg, #10b981, #3b82f6)' }} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>

          <div className="text-center mt-8">
            <Button variant="outline" onClick={restart} className="w-full sm:w-auto">
              <ArrowRight className="h-4 w-4 mr-2" />
              Volver a hacer el test
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}

function TestView({ step, answers, currentQuestion, progress, calculating, handleAnswer, setStep, QUESTIONS }: {
  step: number
  answers: Record<number, number>
  currentQuestion: Question
  progress: number
  calculating: boolean
  handleAnswer: (value: number) => void
  setStep: (fn: (prev: number) => number) => void
  QUESTIONS: Question[]
}) {
  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950">
      <section className="py-8 lg:py-12 bg-gradient-to-b from-primary-50 to-surface-1 dark:from-primary-900/20 dark:to-neutral-950">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          {/* Progress */}
          <div className="mb-8">
            <div className="flex justify-between text-sm mb-2">
              <span className="font-medium text-neutral-900 dark:text-neutral-100">Pregunta {step + 1} de {QUESTIONS.length}</span>
              <span className="font-mono text-primary-600 dark:text-primary-400">{Math.round(progress)}%</span>
            </div>
            <div className="h-2 bg-neutral-200 dark:bg-neutral-700 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-primary-500 to-tech-500 rounded-full transition-all duration-300" style={{ width: `${progress}%` }} />
            </div>
          </div>

          {/* Question Card */}
          <Card variant="elevated">
            <div className="p-6 sm:p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="h-14 w-14 rounded-xl flex items-center justify-center" style={{ background: getIconGradient(currentQuestion.icon) }}>
                  <IconRenderer icon={currentQuestion.icon} className="h-7 w-7 text-white" />
                </div>
                <div>
                  <span className="text-xs font-medium text-primary-600 dark:text-primary-400 uppercase tracking-wide">
                    {DIMENSIONS.find(d => d.key === currentQuestion.dimension)?.label}
                  </span>
                </div>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-8 leading-relaxed">
                {currentQuestion.text}
              </h2>

              {/* Scale Buttons */}
              <div className="grid grid-cols-5 gap-3">
                {SCALE_LABELS.map((label, i) => (
                  <button
                    key={i}
                    onClick={() => handleAnswer(i + 1)}
                    disabled={calculating}
                    className={cn(
                      'py-4 px-3 rounded-xl text-sm font-medium transition-all duration-200',
                      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500',
                      answers[currentQuestion.id] === i + 1
                        ? 'bg-primary-600 text-white shadow-lg scale-105'
                        : 'bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 hover:border-primary-300 dark:hover:border-primary-700'
                    )}
                    aria-pressed={answers[currentQuestion.id] === i + 1}
                    aria-label={`${label} (${i + 1})`}
                  >
                    <span className="block font-bold">{i + 1}</span>
                    <span className="block text-[10px] opacity-75 mt-1">{label}</span>
                  </button>
                ))}
              </div>
            </div>
          </Card>

          {/* Navigation */}
          <div className="flex justify-between mt-6">
            <Button
              variant="ghost"
              onClick={() => setStep(prev => Math.max(0, prev - 1))}
              disabled={step === 0 || calculating}
            >
              Anterior
            </Button>
            <div className="text-center text-sm text-neutral-500 dark:text-neutral-400">
              {calculating ? (
                <span className="flex items-center justify-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Calculando resultados...
                </span>
              ) : step === QUESTIONS.length - 1 ? (
                'Selecciona para ver tus resultados'
              ) : (
                'Selecciona una opción para continuar'
              )}
            </div>
            <Button
              variant="ghost"
              onClick={() => setStep(prev => Math.min(QUESTIONS.length - 1, prev + 1))}
              disabled={step === QUESTIONS.length - 1 || calculating}
            >
              Siguiente
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}

export default function TestPerfilPage() {
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<Record<number, number>>({})
  const [results, setResults] = useState<{ scores: Record<string, number>; topRoles: RoleWithMatch[]; radarData: { axis: string; value: number }[] } | null>(null)
  const [calculating, setCalculating] = useState(false)
  const { success } = useToast()

  const currentQuestion = QUESTIONS[step]
  const progress = ((step + 1) / QUESTIONS.length) * 100

  const handleAnswer = (value: number) => {
    setAnswers(prev => ({ ...prev, [currentQuestion.id]: value }))
    if (step < QUESTIONS.length - 1) {
      setTimeout(() => setStep(prev => prev + 1), 300)
    } else {
      calculateResults()
    }
  }

  const calculateResults = () => {
    setCalculating(true)
    Analytics.simulatorStart('test-perfil')

    setTimeout(() => {
      const scores: Record<string, number> = {}
      DIMENSIONS.forEach(d => { scores[d.key] = 0 })
      
      Object.entries(answers).forEach(([qId, value]) => {
        const question = QUESTIONS.find(q => q.id === parseInt(qId))
        if (question) {
          scores[question.dimension] = (scores[question.dimension] || 0) + value
        }
      })

      const maxPerDim = QUESTIONS.filter(q => q.dimension === DIMENSIONS[0].key).length * 5
      Object.keys(scores).forEach(k => {
        scores[k] = Math.round((scores[k] / maxPerDim) * 100)
      })

      const roleMatches = ROLES.map(role => {
        const relevantScores = role.dimensions.map(d => scores[d] || 0)
        const match = Math.round(relevantScores.reduce((a, b) => a + b, 0) / relevantScores.length)
        return { ...role, match }
      }).sort((a, b) => b.match - a.match)

      const topRoles = roleMatches.slice(0, 3)

      const radarData = DIMENSIONS.map(d => ({
        axis: d.label,
        value: scores[d.key] || 0,
      }))

      setResults({ scores, topRoles, radarData })
      setCalculating(false)
      success('Test completado', 'Descubre tus 3 roles ideales')
      Analytics.simulatorComplete('test-perfil', { topRole: topRoles[0].id, match: topRoles[0].match })
    }, 800)
  }

  const restart = () => {
    setStep(0)
    setAnswers({})
    setResults(null)
  }

  if (results) {
    return <ResultsView results={results} restart={restart} />
  }

  return <TestView step={step} answers={answers} currentQuestion={currentQuestion} progress={progress} calculating={calculating} handleAnswer={handleAnswer} setStep={setStep} QUESTIONS={QUESTIONS} />
}