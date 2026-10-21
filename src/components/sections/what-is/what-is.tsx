'use client'

import { BookOpen, Droplets, Cpu, Map, Rocket, Zap } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

const areas = [
  {
    icon: Droplets,
    title: 'Gestión de Recursos Hídricos',
    description: 'Diseño, simulación y operación de sistemas de riego y drenaje; modelado de acuíferos y cuencas hidrológicas.',
    tags: ['Hidráulica', 'Riego', 'Hidrología', 'Acuíferos'],
    color: 'tech',
  },
  {
    icon: Cpu,
    title: 'Mecanización y Automatización',
    description: 'Tractores con guía RTK/GNSS, dosificación variable (VRA), robótica de cosecha, telemetría ISOBUS/CAN.',
    tags: ['Precisión', 'Robótica', 'Telemetría', 'ISOBUS'],
    color: 'primary',
  },
  {
    icon: Map,
    title: 'Geomática y Agricultura Digital',
    description: 'SIG/GIS, teledetección (Sentinel-2, drones), índices vegetacionales (NDVI/EVI), zonificación de suelos.',
    tags: ['GIS', 'Teledetección', 'NDVI', 'Drones'],
    color: 'primary',
  },
  {
    icon: BookOpen,
    title: 'Estructuras Rurales y Suelos',
    description: 'Diseño de galpones, silos, invernaderos, caminos rurales. Mecánica de suelos, cimentaciones, materiales.',
    tags: ['Estructuras', 'Suelos', 'Topografía', 'Materiales'],
    color: 'tech',
  },
  {
    icon: Rocket,
    title: 'Gestión de Proyectos y Emprendimiento',
    description: 'Formulación y evaluación de proyectos agroindustriales, ingeniería económica, innovación AgTech.',
    tags: ['Proyectos', 'Economía', 'Emprendimiento', 'Innovación'],
    color: 'primary',
  },
  {
    icon: Zap,
    title: 'Energía y Sostenibilidad',
    description: 'Bombeo solar, biocombustibles, huella hídrica y de carbono, agricultura regenerativa y créditos de carbono.',
    tags: ['Solar', 'Carbono', 'Regenerativa', 'Sostenibilidad'],
    color: 'tech',
  },
]

const colorStyles = {
  primary: 'bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300',
  tech: 'bg-tech-100 dark:bg-tech-900/30 text-tech-700 dark:text-tech-300',
}

export function WhatIsSection() {
  return (
    <section id="nosotros" className="py-20 lg:py-28 bg-surface-1" aria-labelledby="what-is-title">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge variant="secondary" className="mb-4">
            Ingeniería moderna para el agro
          </Badge>
          <h2 id="what-is-title" className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-neutral-900 dark:text-neutral-100 mb-6">
            ¿Qué es la <span className="text-primary-600 dark:text-primary-400">Ingeniería Agrícola</span> hoy?
          </h2>
          <p className="text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed">
            Ya no es solo "ingeniería en el campo". Es <strong>ciencia de datos aplicada al territorio</strong>, 
            <strong>física del suelo y el agua</strong>, y <strong>tecnología autónoma</strong> para producir alimentos 
            con la menor huella hídrica y de carbono posible.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {areas.map((area, i) => (
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
              <div className="flex flex-wrap gap-2">
                {area.tags.map((tag) => (
                  <Badge key={tag} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            </Card>
          ))}
        </div>

        {/* Definition Card */}
        <Card variant="elevated" className="mt-12 max-w-4xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
                Ingeniería Agrícola ≠ Agronomía
              </h3>
              <p className="text-neutral-600 dark:text-neutral-400 mb-4">
                La <strong>Agronomía</strong> se enfoca en la producción vegetal y el manejo del cultivo.
              </p>
              <p className="text-neutral-600 dark:text-neutral-400 mb-4">
                La <strong>Ingeniería Agrícola</strong> diseña los <strong>sistemas</strong> que habilitan esa producción a escala y eficiencia: 
                riego, maquinaria, estructuras, modelos matemáticos, automatización y análisis de datos.
              </p>
              <p className="text-primary-600 dark:text-primary-400 font-medium">
                Somos los arquitectos de la infraestructura productiva del agro.
              </p>
            </div>
            <div className="relative aspect-square">
              <div className="absolute inset-0 bg-gradient-to-br from-primary-100/50 to-tech-100/50 dark:from-primary-900/20 dark:to-tech-900/20 rounded-2xl" />
              <div className="relative flex h-full items-center justify-center">
                <span className="text-8xl font-extrabold text-primary-600/20 dark:text-primary-400/20">
                  IA
                </span>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </section>
  )
}