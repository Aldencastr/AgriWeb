import {
    auth,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword
} from '../../services/firebase.js'
import { esc } from '../../utils/dom.js'

const ERROR_MESSAGES = {
    'auth/email-already-in-use': 'Este correo ya está registrado',
    'auth/invalid-email': 'Correo inválido',
    'auth/weak-password': 'La contraseña debe tener al menos 6 caracteres',
    'auth/user-not-found': 'Usuario no encontrado',
    'auth/wrong-password': 'Contraseña incorrecta',
    'auth/invalid-credential': 'Credenciales inválidas'
}

const state = { isRegister: false, loading: false, error: '', email: '' }

let onLogin = null

/** Reemplaza el marcado del modal conservando el foco en el correo. */
function render() {
    const modal = document.querySelector('[data-login-modal]')
    if (!modal) return

    modal.querySelector('.modal-inner').innerHTML = inner()
    wireOverlay(modal)
}

function inner() {
    return `
        <button class="modal-close" data-action="login-close" aria-label="Cerrar">
            <i class="fa-solid fa-xmark"></i>
        </button>

        <div class="modal-header">
            <h3>${state.isRegister ? 'Crear cuenta' : 'Iniciar sesión'}</h3>
            <p>${state.isRegister ? 'Regístrate para dejar reseñas' : 'Ingresa para dejar tu reseña'}</p>
        </div>

        <form id="login-form">
            <div class="form-group">
                <label for="login-email">Correo electrónico</label>
                <input
                    type="email"
                    id="login-email"
                    name="login-email"
                    value="${esc(state.email)}"
                    placeholder="tu@correo.com"
                    required
                />
            </div>
            <div class="form-group">
                <label for="login-password">Contraseña</label>
                <input
                    type="password"
                    id="login-password"
                    name="login-password"
                    placeholder="••••••••"
                    required
                    minlength="6"
                />
            </div>

            ${state.error ? `<div class="form-error">${esc(state.error)}</div>` : ''}

            <button type="submit" class="btn btn-primary btn-full" ${state.loading ? 'disabled' : ''}>
                ${state.loading ? 'Procesando...' : state.isRegister ? 'Registrarse' : 'Iniciar sesión'}
            </button>
        </form>

        <div class="modal-footer">
            ${state.isRegister ? `
                <p>¿Ya tienes cuenta? <button type="button" class="link-btn" data-action="login-switch">Inicia sesión</button></p>
            ` : `
                <p>¿No tienes cuenta? <button type="button" class="link-btn" data-action="login-switch">Regístrate</button></p>
            `}
        </div>
    `
}

function wireOverlay(modal) {
    // Cerrar al hacer clic fuera de la tarjeta; evitar cierres accidentales desde dentro
    modal.onclick = (e) => {
        if (e.target === modal) closeLoginModal()
    }
    modal.querySelector('.modal-content').onclick = (e) => e.stopPropagation()

    const form = modal.querySelector('#login-form')
    if (form) {
        form.onsubmit = async (e) => {
            e.preventDefault()
            if (state.loading) return
            state.error = ''
            state.loading = true
            state.email = form.querySelector('#login-email').value.trim()
            render()

            try {
                let credential
                if (state.isRegister) {
                    credential = await createUserWithEmailAndPassword(auth, state.email, form.querySelector('#login-password').value)
                } else {
                    credential = await signInWithEmailAndPassword(auth, state.email, form.querySelector('#login-password').value)
                }
                closeLoginModal()
                onLogin?.(credential.user)
            } catch (err) {
                state.error = ERROR_MESSAGES[err.code] || 'Error al iniciar sesión'
            } finally {
                const modalEl = document.querySelector('[data-login-modal]')
                state.loading = false
                if (modalEl) {
                    render()
                    modalEl.querySelector('#login-email')?.focus()
                }
            }
        }
    }
}

export function openLoginModal(callback) {
    onLogin = callback
    state.isRegister = false
    state.loading = false
    state.error = ''
    state.email = ''

    closeLoginModal()
    document.body.insertAdjacentHTML('beforeend', `
        <div class="modal-overlay" data-login-modal>
            <div class="modal-content">
                ${inner()}
            </div>
        </div>
    `)

    const modal = document.querySelector('[data-login-modal]')
    wireOverlay(modal)
    modal.querySelector('#login-email')?.focus()
}

export function closeLoginModal() {
    document.querySelector('[data-login-modal]')?.remove()
}

export function loginSwitch() {
    state.isRegister = !state.isRegister
    state.error = ''
    render()
    document.querySelector('[data-login-modal] #login-email')?.focus()
}
