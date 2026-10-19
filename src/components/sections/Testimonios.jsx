import { lazy, Suspense, useState, useEffect } from 'react'
import assetUrl from '../../utils/assetUrl'
import { auth, push, signOut, testimoniosRef, onAuthStateChanged } from '../../services/firebase'

const LoginModal = lazy(() => import('../modals/LoginModal'))

function Testimonios({ items = [] }) {
    const [user, setUser] = useState(null)
    const [showLogin, setShowLogin] = useState(false)
    const [showForm, setShowForm] = useState(false)
    const [newReview, setNewReview] = useState({ nombre: '', rol: '', texto: '' })
    const [submitStatus, setSubmitStatus] = useState('')
    const [submitError, setSubmitError] = useState(false)
    const [submitting, setSubmitting] = useState(false)
    const values = (Array.isArray(items) ? items : Object.values(items || {}))
        .filter((item) => item && typeof item === 'object')

    useEffect(() => {
        return onAuthStateChanged(
            auth,
            setUser,
            (error) => {
                console.error('Error al verificar la sesión:', error)
                setSubmitError(true)
                setSubmitStatus('No se pudo verificar la sesión. Inténtalo nuevamente.')
            }
        )
    }, [])

    const handleLogin = (loggedUser) => {
        setUser(loggedUser)
    }

    const handleLogout = async () => {
        try {
            await signOut(auth)
            setUser(null)
        } catch (error) {
            console.error('Error al cerrar sesión:', error)
            setSubmitError(true)
            setSubmitStatus('No se pudo cerrar la sesión. Inténtalo nuevamente.')
        }
    }

    const handleSubmitReview = async (e) => {
        e.preventDefault()
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
                creadoEn: Date.now()
            })
            setNewReview({ nombre: '', rol: '', texto: '' })
            setShowForm(false)
            setSubmitStatus('¡Reseña enviada con éxito!')
        } catch (error) {
            console.error('Error al guardar la reseña:', error)
            setSubmitError(true)
            setSubmitStatus('No se pudo guardar la reseña. Revisa tu conexión y los permisos de Firebase.')
        } finally {
            setSubmitting(false)
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
                            <span><i className="fa-solid fa-user-circle"></i> {user.email}</span>
                            <button className="btn btn-secondary btn-sm" onClick={handleLogout}>
                                <i className="fa-solid fa-sign-out-alt"></i> Cerrar sesión
                            </button>
                        </div>
                    ) : (
                        <button className="btn btn-primary" onClick={() => setShowLogin(true)}>
                            <i className="fa-solid fa-sign-in-alt"></i> Iniciar sesión para dejar reseña
                        </button>
                    )}
                    {user && (
                        <button className="btn btn-secondary" onClick={() => setShowForm(!showForm)}>
                            <i className="fa-solid fa-plus"></i> Nueva reseña
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
                        <form className="review-form" onSubmit={handleSubmitReview}>
                            <h4>Deja tu reseña</h4>
                            <div className="form-row">
                                <div className="form-group">
                                    <label htmlFor="review-nombre">Nombre *</label>
                                    <input
                                        type="text"
                                        id="review-nombre"
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
                                    value={newReview.texto}
                                    onChange={(e) => setNewReview({ ...newReview, texto: e.target.value })}
                                    placeholder="Comparte tu experiencia en la carrera..."
                                    rows={4}
                                    required
                                />
                            </div>
                            <div className="form-actions">
                                <button type="button" className="btn btn-secondary" onClick={() => setShowForm(false)} disabled={submitting}>
                                    Cancelar
                                </button>
                                <button type="submit" className="btn btn-primary" disabled={submitting}>
                                    <i className="fa-solid fa-paper-plane"></i> {submitting ? 'Guardando...' : 'Enviar reseña'}
                                </button>
                            </div>
                        </form>
                    </div>
                )}

                <div className="testimonials-grid">
                    {values.map((t, i) => (
                        <div className="testimonial-card reveal" key={i}>
                            <p>"{t.texto || ''}"</p>
                            <div className="testimonial-author">
                                <img src={t.imagen || assetUrl('/images/logo.jpeg')} alt={t.nombre || 'Usuario'} loading="lazy" />
                                <div className="testimonial-author-info">
                                    <h4>{t.nombre || 'Usuario'}</h4>
                                    <span>{t.rol || ''}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                    {values.length === 0 && (
                        <div className="card-loading">Sé el primero en dejar una reseña.</div>
                    )}
                </div>
            </div>

            {showLogin && (
                <Suspense fallback={<div className="form-success" role="status">Cargando inicio de sesión...</div>}>
                    <LoginModal onClose={() => setShowLogin(false)} onLogin={handleLogin} />
                </Suspense>
            )}
        </section>
    )
}

export default Testimonios