import { Metadata } from 'next'
import { CarreraSection } from '@/components/sections/carrera'

export const metadata: Metadata = {
  title: 'Descubre la Carrera',
  description: 'Qué es la Ingeniería Agrícola moderna: gestión hídrica, maquinaria de precisión, geomática, agricultura digital y sostenibilidad.',
}

export default function CarreraPage() {
  return (
    <div className="min-h-screen">
      <section className="py-20 lg:py-28 bg-gradient-to-b from-tech-50 to-surface-1 dark:from-tech-900/20 dark:to-neutral-950" aria-labelledby="carrera-hero-title">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 id="carrera-hero-title" className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-neutral-900 dark:text-neutral-100 mb-6">
            Descubre la <span className="text-tech-600 dark:text-tech-400">Carrera</span>
          </h1>
          <p className="text-xl text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto leading-relaxed">
            Ingeniería Agrícola: donde la precisión de los datos se encuentra con la tierra. 
            6 áreas de especialización técnica que combinan fundamentos de ingeniería con tecnologías digitales de vanguardia.
          </p>
        </div>
      </section>

      <CarreraSection />
    </div>
  )
}