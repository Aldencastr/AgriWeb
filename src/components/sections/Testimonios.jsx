import React, { useState, useRef, useEffect } from 'react'
import { toArray } from '../../utils/dom'
import { push, signOut, testimoniosRef } from '../../services/firebase'
import { useAuth } from '../../hooks/useAuth'

export default function Testimonios({ items = [], user, onLogin, onLogout, showForm, onToggleForm, newReview, setNewReview, submitting }) {
  const values = toArray(items)
  const [submitStatus, setSubmitStatus] = useState('')
  const [submitError, setSubmitError] = useState(false)
  const formRef = useRef(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitStatus('')
    setSubmitError(false)

    if (!newReview.nombre.trim() || !newReview.texto.trim()) {
      setSubmitError(true)
      setSubmitStatus('Por favor completa los campos obligatorios')
      return
    }

    if (!user) {
      setSubmitError(true)
      setSubmitStatus('Debes iniciar sesión para dejar una reseña')
      return
    }

    setSubmitting(true)
    try {
      await push(testimoniosRef, {
        nombre: newReview.nombre.trim(),
        rol: newReview.rol.trim() || 'Estudiante',
        texto: newReview.texto.trim(),
        uid: user.uid,
        creadoEn: Date.now(),
      })
      setNewReview({ nombre: '', rol: '', texto: '' })
      onToggleForm()
      setSubmitStatus('¡Reseña enviada con éxito!')
      setSubmitError(false)
    } catch (error) {
      console.error('Error al guardar la reseña:', error)
      setSubmitError(true)
      setSubmitStatus('No se pudo guardar la reseña. Revisa tu conexión y los permisos de Firebase.')
    } finally {
      setSubmitting(false)
    }
  }

  const handleLogout = async () => {
    try {
      await signOut(auth)
      onLogout()
    } catch (error) {
      console.error('Error al cerrar sesión:', error)
      setSubmitError(true)
      setSubmitStatus('No se pudo cerrar la sesión. Inténtalo nuevamente.')
    }
  }

  return (
    <section id="testimonios" className="section bg-light">
      <div className="container">
        <div className="section-title reveal">
          <h2>Testimonios</h2>
          <p>Escucha a estudiantes y egresados sobre su experiencia en la carrera.</p>
        </div>

        <div className="reviews-actions reveal">
          {user ? (
            <div className="user-info">
              <span><i className="fa-solid fa-user-circle" aria-hidden="true" /> {user.email}</span>
              <button className="btn btn-secondary btn-sm" onClick={handleLogout}>
                <i className="fa-solid fa-sign-out-alt" aria-hidden="true" /> Cerrar sesión
              </button>
            </div>
          ) : (
            <button className="btn btn-primary" onClick={onLogin}>
              <i className="fa-solid fa-sign-in-alt" aria-hidden="true" /> Iniciar sesión para dejar reseña
            </button>
          )}
          {user && (
            <button className="btn btn-secondary" onClick={onToggleForm}>
              <i className="fa-solid fa-plus" aria-hidden="true" /> Nueva reseña
            </button>
          )}
        </div>

        {submitStatus && (
          <div className={submitError ? 'form-error' : 'form-success'} role="status">
            {submitStatus}
          </div>
        )}

        {showForm && user && (
          <div className="review-form-container">
            <form className="review-form" ref={formRef} onSubmit={handleSubmit}>
              <h4>Deja tu reseña</h4>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="review-nombre">Nombre *</label>
                  <input
                    type="text"
                    id="review-nombre"
                    name="review-nombre"
                    value={newReview.nombre}
                    onChange={(e) => setNewReview({ ...newReview, nombre: e.target.value })}
                    placeholder="Tu nombre"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="review-rol">Rol</label>
                  <input
                    type="text"
                    id="review-rol"
                    name="review-rol"
                    value={newReview.rol}
                    onChange={(e) => setNewReview({ ...newReview, rol: e.target.value })}
                    placeholder="Estudiante, Egresado, etc."
                  />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="review-texto">Tu reseña *</label>
                <textarea
                  id="review-texto"
                  name="review-texto"
                  value={newReview.texto}
                  onChange={(e) => setNewReview({ ...newReview, texto: e.target.value })}
                  placeholder="Comparte tu experiencia en la carrera..."
                  rows={4}
                  required
                />
              </div>
              <div className="form-actions">
                <button type="button" className="btn btn-secondary" onClick={onToggleForm} disabled={submitting}>
                  Cancelar
                </button>
                <button type="submit" className="btn btn-primary" disabled={submitting}>
                  <i className="fa-solid fa-paper-plane" aria-hidden="true" />
                  {submitting ? 'Guardando...' : 'Enviar reseña'}
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="testimonials-grid">
          {values.map((t, i) => (
            <div key={i} className="testimonial-card reveal">
              <p>"{t.texto || ''}"</p>
              <div className="testimonial-author">
                <img
                  src={t.imagen || '/images/logo.jpeg'}
                  alt={t.nombre || 'Usuario'}
                  loading="lazy"
                />
                <div className="testimonial-author-info">
                  <h4>{t.nombre || 'Usuario'}</h4>
                  <span>{t.rol || ''}</span>
                </div>
              </div>
            </div>
          ))}
          {values.length === 0 && <div className="card-loading">Sé el primero en dejar una reseña.</div>}
        </div>
      </div>
    </section>
  )
}

// Funciones de utilidad exportadas para compatibilidad
export function createTestimoniosState() {
  // En React el estado se maneja con hooks en el componente padre
}

export function getTestimoniosState() {
  // En React el estado se maneja con hooks en el componente padre
  return {}
}

export async function submitTestimonios(user, newReview, setNewReview, onToggleForm, setSubmitting, setSubmitStatus, setSubmitError) {
  setSubmitStatus('')
  setSubmitError(false)

  if (!newReview.nombre.trim() || !newReview.texto.trim()) {
    setSubmitError(true)
    setSubmitStatus('Por favor completa los campos obligatorios')
    return
  }

  setSubmitting(true)
  try {
    await push(testimoniosRef, {
      nombre: newReview.nombre.trim(),
      rol: newReview.rol.trim() || 'Estudiante',
      texto: newReview.texto.trim(),
      uid: user.uid,
      creadoEn: Date.now(),
    })
    setNewReview({ nombre: '', rol: '', texto: '' })
    onToggleForm()
    setSubmitStatus('¡Reseña enviada con éxito!')
    setSubmitError(false)
  } catch (error) {
    console.error('Error al guardar la reseña:', error)
    setSubmitError(true)
    setSubmitStatus('No se pudo guardar la reseña. Revisa tu conexión y los permisos de Firebase.')
  } finally {
    setSubmitting(false)
  }
}

export async function handleTestimoniosLogout(auth) {
  try {
    await signOut(auth)
  } catch (error) {
    console.error('Error al cerrar sesión:', error)
  }
}