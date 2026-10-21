'use client'

import React, { useState } from 'react'
import { MapPin, Mail, Phone, Send, Loader2, CheckCircle2, Building2, GraduationCap, Briefcase, User, HelpCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select } from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { Card } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { useToast } from '@/hooks/useToast'
import { Analytics } from '@/services/analytics.service'
import { CONTACT_INTERESTS, USER_TYPES, CAMPUS_LOCATION, MAP_URLS } from '@/lib/constants'

interface ContactoSectionProps {
  contacto?: {
    facultad: string
    correo: string
    telefono: string
    ubicacion: string
    instituciones: string
  }
}

export function ContactoSection({ contacto }: ContactoSectionProps) {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    userType: '',
    nombre: '',
    email: '',
    telefono: '',
    departamento: '',
    municipio: '',
    anioBachillerato: '',
    intereses: [] as string[],
    mensaje: '',
    archivo: null as File | null,
    consentimiento: false,
    suscripcion: false,
  })
  const [submitting, setSubmitting] = useState(false)
  const { success, error } = useToast()

  const updateField = (field: string, value: unknown) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      success('¡Mensaje enviado!', 'Nos pondremos en contacto contigo pronto.')
      Analytics.leadSubmit('contact_form', formData.userType)
      
      // Reset form
      setFormData({
        userType: '',
        nombre: '',
        email: '',
        telefono: '',
        departamento: '',
        municipio: '',
        anioBachillerato: '',
        intereses: [],
        mensaje: '',
        archivo: null,
        consentimiento: false,
        suscripcion: false,
      })
      setStep(1)
    } catch {
      error('Error', 'No se pudo enviar el mensaje. Inténtalo de nuevo.')
    } finally {
      setSubmitting(false)
    }
  }

  const nextStep = () => {
    if (step === 1 && !formData.userType) {
      error('Requerido', 'Selecciona tu perfil')
      return
    }
    if (step === 2 && (!formData.nombre || !formData.email)) {
      error('Requerido', 'Completa nombre y email')
      return
    }
    if (step === 3 && formData.intereses.length === 0) {
      error('Requerido', 'Selecciona al menos un área de interés')
      return
    }
    if (step === 4 && !formData.mensaje.trim()) {
      error('Requerido', 'Escribe un mensaje')
      return
    }
    if (step === 5 && !formData.consentimiento) {
      error('Requerido', 'Debes aceptar la política de privacidad')
      return
    }
    setStep(prev => Math.min(prev + 1, 5))
  }

  const prevStep = () => {
    setStep(prev => Math.max(prev - 1, 1))
  }

  const steps = [
    { number: 1, label: 'Perfil' },
    { number: 2, label: 'Datos' },
    { number: 3, label: 'Intereses' },
    { number: 4, label: 'Mensaje' },
    { number: 5, label: 'Confirmar' },
  ]

  return (
    <section id="contacto" className="py-20 lg:py-28 bg-surface-1" aria-labelledby="contacto-title">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Info Column */}
          <div>
            <h2 id="contacto-title" className="text-3xl sm:text-4xl font-extrabold text-neutral-900 dark:text-neutral-100 mb-4">
              Contáctanos
            </h2>
            <p className="text-lg text-neutral-600 dark:text-neutral-400 mb-8">
              ¿Tienes dudas sobre la carrera, admisión o quieres más información? Escríbenos y te responderemos a la brevedad.
            </p>

            {/* Contact Info Cards */}
            <div className="space-y-6 mb-10">
              <Card variant="bordered">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 h-12 w-12 rounded-xl bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center">
                    <MapPin className="h-6 w-6 text-primary-600 dark:text-primary-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-neutral-900 dark:text-neutral-100">Ubicación</h3>
                    <p className="text-neutral-600 dark:text-neutral-400 mt-1">
                      {contacto?.ubicacion || CAMPUS_LOCATION.name}
                    </p>
                    <a
                      href={MAP_URLS.directions}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-sm text-primary-600 hover:text-primary-700 dark:text-primary-400 mt-2"
                    >
                      Ver en Google Maps
                      <MapPin className="h-3 w-3" />
                    </a>
                  </div>
                </div>
              </Card>

              <Card variant="bordered">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 h-12 w-12 rounded-xl bg-tech-100 dark:bg-tech-900/30 flex items-center justify-center">
                    <Mail className="h-6 w-6 text-tech-600 dark:text-tech-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-neutral-900 dark:text-neutral-100">Email</h3>
                    <a
                      href={`mailto:${contacto?.correo || 'evenorcast@gmail.com'}`}
                      className="text-neutral-600 dark:text-neutral-400 hover:text-primary-600 dark:hover:text-primary-400 mt-1 inline-block"
                    >
                      {contacto?.correo || 'evenorcast@gmail.com'}
                    </a>
                  </div>
                </div>
              </Card>

              <Card variant="bordered">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 h-12 w-12 rounded-xl bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                    <Phone className="h-6 w-6 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-neutral-900 dark:text-neutral-100">Teléfono / WhatsApp</h3>
                    <a
                      href={`tel:+505${contacto?.telefono || '86855972'}`}
                      className="text-neutral-600 dark:text-neutral-400 hover:text-primary-600 dark:hover:text-primary-400 mt-1 inline-block"
                    >
                      +505 {contacto?.telefono || '8685 5972'}
                    </a>
                  </div>
                </div>
              </Card>
            </div>

            {/* Institutions */}
            <Card variant="bordered">
              <div className="flex items-center gap-3">
                <Building2 className="h-6 w-6 text-primary-600 dark:text-primary-400" />
                <div>
                  <h3 className="font-semibold text-neutral-900 dark:text-neutral-100">Instituciones asociadas</h3>
                  <p className="text-neutral-600 dark:text-neutral-400 text-sm">
                    {contacto?.instituciones || 'UNICAM · FAE-Masaya'}
                  </p>
                </div>
              </div>
            </Card>
          </div>

          {/* Form Column */}
          <div>
            <Card variant="elevated" className="sticky top-24">
              {/* Progress Steps */}
              <div className="mb-8">
                <div className="flex items-center justify-between">
                  {steps.map((s, i) => (
                    <React.Fragment key={s.number}>
                      <div className="flex items-center gap-2">
                        <div
                          className={cn(
                            'h-8 w-8 rounded-full flex items-center justify-center text-sm font-medium transition-all',
                            step >= s.number
                              ? 'bg-primary-600 text-white'
                              : 'bg-neutral-200 text-neutral-500 dark:bg-neutral-700 dark:text-neutral-400'
                          )}
                        >
                          {step > s.number ? (
                            <CheckCircle2 className="h-5 w-5" />
                          ) : (
                            s.number
                          )}
                        </div>
                        <span
                          className={cn(
                            'hidden sm:block text-xs font-medium',
                            step >= s.number
                              ? 'text-primary-600 dark:text-primary-400'
                              : 'text-neutral-500 dark:text-neutral-400'
                          )}
                        >
                          {s.label}
                        </span>
                      </div>
                      {i < steps.length - 1 && (
                        <div
                          className={cn(
                            'hidden sm:block w-12 h-0.5',
                            step > s.number
                              ? 'bg-primary-600'
                              : 'bg-neutral-200 dark:bg-neutral-700'
                          )}
                        />
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>

              {/* Form Steps */}
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Step 1: User Type */}
                {step === 1 && (
                  <div className="space-y-4" role="group" aria-labelledby="step1-title">
                    <h3 id="step1-title" className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
                      ¿Quién eres?
                    </h3>
                    <div className="grid gap-3 sm:grid-cols-2">
                      {USER_TYPES.map((type) => (
                        <label
                          key={type.value}
                          className={cn(
                            'relative cursor-pointer p-4 rounded-lg border-2 transition-all',
                            formData.userType === type.value
                              ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                              : 'border-surface-border hover:border-primary-200 dark:hover:border-primary-800'
                          )}
                        >
                          <input
                            type="radio"
                            name="userType"
                            value={type.value}
                            checked={formData.userType === type.value}
                            onChange={() => updateField('userType', type.value)}
                            className="sr-only"
                          />
                          <div className="flex items-center gap-3">
                            <div className={cn(
                              'h-10 w-10 rounded-lg flex items-center justify-center',
                              formData.userType === type.value
                                ? 'bg-primary-600 text-white'
                                : 'bg-neutral-100 dark:bg-neutral-800'
                            )}>
                              {type.value === 'aspirante' && <GraduationCap className="h-5 w-5" />}
                              {type.value === 'padre' && <User className="h-5 w-5" />}
                              {type.value === 'empresa' && <Briefcase className="h-5 w-5" />}
                              {type.value === 'otro' && <HelpCircle className="h-5 w-5" />}
                            </div>
                            <span className="font-medium text-neutral-900 dark:text-neutral-100">
                              {type.label}
                            </span>
                          </div>
                        </label>
                      ))}
                    </div>
                    <Button onClick={nextStep} disabled={!formData.userType} className="w-full">
                      Continuar
                    </Button>
                  </div>
                )}

                {/* Step 2: Personal Data */}
                {step === 2 && (
                  <div className="space-y-4" role="group" aria-labelledby="step2-title">
                    <h3 id="step2-title" className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
                      Tus datos
                    </h3>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <Input
                        label="Nombre completo *"
                        placeholder="Juan Pérez"
                        value={formData.nombre}
                        onChange={(e) => updateField('nombre', e.target.value)}
                        required
                      />
                      <Input
                        label="Email *"
                        type="email"
                        placeholder="juan@ejemplo.com"
                        value={formData.email}
                        onChange={(e) => updateField('email', e.target.value)}
                        required
                      />
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <Input
                        label="Teléfono / WhatsApp"
                        placeholder="+505 8XXX XXXX"
                        value={formData.telefono}
                        onChange={(e) => updateField('telefono', e.target.value)}
                      />
                      <Select
                        label="Año de bachillerato"
                        value={formData.anioBachillerato}
                        onChange={(e) => updateField('anioBachillerato', e.target.value)}
                        options={[
                          { value: '', label: 'Seleccionar' },
                          { value: '2024', label: '2024' },
                          { value: '2023', label: '2023' },
                          { value: '2022', label: '2022' },
                          { value: '2021', label: '2021' },
                          { value: 'anterior', label: 'Anterior a 2021' },
                        ]}
                        placeholder="Seleccionar"
                      />
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <Input
                        label="Departamento"
                        placeholder="Managua, León, etc."
                        value={formData.departamento}
                        onChange={(e) => updateField('departamento', e.target.value)}
                      />
                      <Input
                        label="Municipio"
                        placeholder="Tu municipio"
                        value={formData.municipio}
                        onChange={(e) => updateField('municipio', e.target.value)}
                      />
                    </div>
                    <div className="flex justify-between">
                      <Button variant="secondary" onClick={prevStep}>
                        Atrás
                      </Button>
                      <Button onClick={nextStep} disabled={!formData.nombre || !formData.email}>
                        Continuar
                      </Button>
                    </div>
                  </div>
                )}

                {/* Step 3: Interests */}
                {step === 3 && (
                  <div className="space-y-4" role="group" aria-labelledby="step3-title">
                    <h3 id="step3-title" className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
                      Áreas de interés
                    </h3>
                    <p className="text-neutral-600 dark:text-neutral-400 text-sm">
                      Selecciona todas las que apliquen (mínimo 1)
                    </p>
                    <div className="grid gap-3 sm:grid-cols-2">
                      {CONTACT_INTERESTS.map((interest) => (
                        <label
                          key={interest.value}
                          className={cn(
                            'relative cursor-pointer p-4 rounded-lg border-2 transition-all',
                            formData.intereses.includes(interest.value)
                              ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                              : 'border-surface-border hover:border-primary-200 dark:hover:border-primary-800'
                          )}
                        >
                          <input
                            type="checkbox"
                            value={interest.value}
                            checked={formData.intereses.includes(interest.value)}
                            onChange={(e) =>
                              updateField(
                                'intereses',
                                e.target.checked
                                  ? [...formData.intereses, interest.value]
                                  : formData.intereses.filter((i) => i !== interest.value)
                              )
                            }
                            className="sr-only"
                          />
                          <div className="flex items-center gap-3">
                            <div className={cn(
                              'h-10 w-10 rounded-lg flex items-center justify-center',
                              formData.intereses.includes(interest.value)
                                ? 'bg-primary-600 text-white'
                                : 'bg-neutral-100 dark:bg-neutral-800'
                            )}>
                              <CheckCircle2 className="h-5 w-5" />
                            </div>
                            <span className="font-medium text-neutral-900 dark:text-neutral-100">
                              {interest.label}
                            </span>
                          </div>
                        </label>
                      ))}
                    </div>
                    <div className="flex justify-between">
                      <Button variant="secondary" onClick={prevStep}>
                        Atrás
                      </Button>
                      <Button onClick={nextStep} disabled={formData.intereses.length === 0}>
                        Continuar
                      </Button>
                    </div>
                  </div>
                )}

                {/* Step 4: Message */}
                {step === 4 && (
                  <div className="space-y-4" role="group" aria-labelledby="step4-title">
                    <h3 id="step4-title" className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
                      Tu mensaje
                    </h3>
                    <Textarea
                      label="Mensaje *"
                      placeholder="Cuéntanos tus dudas, consultas o comentarios..."
                      value={formData.mensaje}
                      onChange={(e) => updateField('mensaje', e.target.value)}
                      rows={5}
                      required
                    />
                    <Input
                      label="Adjuntar archivo (opcional)"
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                      onChange={(e) => updateField('archivo', e.target.files?.[0] || null)}
                    />
                    <div className="flex justify-between">
                      <Button variant="secondary" onClick={prevStep}>
                        Atrás
                      </Button>
                      <Button onClick={nextStep} disabled={!formData.mensaje.trim()}>
                        Continuar
                      </Button>
                    </div>
                  </div>
                )}

                {/* Step 5: Consent */}
                {step === 5 && (
                  <div className="space-y-4" role="group" aria-labelledby="step5-title">
                    <h3 id="step5-title" className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
                      Confirmación
                    </h3>
                    <Checkbox
                      label="Acepto la política de privacidad y el tratamiento de mis datos *"
                      checked={formData.consentimiento}
                      onChange={(e) => updateField('consentimiento', e.target.checked)}
                      required
                    />
                    <Checkbox
                      label="Quiero recibir novedades sobre admisión, eventos y noticias por email/WhatsApp"
                      checked={formData.suscripcion}
                      onChange={(e) => updateField('suscripcion', e.target.checked)}
                    />
                    <div className="flex justify-between">
                      <Button variant="secondary" onClick={prevStep}>
                        Atrás
                      </Button>
                      <Button type="submit" disabled={submitting || !formData.consentimiento}>
                        {submitting ? (
                          <>
                            <Loader2 className="h-4 w-4 animate-spin mr-1" />
                            Enviando...
                          </>
                        ) : (
                          <>
                            <Send className="h-4 w-4 mr-1" />
                            Enviar mensaje
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                )}
              </form>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}