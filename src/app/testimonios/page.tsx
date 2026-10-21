import { Metadata } from 'next'
import { TestimoniosSection } from '@/components/sections/testimonios'
import { getSiteData } from '@/services/data.service'

export const metadata: Metadata = {
  title: 'Reseñas y Testimonios',
  description: 'Experiencias de estudiantes y egresados de Ingeniería Agrícola. Opiniones reales sobre la carrera, prácticas y campo laboral.',
}

export default async function TestimoniosPage() {
  const siteData = await getSiteData()

  return (
    <div className="min-h-screen">
      <section className="py-20 lg:py-28 bg-gradient-to-b from-yellow-50 to-surface-1 dark:from-yellow-900/20 dark:to-neutral-950" aria-labelledby="testimonios-hero-title">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 id="testimonios-hero-title" className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-neutral-900 dark:text-neutral-100 mb-6">
            Reseñas y <span className="text-yellow-600 dark:text-yellow-400">Testimonios</span>
          </h1>
          <p className="text-xl text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto leading-relaxed">
            Escucha a quienes ya viven la experiencia. Estudiantes, egresados y profesionales comparten 
            su visión sobre la carrera, las prácticas y el campo laboral.
          </p>
        </div>
      </section>

      <TestimoniosSection initialTestimonios={siteData.testimonios} />
    </div>
  )
}