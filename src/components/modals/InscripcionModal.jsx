import React, { useState, useRef, useEffect, useImperativeHandle, forwardRef } from 'react'
import { auth, createUserWithEmailAndPassword } from '../../services/firebase'

const ERROR_MESSAGES = {
  'auth/email-already-in-use': 'Este correo ya está registrado',
  'auth/invalid-email': 'Correo inválido',
  'auth/weak-password': 'La contraseña debe tener al menos 6 caracteres',
}

const InscripcionModalContent = forwardRef((props, ref) => {
  const { isOpen, onClose } = props
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [formData, setFormData] = useState({ email: '', username: '', password: '' })
  const formRef = useRef(null)
  const emailInputRef = useRef(null)

  useImperativeHandle(ref, () => ({
    open: () => {
      setLoading(false)
      setError('')
      setSuccess(false)
      setFormData({ email: '', username: '', password: '' })
    },
    close: () => {
      setLoading(false)
      setError('')
      setSuccess(false)
      setFormData({ email: '', username: '', password: '' })
      props.onClose?.()
    },
  }))

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => emailInputRef.current?.focus(), 100)
    }
  }, [isOpen])

  if (!isOpen) return null

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (loading) return
    setError('')
    setLoading(true)

    try {
      await createUserWithEmailAndPassword(auth, formData.email, formData.password)
      setSuccess(true)
      setTimeout(() => {
        props.onClose?.()
      }, 2000)
    } catch (err) {
      setLoading(false)
      setError(ERROR_MESSAGES[err.code] || 'Error al crear la cuenta')
    }
  }

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      props.onClose?.()
    }
  }

  return (
    <div className="modal-overlay" onClick={handleOverlayClick} data-inscripcion-modal>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={props.onClose} aria-label="Cerrar" type="button">
          <i className="fa-solid fa-xmark" aria-hidden="true" />
        </button>

        <div className="modal-header">
          <h3>Inscríbete Ahora</h3>
          <p>Crea tu cuenta para unirte a Ingeniería Agrícola</p>
        </div>

        {success ? (
          <div className="form-success">
            ¡Bienvenido, {formData.username}! Tu cuenta ha sido creada exitosamente.
          </div>
        ) : (
          <form ref={formRef} id="inscripcion-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="insc-email">Correo electrónico</label>
              <input
                ref={emailInputRef}
                type="email"
                id="insc-email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="tu@correo.com"
                required
                autoComplete="email"
              />
            </div>
            <div className="form-group">
              <label htmlFor="insc-username">Nombre de usuario</label>
              <input
                type="text"
                id="insc-username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Tu nombre de usuario"
                required
                autoComplete="username"
              />
            </div>
            <div className="form-group">
              <label htmlFor="insc-password">Contraseña</label>
              <input
                type="password"
                id="insc-password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                required
                minLength={6}
                autoComplete="new-password"
              />
            </div>

            {error && <div className="form-error">{error}</div>}

            <button type="submit" className="btn btn-primary btn-full" disabled={loading}>
              {loading ? 'Procesando...' : 'Inscribirme'}
            </button>
          </form>
        )}
      </div>
    </div>
  )
})

export const InscripcionModal = InscripcionModalContent

// Legacy exports for compatibility
export function openInscripcionModal() {
  // Handled by React state in parent
}

export function closeInscripcionModal() {
  // Handled by React state in parent
}

export default InscripcionModal