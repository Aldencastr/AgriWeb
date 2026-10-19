import { useState } from 'react'
import { auth, createUserWithEmailAndPassword } from '../../services/firebase'

function InscripcionModal({ onClose }) {
    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')
        setSuccess('')
        setLoading(true)

        if (!email.trim() || !username.trim() || !password.trim()) {
            setError('Todos los campos son obligatorios')
            setLoading(false)
            return
        }

        if (password.length < 6) {
            setError('La contraseña debe tener al menos 6 caracteres')
            setLoading(false)
            return
        }

        try {
            await createUserWithEmailAndPassword(auth, email.trim(), password)
            setSuccess(`¡Bienvenido, ${username}! Tu cuenta ha sido creada exitosamente.`)
            setTimeout(() => {
                onClose()
            }, 2000)
        } catch (err) {
            const messages = {
                'auth/email-already-in-use': 'Este correo ya está registrado',
                'auth/invalid-email': 'Correo inválido',
                'auth/weak-password': 'La contraseña debe tener al menos 6 caracteres',
            }
            setError(messages[err.code] || 'Error al crear la cuenta')
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
                    <h3>Inscríbete Ahora</h3>
                    <p>Crea tu cuenta para unirte a Ingeniería Agrícola</p>
                </div>

                {success && <div className="form-success">{success}</div>}

                {!success && (
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="insc-email">Correo electrónico</label>
                            <input
                                type="email"
                                id="insc-email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="tu@correo.com"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="insc-username">Nombre de usuario</label>
                            <input
                                type="text"
                                id="insc-username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder="Tu nombre de usuario"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="insc-password">Contraseña</label>
                            <input
                                type="password"
                                id="insc-password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                required
                                minLength={6}
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
}

export default InscripcionModal