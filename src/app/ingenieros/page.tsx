import { Metadata } from 'next'
import { IngenierosSection } from '@/components/sections/ingenieros'
import { getSiteData } from '@/services/data.service'

export const metadata: Metadata = {
  title: 'Ingenieros Especializados',
  description: 'Conoce a nuestros docentes e investigadores: perfiles, especialidades, publicaciones y experiencia en el sector agropecuario.',
}

export default async function IngenierosPage() {
  const siteData = await getSiteData()

  return (
    <div className="min-h-screen">
      <section className="py-20 lg:py-28 bg-gradient-to-b from-green-50 to-surface-1 dark:from-green-900/20 dark:to-neutral-950" aria-labelledby="ingenieros-hero-title">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 id="ingenieros-hero-title" className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-neutral-900 dark:text-neutral-100 mb-6">
            Ingenieros <span className="text-green-600 dark:text-green-400">Especializados</span>
          </h1>
          <p className="text-xl text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto leading-relaxed">
            Docentes e investigadores que combinan excelencia académica con experiencia real en el sector productivo. 
            Su labor transforma la teoría en soluciones prácticas para el agro.
          </p>
        </div>
      </section>

      <IngenierosSection ingenieros={siteData.ingenieros} />
    </div>
  )
}