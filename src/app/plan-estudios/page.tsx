import { Metadata } from 'next'
import { PlanEstudiosSection } from '@/components/sections/plan-estudios'
import { getPlanEstudios } from '@/services/data.service'

export const metadata: Metadata = {
  title: 'Plan de Estudios 2026',
  description: 'Malla curricular completa: 5 años, 10 semestres, asignaturas por año, prácticas profesionales, optativas y modalidades.',
}

export default async function PlanEstudiosPage() {
  const planEstudios = await getPlanEstudios()

  return (
    <div className="min-h-screen">
      <section className="py-20 lg:py-28 bg-gradient-to-b from-primary-50 to-surface-1 dark:from-primary-900/20 dark:to-neutral-950" aria-labelledby="plan-hero-title">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 id="plan-hero-title" className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-neutral-900 dark:text-neutral-100 mb-6">
            Plan de Estudios <span className="text-primary-600 dark:text-primary-400">2026</span>
          </h1>
          <p className="text-xl text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto leading-relaxed">
            Malla curricular diseñada para formar ingenieros agrícolas integrales. 
            5 años, 10 semestres, 3 prácticas profesionales y asignaturas que integran ingeniería clásica con tecnologías digitales.
          </p>
        </div>
      </section>

      <PlanEstudiosSection data={planEstudios} />
    </div>
  )
}