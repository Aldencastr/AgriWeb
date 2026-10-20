import { auth, createUserWithEmailAndPassword } from '../../services/firebase.js'
import { esc } from '../../utils/dom.js'

const ERROR_MESSAGES = {
    'auth/email-already-in-use': 'Este correo ya está registrado',
    'auth/invalid-email': 'Correo inválido',
    'auth/weak-password': 'La contraseña debe tener al menos 6 caracteres'
}

export function openInscripcionModal() {
    closeInscripcionModal()

    document.body.insertAdjacentHTML('beforeend', `
        <div class="modal-overlay" data-inscripcion-modal>
            <div class="modal-content">
                <button class="modal-close" data-action="inscripcion-close" aria-label="Cerrar">
                    <i class="fa-solid fa-xmark"></i>
                </button>

                <div class="modal-header">
                    <h3>Inscríbete Ahora</h3>
                    <p>Crea tu cuenta para unirte a Ingeniería Agrícola</p>
                </div>

                <form id="inscripcion-form">
                    <div class="form-group">
                        <label for="insc-email">Correo electrónico</label>
                        <input
                            type="email"
                            id="insc-email"
                            name="insc-email"
                            placeholder="tu@correo.com"
                            required
                        />
                    </div>
                    <div class="form-group">
                        <label for="insc-username">Nombre de usuario</label>
                        <input
                            type="text"
                            id="insc-username"
                            name="insc-username"
                            placeholder="Tu nombre de usuario"
                            required
                        />
                    </div>
                    <div class="form-group">
                        <label for="insc-password">Contraseña</label>
                        <input
                            type="password"
                            id="insc-password"
                            name="insc-password"
                            placeholder="••••••••"
                            required
                            minlength="6"
                        />
                    </div>

                    <button type="submit" class="btn btn-primary btn-full">Inscribirme</button>
                </form>
            </div>
        </div>
    `)

    const modal = document.querySelector('[data-inscripcion-modal]')

    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeInscripcionModal()
    })
    modal.querySelector('.modal-content').addEventListener('click', (e) => e.stopPropagation())

    modal.querySelector('#inscripcion-form').addEventListener('submit', async (e) => {
        e.preventDefault()

        const email = modal.querySelector('#insc-email').value.trim()
        const username = modal.querySelector('#insc-username').value.trim()
        const password = modal.querySelector('#insc-password').value
        const errorEl = () => modal.querySelector('[data-insc-error]')
        const submitBtn = modal.querySelector('[type="submit"]')

        const showError = (message) => {
            modal.querySelector('[data-insc-error]')?.remove()
            submitBtn.insertAdjacentHTML('beforebegin', `<div class="form-error" data-insc-error>${esc(message)}</div>`)
        }

        if (!email || !username || !password) {
            showError('Todos los campos son obligatorios')
            return
        }
        if (password.length < 6) {
            showError('La contraseña debe tener al menos 6 caracteres')
            return
        }

        submitBtn.disabled = true
        submitBtn.textContent = 'Procesando...'
        try {
            await createUserWithEmailAndPassword(auth, email, password)
            modal.querySelector('.modal-content').innerHTML = `
                <div class="modal-header">
                    <h3>Inscríbete Ahora</h3>
                    <p>Crea tu cuenta para unirte a Ingeniería Agrícola</p>
                </div>
                <div class="form-success">¡Bienvenido, ${esc(username)}! Tu cuenta ha sido creada exitosamente.</div>
            `
            setTimeout(() => closeInscripcionModal(), 2000)
        } catch (err) {
            submitBtn.disabled = false
            submitBtn.textContent = 'Inscribirme'
            showError(ERROR_MESSAGES[err.code] || 'Error al crear la cuenta')
        }
    })
}

export function closeInscripcionModal() {
    document.querySelector('[data-inscripcion-modal]')?.remove()
}
