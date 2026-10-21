'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { CheckCircle2, Calendar, Download, BookOpen, MessageCircle, Users, Clock, ArrowRight, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

// Extend Window interface for gtag
declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
  }
}

const NEXT_STEPS = [
  {
    icon: Calendar,
    title: 'Fechas Clave',
    description: 'Guarda las fechas de inscripción y examen en tu calendario',
    action: 'Agregar a Google Calendar',
    href: '#',
    color: 'primary',
  },
  {
    icon: BookOpen,
    title: 'Guía de Estudio',
    description: 'Descarga el temario oficial y ejercicios resueltos',
    action: 'Descargar PDF',
    href: '/admision',
    color: 'tech',
  },
  {
    icon: MessageCircle,
    title: 'Grupo de WhatsApp',
    description: 'Únete al grupo de aspirantes 2025 para dudas y apoyo',
    action: 'Unirse al grupo',
    href: 'https://chat.whatsapp.com/...',
    color: 'green',
  },
  {
    icon: Users,
    title: 'Charlas Vocacionales',
    description: 'Sesiones online con docentes y egresados cada mes',
    action: 'Ver próximas fechas',
    href: '/admision',
    color: 'yellow',
  },
]

const EXAM_TOPICS = [
  { subject: 'Matemática', topics: ['Álgebra y ecuaciones', 'Geometría analítica', 'Trigonometría', 'Funciones y límites', 'Estadística básica'], icon: '📐' },
  { subject: 'Física', topics: ['Cinemática y dinámica', 'Trabajo y energía', 'Calor y termodinámica', 'Ondas y sonido', 'Electricidad básica'], icon: '⚡' },
  { subject: 'Química', topics: ['Estructura atómica', 'Enlace químico', 'Estequiometría', 'Soluciones y concentraciones', 'Química orgánica básica'], icon: '🧪' },
]

