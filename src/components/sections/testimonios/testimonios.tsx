'use client'

import { useState, useRef } from 'react'
import { Star, MessageCircle, Send, UserPlus, LogOut, Loader2 } from 'lucide-react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { cn } from '@/lib/utils'
import { useToast } from '@/hooks/useToast'
import { Analytics } from '@/services/analytics.service'
import type { Testimonio } from '@/lib/types'

interface TestimoniosSectionProps {
  initialTestimonios?: Testimonio[]
  onLogin?: () => void
  onLogout?: () => void
  user?: { email: string; uid: string } | null
}

export function TestimoniosSection({
  initialTestimonios = [],
  onLogin,
  onLogout,
  user,
}: TestimoniosSectionProps) {
  const [showForm, setShowForm] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    nombre: '',
    rol: '',
    texto: '',
  })
  const formRef = useRef<HTMLFormElement>(null)
  const { success, error } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.nombre.trim() || !formData.texto.trim()) {
      error('Campos incompletos', 'Por favor completa tu nombre y la reseña')
      return
    }

    if (!user) {
      error('Sesión requerida', 'Debes iniciar sesión para dejar una reseña')
      onLogin?.()
      return
    }

    setSubmitting(true)
    try {
      // In a real app, this would call the Firebase service
      // await submitTestimonio({ ...formData, uid: user.uid })
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      setFormData({ nombre: '', rol: '', texto: '' })
      setShowForm(false)
      success('¡Reseña enviada!', 'Gracias por compartir tu experiencia')
      Analytics.testimonialSubmit(true)
    } catch {
      error('Error', 'No se pudo guardar la reseña. Inténtalo de nuevo.')
      Analytics.testimonialSubmit(false)
    } finally {
      setSubmitting(false)
    }
  }

  const handleLogout = async () => {
    onLogout?.()
    setShowForm(false)
    success('Sesión cerrada', 'Has cerrado sesión correctamente')
  }

  const allTestimonios = initialTestimonios

  return (
    <section id="testimonios" className="py-20 lg:py-28 bg-neutral-50 dark:bg-neutral-900/50" aria-labelledby="testimonios-title">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 id="testimonios-title" className="text-3xl sm:text-4xl font-extrabold text-neutral-900 dark:text-neutral-100 mb-4">
            Testimonios
          </h2>
          <p className="text-lg text-neutral-600 dark:text-neutral-400">
            Escucha a estudiantes y egresados sobre su experiencia en la carrera.
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
          {user ? (
            <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
              <div className="flex items-center gap-3 text-sm text-neutral-600 dark:text-neutral-400">
                <UserPlus className="h-4 w-4" />
                <span>{user.email}</span>
              </div>
              <Button variant="outline" size="sm" onClick={handleLogout}>
                <LogOut className="h-4 w-4 mr-1" />
                Cerrar sesión
              </Button>
              {!showForm && (
                <Button variant="secondary" onClick={() => setShowForm(true)}>
                  <MessageCircle className="h-4 w-4 mr-1" />
                  Nueva reseña
                </Button>
              )}
            </div>
          ) : (
            <Button variant="primary" onClick={onLogin} className="w-full sm:w-auto">
              <UserPlus className="h-4 w-4 mr-1" />
              Iniciar sesión para dejar reseña
            </Button>
          )}
        </div>

        {/* Review Form */}
        {showForm && user && (
          <Card className="mb-10 max-w-2xl mx-auto" variant="elevated">
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
              <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
                Deja tu reseña
              </h3>
              <div className="grid sm:grid-cols-2 gap-4">
                <Input
                  label="Nombre *"
                  placeholder="Tu nombre"
                  value={formData.nombre}
                  onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                  required
                />
                <Input
                  label="Rol"
                  placeholder="Estudiante, Egresado, etc."
                  value={formData.rol}
                  onChange={(e) => setFormData({ ...formData, rol: e.target.value })}
                />
              </div>
              <Textarea
                label="Tu reseña *"
                placeholder="Comparte tu experiencia en la carrera..."
                value={formData.texto}
                onChange={(e) => setFormData({ ...formData, texto: e.target.value })}
                rows={4}
                required
              />
              <div className="flex justify-end gap-3">
                <Button type="button" variant="secondary" onClick={() => setShowForm(false)} disabled={submitting}>
                  Cancelar
                </Button>
                <Button type="submit" disabled={submitting}>
                  <Send className="h-4 w-4 mr-1" />
                  {submitting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin mr-1" />
                      Guardando...
                    </>
                  ) : (
                    'Enviar reseña'
                  )}
                </Button>
              </div>
            </form>
          </Card>
        )}

        {/* Testimonials Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3" role="list" aria-label="Testimonios">
          {allTestimonios.map((t, i) => (
            <Card
              key={i}
              variant="bordered"
              className="flex flex-col h-full"
              role="listitem"
            >
              <blockquote className="flex-1">
                <div className="flex gap-1 mb-3" aria-label={`${t.rol} - Rating`}>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className="h-5 w-5 text-yellow-400 fill-current"
                      aria-hidden="true"
                    />
                  ))}
                </div>
                <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed">
                  &ldquo;{t.texto}&rdquo;
                </p>
              </blockquote>
              <div className="flex items-center gap-3 pt-4 border-t border-surface-border">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={t.imagen} alt={t.nombre} />
                  <AvatarFallback>
                    {t.nombre.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium text-neutral-900 dark:text-neutral-100 text-sm">
                    {t.nombre}
                  </p>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400">
                    {t.rol}
                  </p>
                </div>
              </div>
            </Card>
          ))}

          {allTestimonios.length === 0 && (
            <Card variant="bordered" className="col-span-full text-center py-12">
              <MessageCircle className="h-12 w-12 mx-auto text-neutral-300 dark:text-neutral-700 mb-4" />
              <h3 className="text-lg font-medium text-neutral-900 dark:text-neutral-100 mb-2">
                Sé el primero en dejar una reseña
              </h3>
              <p className="text-neutral-500 dark:text-neutral-400 mb-4">
                Tu experiencia ayuda a futuros estudiantes a tomar la mejor decisión.
              </p>
              {user ? (
                <Button onClick={() => setShowForm(true)}>
                  <MessageCircle className="h-4 w-4 mr-1" />
                  Escribir mi reseña
                </Button>
              ) : (
                <Button variant="primary" onClick={onLogin}>
                  <UserPlus className="h-4 w-4 mr-1" />
                  Iniciar sesión para reseñar
                </Button>
              )}
            </Card>
          )}
        </div>
      </div>
    </section>
  )
}