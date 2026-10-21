'use client'

import { useState } from 'react'
import { Calendar, FileText, Award, Users, Clock, CheckCircle2, AlertCircle, Download, ExternalLink } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { cn } from '@/lib/utils'

// Helper para renderizar iconos dinámicamente
function IconRenderer({ icon: Icon, className }: { icon: React.ElementType; className?: string }) {
  return <Icon className={className} />
}

const ADMISSION_STEPS = [
  { number: 1, title: 'Inscripción', description: 'Registro en plataforma UNI y pago de derechos' },
  { number: 2, title: 'Examen', description: 'Prueba de conocimientos: Matemática, Física, Química' },
  { number: 3, title: 'Evaluación Vocacional', description: 'Test de aptitud e interés por la ingeniería agrícola' },
  { number: 4, title: 'Resultados', description: 'Publicación de lista de admitidos y lista de espera' },
  { number: 5, title: 'Matrícula', description: 'Formalización de inscripción y asignación de cursos' },
]

const EXAM_DATES = [
  { period: 'Primer Periodo', examDate: 'Marzo 2025', inscriptionStart: 'Enero 2025', inscriptionEnd: 'Febrero 2025', results: 'Abril 2025' },
  { period: 'Segundo Periodo', examDate: 'Agosto 2025', inscriptionStart: 'Junio 2025', inscriptionEnd: 'Julio 2025', results: 'Septiembre 2025' },
]

const REQUIREMENTS = [
  { title: 'Documentos obligatorios', items: ['Partida de nacimiento', 'Cédula de identidad', 'Certificado de notas de 4° y 5° año', 'Constancia de culminación de estudios', 'Foto tipo carné (2)'] },
  { title: 'Requisitos académicos', items: ['Promedio mínimo 60/100 en 4° y 5° año', 'Aprobar examen de conocimientos (Matemática, Física, Química)', 'Evaluación vocacional favorable'] },
  { title: 'Modalidad UNICAM (Semipresencial)', items: ['Mismos requisitos académicos', 'Experiencia laboral comprobable (mín. 1 año)', 'Disponibilidad domingos en Finca Experimental', 'Entrevista personal con coordinación'] },
]

const SCHOLARSHIPS = [
  { name: 'Beca Mérito Académico', description: 'Cobertura 100% matrícula para primeros 10 puestos del examen', icon: Award },
  { name: 'Beca Necesidad Económica', description: 'Evaluación socioeconómica + promedio ≥ 70', icon: Users },
  { name: 'Beca FAO/IICA', description: 'Para estudiantes de zonas rurales priorizadas', icon: Calendar },
  { name: 'Crédito Estudiantil BANADES', description: 'Financiamiento a tasa preferencial 3% anual', icon: Clock },
]

const FAQ_DATA = [
  { q: '¿Cuánto dura la carrera?', a: '5 años (10 semestres) + 3 prácticas profesionales supervisadas (PPS).' },
  { q: '¿Qué modalidades existen?', a: 'Presencial (diurna) y Semipresencial UNICAM (domingos en Finca Experimental UNI).' },
  { q: '¿Requiere conocimientos previos de programación?', a: 'No. Se enseña desde Introducción a la Programación (Python/C) en I semestre.' },
  { q: '¿Hay laboratorios propios?', a: 'Sí, 7 laboratorios: Suelos, Hidráulica, Mecánica de Suelos, Riego, Materiales, Topografía/GIS, CAD/CAM.' },
  { q: '¿Puedo convalidar si vengo de otra carrera/universidad?', a: 'Sí, mediante Comisión de Convalidaciones (presentar sílabos y notas).' },
  { q: '¿Hay convenios internacionales?', a: 'Movilidad con UPM (España), UNAM (México), UNAL (Colombia), pasantías FAO/IICA/CIAT.' },
]