export default function GraciasPage() {
  useEffect(() => {
    // Track conversion
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'lead_submit', {
        event_category: 'admission',
        event_label: 'contact_form',
      })
    }
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-50 via-surface-1 to-primary-50 dark:from-primary-900/20 dark:via-neutral-950 dark:to-primary-900/20">
      <main className="min-h-[calc(100vh-8rem)] flex items-center justify-center px-4 py-20">
        <div className="mx-auto max-w-4xl w-full">
          {/* Success Animation */}
          <div className="text-center mb-12">
            <div className="relative inline-block mb-8">
              <div className="absolute inset-0 bg-primary-100 dark:bg-primary-900/30 rounded-full blur-xl animate-pulse" style={{ width: '120px', height: '120px' }} />
              <div className="relative h-24 w-24 rounded-full bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="h-14 w-14 text-white" />
              </div>
              <div className="absolute -top-2 -right-2 h-8 w-8 rounded-full bg-yellow-400 flex items-center justify-center animate-bounce">
                <Sparkles className="h-5 w-5 text-white" />
              </div>
            </div>

            <h1 className="text-4xl sm:text-5xl font-extrabold text-neutral-900 dark:text-neutral-100 mb-4">
              ¡Mensaje Enviado con Éxito!
            </h1>
            <p className="text-xl text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto leading-relaxed">
              Gracias por tu interés en Ingeniería Agrícola UNI. 
              Nuestro equipo revisará tu consulta y te responderemos en menos de 24 horas.
            </p>
          </div>

          {/* Reference Code */}
          <Card variant="elevated" className="mb-8 max-w-md mx-auto">
            <div className="p-6 text-center">
              <p className="text-sm text-neutral-500 dark:text-neutral-500 mb-2">Código de referencia</p>
              <p className="font-mono text-2xl font-bold text-primary-600 dark:text-primary-400 tracking-wider">
                AGR-{Date.now().toString(36).toUpperCase().slice(-8)}
              </p>
              <p className="text-xs text-neutral-500 dark:text-neutral-500 mt-2">
                Guarda este código para dar seguimiento a tu solicitud
              </p>
            </div>
          </Card>

          {/* Next Steps */}
          <section aria-labelledby="next-steps-title" className="mb-12">
            <h2 id="next-steps-title" className="text-2xl font-bold text-center text-neutral-900 dark:text-neutral-100 mb-8">
              ¿Qué sigue ahora?
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {NEXT_STEPS.map((step, i) => (
                <Card key={i} variant="bordered" hover className="h-full">
                  <div className="p-6">
                    <div className={cn(
                      'h-12 w-12 rounded-xl flex items-center justify-center mx-auto mb-4',
                      step.color === 'primary' && 'bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400',
                      step.color === 'tech' && 'bg-tech-100 dark:bg-tech-900/30 text-tech-600 dark:text-tech-400',
                      step.color === 'green' && 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400',
                      step.color === 'yellow' && 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400',
                    )}>
                      <step.icon className="h-6 w-6" />
                    </div>
                    <h3 className="font-semibold text-neutral-900 dark:text-neutral-100 mb-2 text-center">
                      {step.title}
                    </h3>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400 text-center mb-4">
                      {step.description}
                    </p>
                    <Button variant="outline" className="w-full justify-center" asChild>
                      <Link href={step.href}>
                        {step.action}
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </Link>
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </section>

          {/* Exam Topics Preview */}
          <Card variant="elevated" className="mb-8">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-neutral-900 dark:text-neutral-100 flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-primary-600" />
                  Temario del Examen - Vista Previa
                </h2>
                <Badge variant="secondary">3 Materias · 60 Preguntas · 2 Horas</Badge>
              </div>
              <div className="grid gap-4 md:grid-cols-3">
                {EXAM_TOPICS.map((subject, i) => (
                  <div key={i} className="p-4 rounded-lg bg-neutral-50 dark:bg-neutral-800/50 border border-surface-border">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-3xl">{subject.icon}</span>
                      <h3 className="font-semibold text-neutral-900 dark:text-neutral-100">{subject.subject}</h3>
                    </div>
                    <ul className="space-y-1 text-sm text-neutral-600 dark:text-neutral-400">
                      {subject.topics.map((topic, j) => (
                        <li key={j} className="flex items-center gap-2">
                          <span className="h-1.5 w-1.5 rounded-full bg-primary-500" />
                          {topic}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
              <div className="text-center mt-6">
                <Link href="/admision">
                  <Button variant="primary" size="lg">
                    <Download className="h-4 w-4 mr-2" />
                    Descargar Guía Completa con Ejercicios
                  </Button>
                </Link>
              </div>
            </div>
          </Card>

          {/* Contact Info */}
          <Card variant="bordered">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-4 text-center">
                ¿Necesitas ayuda inmediata?
              </h3>
              <div className="grid gap-4 sm:grid-cols-3 text-center">
                <a href="mailto:evenorcast@gmail.com" className="flex flex-col items-center gap-2 p-4 rounded-lg bg-neutral-50 dark:bg-neutral-800/50 hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-colors">
                  <MessageCircle className="h-6 w-6 text-primary-600 dark:text-primary-400 mx-auto" />
                  <span className="font-medium text-neutral-900 dark:text-neutral-100">Email</span>
                  <span className="text-sm text-neutral-500 dark:text-neutral-500">evenorcast@gmail.com</span>
                </a>
                <a href="tel:+50586855972" className="flex flex-col items-center gap-2 p-4 rounded-lg bg-neutral-50 dark:bg-neutral-800/50 hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-colors">
                  <Clock className="h-6 w-6 text-primary-600 dark:text-primary-400 mx-auto" />
                  <span className="font-medium text-neutral-900 dark:text-neutral-100">WhatsApp</span>
                  <span className="text-sm text-neutral-500 dark:text-neutral-500">+505 8685 5972</span>
                </a>
                <Link href="/admision" className="flex flex-col items-center gap-2 p-4 rounded-lg bg-neutral-50 dark:bg-neutral-800/50 hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-colors">
                  <BookOpen className="h-6 w-6 text-primary-600 dark:text-primary-400 mx-auto" />
                  <span className="font-medium text-neutral-900 dark:text-neutral-100">Admisión</span>
                  <span className="text-sm text-neutral-500 dark:text-neutral-500">Ver fechas y requisitos</span>
                </Link>
              </div>
            </div>
          </Card>

          {/* Back Home */}
          <div className="text-center mt-12">
            <Link href="/">
              <Button variant="ghost" size="lg">
                <ArrowRight className="h-4 w-4 mr-2" />
                Volver al Inicio
              </Button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}