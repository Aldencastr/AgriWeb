import { Metadata } from 'next'
import Link from 'next/link'
import { Calculator, UserCheck, ArrowRight, BarChart, Brain, Zap } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'Simuladores Interactivos',
  description: 'Calculadora de eficiencia de riego y test de perfil profesional. Herramientas gratuitas para futuros ingenieros agrícolas.',
}

const simulators = [
  {
    href: '/simuladores/calculadora-riego',
    icon: Calculator,
    title: 'Calculadora de Eficiencia de Riego',
    description: 'Calcula eficiencia de aplicación (Ea), lámina neta/bruta, volumen, costo energético y requerimiento de lavado para goteo, aspersión, pivote y gravedad.',
    features: ['Eficiencia de aplicación (Ea %)', 'Lámina neta y bruta (mm)', 'Volumen total (m³)', 'Costo energético estimado', 'Profundidad de humedecimiento', 'Requerimiento de lavado (LR)'],
    badge: 'Nuevo',
    color: 'primary',
  },
  {
    href: '/simuladores/test-perfil',
    icon: UserCheck,
    title: 'Test de Perfil Profesional Agrícola',
    description: 'Descubre tu afinidad con las 6 áreas de la Ingeniería Agrícola mediante 12 preguntas. Obtén tu radar chart personalizado y 3 roles recomendados con match %.',
    features: ['12 preguntas Likert (1-5)', 'Radar chart de 6 dimensiones', 'Top 3 roles con % match', 'Habilidades clave por rol', 'Asignaturas recomendadas', 'Enlace directo a plan de estudios'],
    badge: 'Próximamente',
    color: 'tech',
  },
]

const colorStyles = {
  primary: 'bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300',
  tech: 'bg-tech-100 dark:bg-tech-900/30 text-tech-700 dark:text-tech-300',
}

export default function SimuladoresPage() {
  return (
    <div className="min-h-screen">
      <section className="py-20 lg:py-28 bg-gradient-to-b from-orange-50 to-surface-1 dark:from-orange-900/20 dark:to-neutral-950" aria-labelledby="simuladores-hero-title">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <Badge variant="secondary" className="mb-4">
            Herramientas interactivas gratuitas
          </Badge>
          <h1 id="simuladores-hero-title" className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-neutral-900 dark:text-neutral-100 mb-6">
            Simuladores <span className="text-orange-600 dark:text-orange-400">Interactivos</span>
          </h1>
          <p className="text-xl text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto leading-relaxed">
            Herramientas prácticas para futuros ingenieros agrícolas. Sin registro, sin backend, 
            100% client-side. Úsalas, compártelas y lleva los resultados contigo.
          </p>
        </div>
      </section>

      <section className="py-20 lg:py-28 bg-surface-1" aria-labelledby="simuladores-list">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 id="simuladores-list" className="text-3xl sm:text-4xl font-extrabold text-neutral-900 dark:text-neutral-100 mb-4">
              Simuladores Disponibles
            </h2>
            <p className="text-lg text-neutral-600 dark:text-neutral-400">
              Cada simulador está diseñado para resolver problemas reales de la ingeniería agrícola 
              o ayudarte a descubrir tu camino profesional.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 max-w-4xl mx-auto">
            {simulators.map((sim, i) => (
              <Card key={i} variant="bordered" hover className="h-full flex flex-col">
                <div className={cn(
                  'h-14 w-14 rounded-xl flex items-center justify-center mb-6',
                  colorStyles[sim.color as keyof typeof colorStyles]
                )}>
                  <sim.icon className="h-7 w-7" aria-hidden="true" />
                </div>

                <div className="flex items-start gap-2 mb-4">
                  <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 flex-1">
                    {sim.title}
                  </h3>
                  <Badge variant={sim.badge === 'Nuevo' ? 'default' : 'outline'} className="text-xs flex-shrink-0">
                    {sim.badge}
                  </Badge>
                </div>

                <p className="text-neutral-600 dark:text-neutral-400 mb-6 flex-1">
                  {sim.description}
                </p>

                <div className="space-y-2 mb-6">
                  {sim.features.map((feature, fi) => (
                    <div key={fi} className="flex items-center gap-2 text-sm text-neutral-700 dark:text-neutral-300">
                      <svg className="h-4 w-4 text-primary-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {feature}
                    </div>
                  ))}
                </div>

                <Link href={sim.href} className="mt-auto">
                  <Button variant="outline" className="w-full justify-between">
                    Probar ahora
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Button>
                </Link>
              </Card>
            ))}
          </div>

          {/* Coming Soon */}
          <div className="mt-16 text-center">
            <Card variant="outlined" className="max-w-2xl mx-auto p-8">
              <Brain className="h-12 w-12 mx-auto text-tech-500 mb-4" />
              <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-2">
                Próximamente: Más simuladores
              </h3>
              <p className="text-neutral-600 dark:text-neutral-400 mb-4">
                Estamos desarrollando nuevas herramientas para ti.
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                <Badge variant="outline">Dimensionador de Bombas</Badge>
                <Badge variant="outline">Cálculo de Caudal de Pozos</Badge>
                <Badge variant="outline">Diseño de Drenaje</Badge>
                <Badge variant="outline">Análisis de Rentabilidad</Badge>
              </div>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}