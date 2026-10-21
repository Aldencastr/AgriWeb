'use client'

import { Video, Cpu, Droplets, Map, GraduationCap, BarChart3, Zap, Leaf } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

const careerAreas = [
  {
    icon: Droplets,
    title: 'Gestión Hídrica y Riego',
    description: 'Diseño de sistemas de riego por goteo, aspersión, pivote y gravedad. Modelado hidrológico, eficiencia de aplicación, automatización SCADA/IoT.',
    subjects: ['Hidráulica I-II', 'Ingeniería de Riego I-II', 'Hidrología Subterránea', 'Estaciones de Bombeo'],
    careers: ['Ingeniero de Riego', 'Especialista en Gestión de Agua', 'Consultor Hidrológico'],
    color: 'tech',
  },
  {
    icon: Cpu,
    title: 'Maquinaria de Precisión y Automatización',
    description: 'Tractores con guía RTK (±2 cm), dosificación variable (VRA), robótica de cosecha, telemetría de flota (ISOBUS/CAN), electromovilidad agrícola.',
    subjects: ['Mecanización Agrícola I-II', 'Fuerza Motriz', 'Teoría de Mecanismos', 'Electrotecnia (opt.)'],
    careers: ['Especialista en Maquinaria', 'Ingeniero de Automatización', 'Gerente de Flota'],
    color: 'primary',
  },
  {
    icon: Map,
    title: 'Geomática, SIG y Teledetección',
    description: 'Análisis espacial con QGIS/ArcGIS/GEE, drones multiespectrales, índices NDVI/EVI/SAVI, zonificación de suelos, agricultura por ambientes.',
    subjects: ['Sistemas de Información Geográfica', 'Topografía I-II', 'Agricultura de Precisión (opt.)'],
    careers: ['Analista GIS', 'Especialista en Teledetección', 'Consultor en Agricultura Digital'],
    color: 'primary',
  },
  {
    icon: BarChart3,
    title: 'Data Science & Agricultura de Precisión',
    description: 'Modelos predictivos de rendimiento, detección de plagas/estrés hídrico, dashboards para toma de decisión, ML aplicado a series temporales satelitales.',
    subjects: ['Estadística', 'Métodos Numéricos', 'Programación', 'Agricultura de Precisión (opt.)'],
    careers: ['Data Scientist Agro', 'Analista de Rendimiento', 'Especialista en AgTech'],
    color: 'tech',
  },
  {
    icon: GraduationCap,
    title: 'Estructuras Rurales y Mecánica de Suelos',
    description: 'Diseño de galpones, silos, invernaderos, caminos rurales. Ensayos de compactación, CBR, cortante, cimentaciones superficiales y profundas.',
    subjects: ['Resistencia de Materiales', 'Mecánica de Suelos', 'Construcciones Rurales', 'Materiales'],
    careers: ['Ingeniero Estructural Rural', 'Especialista en Cimentaciones', 'Inspector de Obras'],
    color: 'primary',
  },
  {
    icon: Leaf,
    title: 'Ambiente, Sostenibilidad y Cambio Climático',
    description: 'Estudios de impacto ambiental, huella hídrica/carbono, agricultura regenerativa, BPA, certificaciones (GlobalGAP, Rainforest Alliance), economía circular.',
    subjects: ['Ambiente y Cambio Climático', 'Buenas Prácticas Agrícolas', 'Ingeniería Económica'],
    careers: ['Consultor Ambiental', 'Auditor de Certificaciones', 'Especialista en Sostenibilidad'],
    color: 'tech',
  },
]

const colorStyles = {
  primary: 'bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300',
  tech: 'bg-tech-100 dark:bg-tech-900/30 text-tech-700 dark:text-tech-300',
}

const futureTrends = [
  { title: 'Agricultura Regenerativa + Carbono', desc: 'Medición de carbono en suelo para créditos de carbono', icon: Leaf },
  { title: 'Robótica de Campo Autónoma', desc: 'Weeding, cosecha selectiva, monitoreo 24/7 sin operador', icon: Cpu },
  { title: 'Trazabilidad Blockchain', desc: 'Desde semilla a mesa: transparencia total para consumidor', icon: BarChart3 },
  { title: 'Riego Deficitario Controlado por IA', desc: 'Decisión de riego optimizada por modelos predictivos', icon: Droplets },
  { title: 'Gemelos Digitales de Cuenca/Finca', desc: 'Simulación de escenarios climáticos y de manejo', icon: Map },
]

export function CarreraSection() {
  return (
    <section id="carrera" className="py-20 lg:py-28 bg-neutral-50 dark:bg-neutral-900/50" aria-labelledby="carrera-title">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge variant="secondary" className="mb-4">
            6 áreas de especialización técnica
          </Badge>
          <h2 id="carrera-title" className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-neutral-900 dark:text-neutral-100 mb-6">
            Áreas de <span className="text-primary-600 dark:text-primary-400">Estudio y Especialización</span>
          </h2>
          <p className="text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed">
            El Plan 2026 integra ingeniería clásica con tecnologías emergentes. Cada área combina fundamentos sólidos 
            con herramientas digitales de vanguardia.
          </p>
        </div>

        {/* Career Areas Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mb-16">
          {careerAreas.map((area, i) => (
            <Card key={i} variant="bordered" hover className="h-full">
              <div className={cn(
                'h-12 w-12 rounded-xl flex items-center justify-center mb-4',
                colorStyles[area.color as keyof typeof colorStyles]
              )}>
                <area.icon className="h-6 w-6" aria-hidden="true" />
              </div>
              <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-2">
                {area.title}
              </h3>
              <p className="text-neutral-600 dark:text-neutral-400 mb-4 leading-relaxed">
                {area.description}
              </p>
              
              <div className="space-y-3 mb-4">
                <h4 className="text-sm font-medium text-neutral-700 dark:text-neutral-300">Asignaturas clave:</h4>
                <div className="flex flex-wrap gap-2">
                  {area.subjects.map((s) => (
                    <Badge key={s} variant="outline" className="text-xs">
                      {s}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                  ¿Dónde trabajan los egresados?
                </h4>
                <div className="flex flex-wrap gap-2">
                  {area.careers.map((c) => (
                    <Badge key={c} variant="secondary" className="text-xs">
                      {c}
                    </Badge>
                  ))}
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Future Trends */}
        <div className="border-t border-surface-border pt-12">
          <h3 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 text-center mb-10">
            Tendencias 2025-2030 que marcán tu carrera
          </h3>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {futureTrends.map((trend, i) => (
              <Card key={i} variant="bordered" className="text-center p-6">
                <div className="h-14 w-14 rounded-xl bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center mx-auto mb-4">
                  <trend.icon className="h-7 w-7 text-primary-600 dark:text-primary-400" />
                </div>
                <h4 className="font-semibold text-neutral-900 dark:text-neutral-100 mb-2">
                  {trend.title}
                </h4>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                  {trend.desc}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}