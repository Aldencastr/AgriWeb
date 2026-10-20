import { esc, toArray } from '../../utils/dom.js'
import { auth, push, signOut, testimoniosRef } from '../../services/firebase.js'
import { openLoginModal } from '../modals/LoginModal.js'

const state = {}

function Testimonios({ items = [], user, showForm, newReview, submitStatus, submitError, submitting }) {
    const values = toArray(items)

    return `
        <section id="testimonios" class="section bg-light">
            <div class="container">
                <div class="section-title reveal">
                    <h2>Testimonios</h2>
                    <p>Escucha a estudiantes y egresados sobre su experiencia en la carrera.</p>
                </div>

                <div class="reviews-actions reveal">
                    ${user ? `
                        <div class="user-info">
                            <span><i class="fa-solid fa-user-circle"></i> ${esc(user.email)}</span>
                            <button class="btn btn-secondary btn-sm" data-action="testimonios-logout">
                                <i class="fa-solid fa-sign-out-alt"></i> Cerrar sesión
                            </button>
                        </div>` : `
                        <button class="btn btn-primary" data-action="testimonios-login">
                            <i class="fa-solid fa-sign-in-alt"></i> Iniciar sesión para dejar reseña
                        </button>
                    `}
                    ${user ? `
                        <button class="btn btn-secondary" data-action="testimonios-toggle-form">
                            <i class="fa-solid fa-plus"></i> Nueva reseña
                        </button>` : ''}
                </div>

                ${submitStatus ? `
                    <div class="${submitError ? 'form-error' : 'form-success'}" role="status">
                        ${esc(submitStatus)}
                    </div>` : ''}

                ${showForm && user ? `
                    <div class="review-form-container">
                        <form class="review-form" id="review-form">
                            <h4>Deja tu reseña</h4>
                            <div class="form-row">
                                <div class="form-group">
                                    <label for="review-nombre">Nombre *</label>
                                    <input
                                        type="text"
                                        id="review-nombre"
                                        name="review-nombre"
                                        value="${esc(newReview.nombre)}"
                                        placeholder="Tu nombre"
                                        required
                                    />
                                </div>
                                <div class="form-group">
                                    <label for="review-rol">Rol</label>
                                    <input
                                        type="text"
                                        id="review-rol"
                                        name="review-rol"
                                        value="${esc(newReview.rol)}"
                                        placeholder="Estudiante, Egresado, etc."
                                    />
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="review-texto">Tu reseña *</label>
                                <textarea
                                    id="review-texto"
                                    name="review-texto"
                                    placeholder="Comparte tu experiencia en la carrera..."
                                    rows="4"
                                    required
                                >${esc(newReview.texto)}</textarea>
                            </div>
                            <div class="form-actions">
                                <button type="button" class="btn btn-secondary" data-action="testimonios-toggle-form" ${submitting ? 'disabled' : ''}>
                                    Cancelar
                                </button>
                                <button type="submit" class="btn btn-primary" ${submitting ? 'disabled' : ''}>
                                    <i class="fa-solid fa-paper-plane"></i> ${submitting ? 'Guardando...' : 'Enviar reseña'}
                                </button>
                            </div>
                        </form>
                    </div>` : ''}

                <div class="testimonials-grid">
                    ${values.map((t) => `
                        <div class="testimonial-card reveal">
                            <p>"${esc(t.texto || '')}"</p>
                            <div class="testimonial-author">
                                <img src="${esc(t.imagen || 'images/logo.jpeg')}" alt="${esc(t.nombre || 'Usuario')}" loading="lazy" />
                                <div class="testimonial-author-info">
                                    <h4>${esc(t.nombre || 'Usuario')}</h4>
                                    <span>${esc(t.rol || '')}</span>
                                </div>
                            </div>
                        </div>`).join('')}
                    ${values.length === 0 ? '<div class="card-loading">Sé el primero en dejar una reseña.</div>' : ''}
                </div>
            </div>
        </section>
    `
}

/** Estado interactivo del formulario de reseñas. */
export function createTestimoniosState() {
    state.showForm = false
    state.newReview = { nombre: '', rol: '', texto: '' }
    state.submitStatus = ''
    state.submitError = false
    state.submitting = false
}

export function getTestimoniosState() {
    return state
}

export async function submitTestimonios(user) {
    state.submitStatus = ''
    state.submitError = false

    const form = document.getElementById('review-form')
    if (!form) return

    if (!state.newReview.nombre.trim() || !state.newReview.texto.trim()) {
        state.submitError = true
        state.submitStatus = 'Por favor completa los campos obligatorios'
        return
    }

    state.submitting = true
    try {
        await push(testimoniosRef, {
            nombre: state.newReview.nombre.trim(),
            rol: state.newReview.rol.trim() || 'Estudiante',
            texto: state.newReview.texto.trim(),
            uid: user.uid,
            creadoEn: Date.now()
        })
        state.newReview = { nombre: '', rol: '', texto: '' }
        state.showForm = false
        state.submitStatus = '¡Reseña enviada con éxito!'
    } catch (error) {
        console.error('Error al guardar la reseña:', error)
        state.submitError = true
        state.submitStatus = 'No se pudo guardar la reseña. Revisa tu conexión y los permisos de Firebase.'
    } finally {
        state.submitting = false
    }
}

export async function handleTestimoniosLogout() {
    try {
        await signOut(auth)
    } catch (error) {
        console.error('Error al cerrar sesión:', error)
        state.submitError = true
        state.submitStatus = 'No se pudo cerrar la sesión. Inténtalo nuevamente.'
    }
}

export function handleTestimoniosLogin() {
    openLoginModal()
}

export default Testimonios
