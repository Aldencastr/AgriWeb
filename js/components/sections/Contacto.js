import { push, ref, db } from '../../services/firebase.js'
import {
    campusDirectionsUrl,
    campusLocation,
    campusMapEmbedUrl,
    campusMapsUrl
} from '../../data/campusLocation.js'
import { officialSocialLinks } from '../../data/socialLinks.js'
import { esc } from '../../utils/dom.js'

const state = { status: '', error: false, submitting: false }

function Contacto({ contacto = {} }) {
    const email = contacto.correo || 'evenorcast@gmail.com'
    const phone = contacto.telefono || '86855972'
    const phoneLink = phone.replace(/[^\d+]/g, '')

    return `
        <section id="contacto" class="container section contact-section">
            <div class="contact-card">
                <h2>¿Listo para transformar el futuro del agro?</h2>
                <p>Comunícate con nuestra facultad o acércate a nuestras instalaciones.</p>

                <div class="contact-details">
                    <p><i class="fa-solid fa-building-columns"></i> ${esc(contacto.facultad || 'Universidad Nacional de Ingeniería (UNI)')}</p>
                    <p><i class="fa-solid fa-map-marker-alt"></i> ${esc(campusLocation.name)}</p>
                    <p><i class="fa-solid fa-globe"></i> Coordenadas: ${esc(campusLocation.coordinatesLabel)}</p>
                    <p><i class="fa-solid fa-university"></i> ${esc(contacto.instituciones || 'UNICAM · FAE-Masaya')}</p>
                    <p><i class="fa-solid fa-envelope"></i> <a href="mailto:${esc(email)}">${esc(email)}</a></p>
                    <p><i class="fa-solid fa-phone"></i> <a href="tel:${esc(phoneLink)}">${esc(phone)}</a></p>
                </div>

                <div class="contact-form-wrapper">
                    <h3>Envíanos un mensaje</h3>
                    ${state.status ? `
                        <div class="${state.error ? 'form-error' : 'form-success'}" role="${state.error ? 'alert' : 'status'}">
                            ${esc(state.status)}
                        </div>` : ''}
                    <form class="contact-form" id="contact-form" aria-busy="${state.submitting}">
                        <div class="form-row">
                            <div class="form-group">
                                <label for="contact-nombre">Nombre *</label>
                                <input
                                    type="text"
                                    id="contact-nombre"
                                    name="contact-nombre"
                                    autocomplete="name"
                                    placeholder="Tu nombre"
                                    required
                                />
                            </div>
                            <div class="form-group">
                                <label for="contact-correo">Correo *</label>
                                <input
                                    type="email"
                                    id="contact-correo"
                                    name="contact-correo"
                                    autocomplete="email"
                                    placeholder="tu@correo.com"
                                    required
                                />
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="contact-telefono">Teléfono</label>
                            <input
                                type="tel"
                                id="contact-telefono"
                                name="contact-telefono"
                                autocomplete="tel"
                                placeholder="86855972"
                            />
                        </div>
                        <div class="form-group">
                            <label for="contact-mensaje">Mensaje *</label>
                            <textarea
                                id="contact-mensaje"
                                name="contact-mensaje"
                                placeholder="Escribe tu mensaje aquí..."
                                rows="4"
                                required
                            ></textarea>
                        </div>
                        <button type="submit" class="btn btn-primary" ${state.submitting ? 'disabled' : ''}>
                            ${state.submitting ? 'Enviando...' : 'Enviar mensaje'}
                            <i class="fa-solid fa-paper-plane"></i>
                        </button>
                    </form>
                </div>

                <div class="contact-social">
                    <h4>Síguenos</h4>
                    <p class="social-description">Síguenos en nuestras redes sociales oficiales</p>
                    <div class="social-links">
                        ${officialSocialLinks.map((social) => `
                            <a
                                href="${esc(social.url)}"
                                aria-label="${esc(social.name)}"
                                title="${esc(social.name)}"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <i class="fa-brands ${esc(social.icon)}" aria-hidden="true"></i>
                            </a>`).join('')}
                    </div>
                </div>

                <div class="contact-map">
                    <iframe
                        src="${esc(campusMapEmbedUrl)}"
                        width="100%"
                        height="400"
                        style="border: 0; border-radius: 12px;"
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title="Ubicación UNI-RUPAP en tiempo real"
                    ></iframe>
                    <div class="map-actions">
                        <a href="${esc(campusMapsUrl)}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary btn-sm">
                            <i class="fa-solid fa-map-location-dot"></i> Abrir en Google Maps
                        </a>
                        <a href="${esc(campusDirectionsUrl)}" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-sm">
                            <i class="fa-solid fa-directions"></i> Cómo llegar
                        </a>
                    </div>
                </div>
            </div>
        </section>
    `
}

export function createContactoState() {
    state.status = ''
    state.error = false
    state.submitting = false
}

export async function submitContacto() {
    const form = document.getElementById('contact-form')
    if (!form) return

    state.status = ''
    state.error = false

    const formData = {
        nombre: form.querySelector('#contact-nombre').value,
        correo: form.querySelector('#contact-correo').value,
        telefono: form.querySelector('#contact-telefono').value,
        mensaje: form.querySelector('#contact-mensaje').value
    }

    if (!formData.nombre.trim() || !formData.correo.trim() || !formData.mensaje.trim()) {
        state.error = true
        state.status = 'Por favor completa los campos obligatorios (nombre, correo y mensaje).'
        return
    }

    state.submitting = true
    try {
        const contactosRef = ref(db, 'Carreras/IngenieriaAgricola/contactos')
        await push(contactosRef, {
            nombre: formData.nombre.trim(),
            correo: formData.correo.trim(),
            telefono: formData.telefono.trim(),
            mensaje: formData.mensaje.trim(),
            fecha: Date.now()
        })
        state.status = '¡Mensaje enviado con éxito! Nos pondremos en contacto contigo pronto.'
        form.reset()
    } catch (err) {
        console.error('Error al guardar contacto:', err)
        state.error = true
        state.status = 'No se pudo enviar el mensaje. Inténtalo de nuevo.'
    } finally {
        state.submitting = false
    }
}

export default Contacto
