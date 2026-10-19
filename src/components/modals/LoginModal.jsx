import { useState } from 'react'
import { auth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from '../../services/firebase'

function LoginModal({ onClose, onLogin }) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isRegister, setIsRegister] = useState(false)
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')
        setLoading(true)
        try {
            let credential
            if (isRegister) {
                credential = await createUserWithEmailAndPassword(auth, email.trim(), password)
            } else {
                credential = await signInWithEmailAndPassword(auth, email.trim(), password)
            }
            onLogin(credential.user)
            onClose()
        } catch (err) {
            const messages = {
                'auth/email-already-in-use': 'Este correo ya está registrado',
                'auth/invalid-email': 'Correo inválido',
                'auth/weak-password': 'La contraseña debe tener al menos 6 caracteres',
                'auth/user-not-found': 'Usuario no encontrado',
                'auth/wrong-password': 'Contraseña incorrecta',
                'auth/invalid-credential': 'Credenciales inválidas',
            }
            setError(messages[err.code] || 'Error al iniciar sesión')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <button className="modal-close" onClick={onClose} aria-label="Cerrar">
                    <i className="fa-solid fa-xmark"></i>
                </button>

                <div className="modal-header">
                    <h3>{isRegister ? 'Crear cuenta' : 'Iniciar sesión'}</h3>
                    <p>{isRegister ? 'Regístrate para dejar reseñas' : 'Ingresa para dejar tu reseña'}</p>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="email">Correo electrónico</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="tu@correo.com"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Contraseña</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                            required
                            minLength={6}
                        />
                    </div>

                    {error && <div className="form-error">{error}</div>}

                    <button type="submit" className="btn btn-primary btn-full" disabled={loading}>
                        {loading ? 'Procesando...' : isRegister ? 'Registrarse' : 'Iniciar sesión'}
                    </button>
                </form>

                <div className="modal-footer">
                    {isRegister ? (
                        <p>¿Ya tienes cuenta? <button type="button" className="link-btn" onClick={() => setIsRegister(false)}>Inicia sesión</button></p>
                    ) : (
                        <p>¿No tienes cuenta? <button type="button" className="link-btn" onClick={() => setIsRegister(true)}>Regístrate</button></p>
                    )}
                </div>
            </div>
        </div>
    )
}

export default LoginModal