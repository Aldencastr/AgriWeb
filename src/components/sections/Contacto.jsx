import { useState } from 'react'
import { push, ref, db } from '../../services/firebase'
import {
    campusDirectionsUrl,
    campusLocation,
    campusMapEmbedUrl,
    campusMapsUrl
} from '../../data/campusLocation'
import { officialSocialLinks } from '../../data/socialLinks'

function Contacto({ contacto = {} }) {
    const [formData, setFormData] = useState({ nombre: '', correo: '', telefono: '', mensaje: '' })
    const [status, setStatus] = useState('')
    const [error, setError] = useState(false)
    const [submitting, setSubmitting] = useState(false)
    const email = contacto.correo || 'evenorcast@gmail.com'
    const phone = contacto.telefono || '86855972'
    const phoneLink = phone.replace(/[^\d+]/g, '')

    const handleSubmit = async (e) => {
        e.preventDefault()
        setStatus('')
        setError(false)

        if (!formData.nombre.trim() || !formData.correo.trim() || !formData.mensaje.trim()) {
            setError(true)
            setStatus('Por favor completa los campos obligatorios (nombre, correo y mensaje).')
            return
        }

        setSubmitting(true)
        try {
            const contactosRef = ref(db, 'Carreras/IngenieriaAgricola/contactos')
            await push(contactosRef, {
                nombre: formData.nombre.trim(),
                correo: formData.correo.trim(),
                telefono: formData.telefono.trim(),
                mensaje: formData.mensaje.trim(),
                fecha: Date.now()
            })
            setStatus('¡Mensaje enviado con éxito! Nos pondremos en contacto contigo pronto.')
            setFormData({ nombre: '', correo: '', telefono: '', mensaje: '' })
        } catch (err) {
            console.error('Error al guardar contacto:', err)
            setError(true)
            setStatus('No se pudo enviar el mensaje. Inténtalo de nuevo.')
        } finally {
            setSubmitting(false)
        }
    }

    return (
        <section id="contacto" className="container section contact-section">
            <div className="contact-card">
                <h2>¿Listo para transformar el futuro del agro?</h2>
                <p>Comunícate con nuestra facultad o acércate a nuestras instalaciones.</p>

                <div className="contact-details">
                    <p><i className="fa-solid fa-building-columns"></i> {contacto.facultad || 'Universidad Nacional de Ingeniería (UNI)'}</p>
                    <p><i className="fa-solid fa-map-marker-alt"></i> {campusLocation.name}</p>
                    <p><i className="fa-solid fa-globe"></i> Coordenadas: {campusLocation.coordinatesLabel}</p>
                    <p><i className="fa-solid fa-university"></i> {contacto.instituciones || 'UNICAM · FAE-Masaya'}</p>
                    <p><i className="fa-solid fa-envelope"></i> <a href={`mailto:${email}`}>{email}</a></p>
                    <p><i className="fa-solid fa-phone"></i> <a href={`tel:${phoneLink}`}>{phone}</a></p>
                </div>

                <div className="contact-form-wrapper">
                    <h3>Envíanos un mensaje</h3>
                    {status && (
                        <div className={error ? 'form-error' : 'form-success'} role={error ? 'alert' : 'status'}>
                            {status}
                        </div>
                    )}
                    <form className="contact-form" onSubmit={handleSubmit} aria-busy={submitting}>
                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="contact-nombre">Nombre *</label>
                                <input
                                    type="text"
                                    id="contact-nombre"
                                    autoComplete="name"
                                    value={formData.nombre}
                                    onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                                    placeholder="Tu nombre"
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="contact-correo">Correo *</label>
                                <input
                                    type="email"
                                    id="contact-correo"
                                    autoComplete="email"
                                    value={formData.correo}
                                    onChange={(e) => setFormData({ ...formData, correo: e.target.value })}
                                    placeholder="tu@correo.com"
                                    required
                                />
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="contact-telefono">Teléfono</label>
                            <input
                                type="tel"
                                id="contact-telefono"
                                autoComplete="tel"
                                value={formData.telefono}
                                onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                                placeholder="86855972"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="contact-mensaje">Mensaje *</label>
                            <textarea
                                id="contact-mensaje"
                                value={formData.mensaje}
                                onChange={(e) => setFormData({ ...formData, mensaje: e.target.value })}
                                placeholder="Escribe tu mensaje aquí..."
                                rows={4}
                                required
                            />
                        </div>
                        <button type="submit" className="btn btn-primary" disabled={submitting}>
                            {submitting ? 'Enviando...' : 'Enviar mensaje'}
                            <i className="fa-solid fa-paper-plane"></i>
                        </button>
                    </form>
                </div>

                <div className="contact-social">
                    <h4>Síguenos</h4>
                    <p className="social-description">Síguenos en nuestras redes sociales oficiales</p>
                    <div className="social-links">
                        {officialSocialLinks.map((social) => (
                            <a
                                key={social.name}
                                href={social.url}
                                aria-label={social.name}
                                title={social.name}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <i className={`fa-brands ${social.icon}`} aria-hidden="true"></i>
                            </a>
                        ))}
                    </div>
                </div>

                <div className="contact-map">
                    <iframe
                        src={campusMapEmbedUrl}
                        width="100%"
                        height="400"
                        style={{ border: 0, borderRadius: '12px' }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title="Ubicación UNI-RUPAP en tiempo real"
                    ></iframe>
                    <div className="map-actions">
                        <a
                            href={campusMapsUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-secondary btn-sm"
                        >
                            <i className="fa-solid fa-map-location-dot"></i> Abrir en Google Maps
                        </a>
                        <a
                            href={campusDirectionsUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-primary btn-sm"
                        >
                            <i className="fa-solid fa-directions"></i> Cómo llegar
                        </a>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Contacto