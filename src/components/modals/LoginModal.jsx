import React, { useState, useRef, useEffect, useImperativeHandle, forwardRef } from 'react'
import { auth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from '../../services/firebase'

const ERROR_MESSAGES = {
  'auth/email-already-in-use': 'Este correo ya está registrado',
  'auth/invalid-email': 'Correo inválido',
  'auth/weak-password': 'La contraseña debe tener al menos 6 caracteres',
  'auth/user-not-found': 'Usuario no encontrado',
  'auth/wrong-password': 'Contraseña incorrecta',
  'auth/invalid-credential': 'Credenciales inválidas',
}

const LoginModalContent = forwardRef((props, ref) => {
  const { isOpen, onClose, onLoginSuccess } = props
  const [isRegister, setIsRegister] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [email, setEmail] = useState('')
  const formRef = useRef(null)
  const emailInputRef = useRef(null)

  useImperativeHandle(ref, () => ({
    open: () => {
      setIsRegister(false)
      setLoading(false)
      setError('')
      setEmail('')
      props.onOpen?.()
    },
    close: () => {
      setIsRegister(false)
      setLoading(false)
      setError('')
      setEmail('')
      props.onClose?.()
    },
  }))

  // Focus email input when modal opens
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

    const emailValue = email.trim()
    const password = formRef.current?.querySelector('#login-password')?.value || ''

    try {
      let credential
      if (isRegister) {
        credential = await createUserWithEmailAndPassword(auth, emailValue, password)
      } else {
        credential = await signInWithEmailAndPassword(auth, emailValue, password)
      }
      onLoginSuccess?.(credential.user)
      props.onClose?.()
    } catch (err) {
      setError(ERROR_MESSAGES[err.code] || 'Error al iniciar sesión')
    } finally {
      setLoading(false)
    }
  }

  const handleSwitch = () => {
    setIsRegister((prev) => !prev)
    setError('')
  }

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      props.onClose?.()
    }
  }

  return (
    <div className="modal-overlay" onClick={handleOverlayClick} data-login-modal>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={props.onClose} aria-label="Cerrar" type="button">
          <i className="fa-solid fa-xmark" aria-hidden="true" />
        </button>

        <div className="modal-header">
          <h3>{isRegister ? 'Crear cuenta' : 'Iniciar sesión'}</h3>
          <p>{isRegister ? 'Regístrate para dejar reseñas' : 'Ingresa para dejar tu reseña'}</p>
        </div>

        <form ref={formRef} id="login-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="login-email">Correo electrónico</label>
            <input
              ref={emailInputRef}
              type="email"
              id="login-email"
              name="login-email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tu@correo.com"
              required
              autoComplete="email"
            />
          </div>
          <div className="form-group">
            <label htmlFor="login-password">Contraseña</label>
            <input
              type="password"
              id="login-password"
              name="login-password"
              placeholder="••••••••"
              required
              minLength={6}
              autoComplete={isRegister ? 'new-password' : 'current-password'}
            />
          </div>

          {error && <div className="form-error">{error}</div>}

          <button type="submit" className="btn btn-primary btn-full" disabled={loading}>
            {loading ? 'Procesando...' : isRegister ? 'Registrarse' : 'Iniciar sesión'}
          </button>
        </form>

        <div className="modal-footer">
          {isRegister ? (
            <p>¿Ya tienes cuenta? <button type="button" className="link-btn" onClick={handleSwitch}>Inicia sesión</button></p>
          ) : (
            <p>¿No tienes cuenta? <button type="button" className="link-btn" onClick={handleSwitch}>Regístrate</button></p>
          )}
        </div>
      </div>
    </div>
  )
})

export const LoginModal = LoginModalContent

// Legacy exports for compatibility
let loginCallback = null

export function openLoginModal(callback) {
  loginCallback = callback
  // The actual opening is handled by React state in parent
}

export function closeLoginModal() {
  // Handled by React state in parent
}

export function loginSwitch() {
  // Handled by React state in parent
}

export default LoginModal