export default function AdmisionPage() {
  const [activeTab, setActiveTab] = useState('proceso')

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950">
      <section className="py-12 lg:py-16 bg-gradient-to-b from-green-50 to-surface-1 dark:from-green-900/20 dark:to-neutral-950" aria-labelledby="admision-hero-title">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <Badge variant="secondary" className="mb-4">Proceso 2025 - Dos periodos al año</Badge>
          <h1 id="admision-hero-title" className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-neutral-900 dark:text-neutral-100 mb-6">
            Admisión y <span className="text-green-600 dark:text-green-400">Prematrícula</span>
          </h1>
          <p className="text-xl text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto leading-relaxed">
            Todo lo que necesitas saber para ingresar a Ingeniería Agrícola UNI: fechas, requisitos,
            modalidades, becas y guía de estudio descargable.
          </p>
        </div>
      </section>

      <section className="py-12 lg:py-16 bg-surface-1">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-8">
              <TabsTrigger value="proceso">Proceso</TabsTrigger>
              <TabsTrigger value="fechas">Fechas</TabsTrigger>
              <TabsTrigger value="requisitos">Requisitos</TabsTrigger>
              <TabsTrigger value="becas">Becas</TabsTrigger>
            </TabsList>

            {/* Proceso Tab */}
            <TabsContent value="proceso" className="space-y-6">
              <div className="grid lg:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">5 Pasos para Ingresar</h2>
                  <p className="text-neutral-600 dark:text-neutral-400">
                    El proceso de admisión UNI es transparente, meritocrático y está diseñado para identificar
                    el mejor talento para la ingeniería agrícola.
                  </p>
                </div>
                <div>
                  <ol className="space-y-4">
                    {ADMISSION_STEPS.map((step, i) => (
                      <li key={step.number} className="flex gap-4 p-4 rounded-xl bg-neutral-50 dark:bg-neutral-800/50 border border-surface-border">
                        <div className="flex-shrink-0 h-12 w-12 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center text-primary-600 dark:text-primary-400 font-bold text-lg">
                          {step.number}
                        </div>
                        <div>
                          <h3 className="font-semibold text-neutral-900 dark:text-neutral-100">{step.title}</h3>
                          <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">{step.description}</p>
                        </div>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>

              {/* Download Guide */}
              <Card variant="elevated" className="max-w-2xl mx-auto">
                <div className="p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div>
                    <h3 className="font-semibold text-neutral-900 dark:text-neutral-100 flex items-center gap-2">
                      <FileText className="h-5 w-5 text-primary-600" />
                      Guía de Estudio Oficial
                    </h3>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">
                      Temario oficial, ejercicios resueltos, tips de estudio y examen de muestra.
                    </p>
                  </div>
                  <Button variant="primary" size="lg">
                    <Download className="h-4 w-4 mr-2" />
                    Descargar PDF (2.4 MB)
                  </Button>
                </div>
              </Card>
            </TabsContent>

            {/* Fechas Tab */}
            <TabsContent value="fechas" className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                {EXAM_DATES.map((period, i) => (
                  <Card key={i} variant="elevated" className="relative overflow-hidden">
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-500 to-tech-500" />
                    <div className="p-6">
                      <Badge variant="secondary" className="mb-3">{period.period}</Badge>
                      <h3 className="text-xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
                        Cronograma
                      </h3>
                      <dl className="space-y-3 text-sm">
                        <div className="flex justify-between">
                          <dt className="text-neutral-600 dark:text-neutral-400">Inscripción abre</dt>
                          <dd className="font-medium">{period.inscriptionStart}</dd>
                        </div>
                        <div className="flex justify-between">
                          <dt className="text-neutral-600 dark:text-neutral-400">Inscripción cierra</dt>
                          <dd className="font-medium">{period.inscriptionEnd}</dd>
                        </div>
                        <div className="flex justify-between border-t border-surface-border pt-3">
                          <dt className="text-neutral-600 dark:text-neutral-400">Examen de conocimientos</dt>
                          <dd className="font-medium text-primary-600 dark:text-primary-400">{period.examDate}</dd>
                        </div>
                        <div className="flex justify-between">
                          <dt className="text-neutral-600 dark:text-neutral-400">Resultados</dt>
                          <dd className="font-medium">{period.results}</dd>
                        </div>
                      </dl>
                    </div>
                  </Card>
                ))}
              </div>

              {/* Important Notes */}
              <Card variant="bordered">
                <div className="p-6">
                  <h3 className="font-semibold text-neutral-900 dark:text-neutral-100 mb-4 flex items-center gap-2">
                    <AlertCircle className="h-5 w-5 text-orange-500" />
                    Fechas importantes a considerar
                  </h3>
                  <ul className="space-y-2 text-sm text-neutral-600 dark:text-neutral-400">
                    <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-green-500" /> La inscripción es 100% en línea en portal UNI</li>
                    <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-green-500" /> Pago de derechos de examen: $15 USD (sujeto a cambios)</li>
                    <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-green-500" /> Examen presencial en campus UNI-RUPAP</li>
                    <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-green-500" /> Llevar cédula y comprobante de pago el día del examen</li>
                    <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-green-500" /> Resultados se publican en web UNI y se notifica por email</li>
                  </ul>
                </div>
              </Card>
            </TabsContent>

            {/* Requisitos Tab */}
            <TabsContent value="requisitos" className="space-y-6">
              <div className="grid gap-6 md:grid-cols-3">
                {REQUIREMENTS.map((section, i) => (
                  <Card key={i} variant="elevated" className="h-full">
                    <div className="p-6">
                      <h3 className="font-semibold text-neutral-900 dark:text-neutral-100 mb-4 flex items-center gap-2">
                        {section.title}
                      </h3>
                      <ul className="space-y-3">
                        {section.items.map((item, j) => (
                          <li key={j} className="flex items-start gap-3 text-sm text-neutral-700 dark:text-neutral-300">
                            <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </Card>
                ))}
              </div>

              {/* Additional Info */}
              <Card variant="bordered">
                <div className="p-6">
                  <h3 className="font-semibold text-neutral-900 dark:text-neutral-100 mb-4">
                    Información adicional
                  </h3>
                  <div className="grid md:grid-cols-2 gap-6 text-sm text-neutral-600 dark:text-neutral-400">
                    <div>
                      <h4 className="font-medium mb-2">Examen de Conocimientos</h4>
                      <ul className="space-y-1 list-disc list-inside">
                        <li>Matemática: Álgebra, geometría, trigonometría, funciones</li>
                        <li>Física: Mecánica, calor, ondas, electricidad básica</li>
                        <li>Química: Estructura atómica, enlaces, estequiometría, soluciones</li>
                        <li>60 preguntas de opción múltiple, 2 horas</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">Evaluación Vocacional</h4>
                      <ul className="space-y-1 list-disc list-inside">
                        <li>Test de aptitud e interés por ingeniería agrícola</li>
                        <li>No requiere preparación previa</li>
                        <li>Ponderación: 20% de la nota final</li>
                        <li>Entrevista opcional para modalidad UNICAM</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </Card>
            </TabsContent>

            {/* Becas Tab */}
            <TabsContent value="becas" className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {SCHOLARSHIPS.map((scholarship, i) => (
                  <Card key={i} variant="elevated" className="h-full text-center p-6">
                    <div className="h-14 w-14 rounded-xl flex items-center justify-center mx-auto mb-4" style={{ background: `linear-gradient(135deg, ${scholarship.icon === Award ? '#10b981' : scholarship.icon === Users ? '#3b82f6' : scholarship.icon === Calendar ? '#f59e0b' : '#8b5cf6'}, ${scholarship.icon === Award ? '#059669' : scholarship.icon === Users ? '#2563eb' : scholarship.icon === Calendar ? '#d97706' : '#7c3aed'})` }}>
                      <IconRenderer icon={scholarship.icon} className="h-7 w-7 text-white" />
                    </div>
                    <h3 className="font-semibold text-neutral-900 dark:text-neutral-100 mb-2">{scholarship.name}</h3>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400">{scholarship.description}</p>
                  </Card>
                ))}
              </div>

              <Card variant="bordered">
                <div className="p-6">
                  <h3 className="font-semibold text-neutral-900 dark:text-neutral-100 mb-4">Más opciones de financiamiento</h3>
                  <div className="grid md:grid-cols-2 gap-6 text-sm text-neutral-600 dark:text-neutral-400">
                    <div>
                      <h4 className="font-medium mb-2">Bancos y entidades</h4>
                      <ul className="space-y-1 list-disc list-inside">
                        <li>BANADES - Crédito Estudiantil (3% anual)</li>
                        <li>Banco Central - Fondo de Garantía</li>
                        <li>Cooperativas de ahorro y crédito</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">Apoyo institucional</h4>
                      <ul className="space-y-1 list-disc list-inside">
                        <li>Comedor universitario subvencionado</li>
                        <li>Transporte intermunicipal</li>
                        <li>Seguro estudiantil</li>
                        <li>Préstamo de libros y equipos</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 lg:py-16 bg-neutral-50 dark:bg-neutral-900/50" aria-labelledby="faq-title">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 id="faq-title" className="text-3xl sm:text-4xl font-extrabold text-neutral-900 dark:text-neutral-100 mb-4">
              Preguntas Frecuentes
            </h2>
            <p className="text-lg text-neutral-600 dark:text-neutral-400">
              Respuestas a las dudas más comunes de los aspirantes
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {FAQ_DATA.map((faq, i) => (
              <details key={i} className="group border border-surface-border rounded-xl bg-surface-1 dark:bg-neutral-900/50 overflow-hidden">
                <summary className="p-5 flex items-center justify-between cursor-pointer list-none">
                  <span className="font-medium text-neutral-900 dark:text-neutral-100 pr-8">{faq.q}</span>
                  <svg className="h-5 w-5 text-neutral-400 transition-transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <div className="px-5 pb-5 text-neutral-600 dark:text-neutral-400">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 lg:py-16 bg-primary-600 dark:bg-primary-700" aria-labelledby="cta-title">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 id="cta-title" className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
            ¿Listo para comenzar?
          </h2>
          <p className="text-lg text-primary-100 mb-8 max-w-2xl mx-auto">
            La inscripción para el próximo periodo ya está abierta. Descarga la guía, prepara tus documentos y da el primer paso.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" variant="secondary" className="w-full sm:w-auto">
              <Download className="h-4 w-4 mr-2" />
              Descargar Guía de Estudio
            </Button>
            <Button size="lg" variant="outline" className="w-full sm:w-auto border-white text-white hover:bg-white/10">
              <ExternalLink className="h-4 w-4 mr-2" />
              Portal de Inscripción UNI
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}