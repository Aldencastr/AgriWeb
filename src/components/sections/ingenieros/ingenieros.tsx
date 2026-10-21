'use client'

import Image from 'next/image'
import { Linkedin, MapPin, Mail, ExternalLink, Award, BookOpen, FlaskConical, Briefcase } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { cn } from '@/lib/utils'
import type { Ingeniero } from '@/lib/types'

interface IngenierosSectionProps {
  ingenieros: Ingeniero[]
}

export function IngenierosSection({ ingenieros }: IngenierosSectionProps) {
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  return (
    <section id="ingenieros" className="py-20 lg:py-28 bg-surface-1" aria-labelledby="ingenieros-title">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <Badge variant="secondary" className="mb-4">
            Docentes e investigadores
          </Badge>
          <h2 id="ingenieros-title" className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-neutral-900 dark:text-neutral-100 mb-6">
            Ingenieros <span className="text-primary-600 dark:text-primary-400">Especializados</span>
          </h2>
          <p className="text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed">
            Conoce a los profesionales que combinan docencia, investigación y experiencia en el sector productivo 
            para formar a la nueva generación de ingenieros agrícolas.
          </p>
        </div>

        {ingenieros.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-neutral-500 dark:text-neutral-400">
              No hay ingenieros registrados actualmente.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {ingenieros.map((ingeniero, i) => (
              <Card key={i} variant="bordered" hover className="h-full flex flex-col">
                <div className="relative aspect-video overflow-hidden rounded-t-xl">
                  {ingeniero.imagen ? (
                    <Image
                      src={ingeniero.imagen}
                      alt=""
                      fill
                      className="object-cover transition-transform duration-500 hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center bg-neutral-100 dark:bg-neutral-800">
                      <FlaskConical className="h-16 w-16 text-neutral-300 dark:text-neutral-600" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/80 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 flex gap-2">
                    <a
                      href={`https://linkedin.com/in/${ingeniero.nombre.toLowerCase().replace(/\s+/g, '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 transition-colors"
                      aria-label={`LinkedIn de ${ingeniero.nombre}`}
                    >
                      <Linkedin className="h-5 w-5" />
                    </a>
                    <a
                      href="#contacto"
                      className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 transition-colors"
                      aria-label={`Contactar a ${ingeniero.nombre}`}
                    >
                      <Mail className="h-5 w-5" />
                    </a>
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex items-center gap-3 mb-3">
                    <Avatar className="h-12 w-12">
                      {ingeniero.imagen ? (
                        <AvatarImage src={ingeniero.imagen} alt={ingeniero.nombre} />
                      ) : (
                        <AvatarFallback>{getInitials(ingeniero.nombre)}</AvatarFallback>
                      )}
                    </Avatar>
                    <div>
                      <h3 className="font-semibold text-neutral-900 dark:text-neutral-100">
                        {ingeniero.nombre}
                      </h3>
                      <p className="text-sm text-primary-600 dark:text-primary-400 font-medium">
                        {ingeniero.rol.split('·')[0].trim()}
                      </p>
                    </div>
                  </div>

                  <p className="text-neutral-600 dark:text-neutral-400 text-sm leading-relaxed mb-4 flex-1">
                    {ingeniero.biografia.slice(0, 200)}...
                  </p>

                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline" className="text-xs">
                      <BookOpen className="h-3 w-3 mr-1" />
                      Docencia
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      <FlaskConical className="h-3 w-3 mr-1" />
                      Investigación
                    </Badge>
                    {ingeniero.rol.includes('Consultor') && (
                      <Badge variant="outline" className="text-xs">
                        <Briefcase className="h-3 w-3 mr-1" />
                        Consultoría
                      </Badge>
                    )}
                    {ingeniero.rol.includes('Master') && (
                      <Badge variant="secondary" className="text-xs">
                        <Award className="h-3 w-3 mr-1" />
                        Maestría
                      </Badge>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}