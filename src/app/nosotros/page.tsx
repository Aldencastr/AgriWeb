import { Metadata } from 'next'
import { WhatIsSection } from '@/components/sections/what-is'
import { getSiteData } from '@/services/data.service'

export const metadata: Metadata = {
  title: 'Nosotros',
  description: 'Conoce la facultad, misión, visión, valores y autoridades de Ingeniería Agrícola en la Universidad Nacional de Ingeniería.',
}

export default async function NosotrosPage() {
  const siteData = await getSiteData()

  return (
    <div className="min-h-screen">
      <section className="py-20 lg:py-28 bg-gradient-to-b from-primary-50 to-surface-1 dark:from-primary-900/20 dark:to-neutral-950" aria-labelledby="nosotros-hero-title">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 id="nosotros-hero-title" className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-neutral-900 dark:text-neutral-100 mb-6">
            Ingeniería Agrícola <span className="text-primary-600 dark:text-primary-400">UNI</span>
          </h1>
          <p className="text-xl text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto leading-relaxed">
            {siteData.descripcion}
          </p>
        </div>
      </section>

      <WhatIsSection />

      {/* Mission Vision Values */}
      <section className="py-20 lg:py-28 bg-neutral-50 dark:bg-neutral-900/50" aria-labelledby="mvv-title">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 id="mvv-title" className="text-3xl sm:text-4xl font-extrabold text-neutral-900 dark:text-neutral-100 mb-4">
              Nuestra Identidad
            </h2>
            <p className="text-lg text-neutral-600 dark:text-neutral-400">
              Principios que guían nuestra labor académica y profesional
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                icon: '🎯',
                title: 'Misión',
                description: 'Formar ingenieros agrícolas integrales, con pensamiento crítico, capacidad de innovación y compromiso social, capaces de diseñar soluciones tecnológicas sostenibles para el sector agropecuario.',
              },
              {
                icon: '🔭',
                title: 'Visión',
                description: 'Ser la facultad líder en ingeniería agrícola de Centroamérica, reconocida por la excelencia académica, investigación de impacto y vinculación efectiva con el sector productivo.',
              },
              {
                icon: '💎',
                title: 'Valores',
                description: 'Excelencia · Innovación · Sostenibilidad · Integridad · Colaboración · Responsabilidad Social · Pensamiento Crítico',
              },
            ].map((item, i) => (
              <div key={i} className="relative p-6 rounded-2xl bg-surface-1 border border-surface-border hover:border-primary-200 dark:hover:border-primary-800 transition-colors">
                <span className="text-4xl mb-4 block">{item.icon}</span>
                <h3 className="text-xl font-bold text-neutral-900 dark:text-neutral-100 mb-3">{item.title}</h3>
                <p className="text-neutral-600 dark:text-neutral-400">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Campus Info */}
      <section className="py-20 lg:py-28 bg-surface-1" aria-labelledby="campus-title">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 id="campus-title" className="text-3xl sm:text-4xl font-extrabold text-neutral-900 dark:text-neutral-100 mb-6">
                Nuestro Campus: UNI-RUPAP
              </h2>
              <p className="text-lg text-neutral-600 dark:text-neutral-400 mb-6">
                El Recinto Universitario Pedro Aráuz Palacios (UNI-RUPAP) alberga la Facultad de Ingeniería Agrícola con infraestructura de vanguardia para la docencia, investigación y extensión.
              </p>
              <ul className="space-y-4">
                {[
                  '7 laboratorios especializados (Suelos, Hidráulica, Mecánica de Suelos, Riego, Materiales, Topografía/GIS, CAD/CAM)',
                  'Finca Agrícola Experimental para prácticas de campo',
                  'Aulas inteligentes con tecnología híbrida',
                  'Biblioteca especializada en recursos hídricos y agropecuarios',
                  'Centro de cómputo con software especializado (ArcGIS, QGIS, AutoCAD, EPANET, HEC-RAS, AquaCrop)',
                  'Talleres de maquinaria y estructuras rurales',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="flex-shrink-0 h-6 w-6 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center text-primary-600 dark:text-primary-400">
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                    </span>
                    <span className="text-neutral-700 dark:text-neutral-300">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative aspect-video rounded-2xl overflow-hidden bg-neutral-100 dark:bg-neutral-800">
              <iframe
                title="Ubicación UNI-RUPAP"
                src="https://maps.google.com/maps?q=12.13832,-86.22397&output=embed&z=17"
                className="absolute inset-0 w-full h-full border-0"
                allowFullScreen
                loading="lazy"
              ></iframe>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}