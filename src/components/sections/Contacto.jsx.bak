import React, { useState, useRef, useEffect } from 'react'
import { campusDirectionsUrl, campusLocation, campusMapEmbedUrl, campusMapsUrl } from '../../data/campusLocation'
import { officialSocialLinks } from '../../data/socialLinks'

const FORMSPREE_ENDPOINT = 'https://formspree.io/f/TU_FORM_ID'

export default function Contacto({ contacto = {} }) {
  const [status, setStatus] = useState('')
  const [error, setError] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const formRef = useRef(null)

  const email = contacto.correo || 'evenorcast@gmail.com'
  const phone = contacto.telefono || '86855972'
  const phoneLink = phone.replace(/[^\d+]/g, '')
  const returnUrl = typeof window !== 'undefined' ? `${window.location.origin}${window.location.pathname}#contacto` : '#contacto'

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('')
    setError(false)

    const formData = new FormData(formRef.current)
    const data = Object.fromEntries(formData.entries())

    if (!data.name?.trim() || !data.email?.trim() || !data.message?.trim()) {
      setError(true)
      setStatus('Por favor completa los campos obligatorios (nombre, correo y mensaje).')
      return
    }

    setSubmitting(true)
    try {
      // Enviar a Formspree (llega a evenorcast@gmail.com)
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(data),
      })

      if (!response.ok) throw new Error('Error en Formspree')

      // Backup en Firebase (opcional)
      // try {
      //   const contactosRef = ref(db, 'Carreras/IngenieriaAgricola/contactos')
      //   await push(contactosRef, { ...data, fecha: Date.now() })
      // } catch (fbErr) {
      //   console.warn('Firebase backup falló (no crítico):', fbErr)
      // }

      setStatus('¡Mensaje enviado con éxito a evenorcast@gmail.com! Te responderemos pronto.')
      setError(false)
      formRef.current.reset()
    } catch (err) {
      console.error('Error al enviar:', err)
      setError(true)
      setStatus('No se pudo enviar el mensaje. Inténtalo de nuevo o escríbenos directamente a evenorcast@gmail.com')
    } finally {
      setSubmitting(false)
    }
  }

  const TikTokIcon = () => (
    <svg viewBox="0 0 24 24" className="social-tiktok-icon" aria-hidden="true" focusable="false">
      <path d="M19.6 7.2a6.7 6.7 0 0 1-4.1-1.4v8.1a5.4 5.4 0 1 1-5.4-5.4c.4 0 .8 0 1.2.1v3a2.5 2.5 0 1 0 1.7 2.4V2.5h2.9a6.7 6.7 0 0 0 3.7 4.1v.6Z" />
    </svg>
  )

  const SOCIAL_ICONS = {
    'fa-facebook-f': <i className="fa-brands fa-facebook-f" aria-hidden="true" />,
    'fa-instagram': <i className="fa-brands fa-instagram" aria-hidden="true" />,
    'fa-tiktok': <TikTokIcon />,
  }

  return (
    <section id="contacto" className="container section contact-section">
      <div className="contact-card">
        <h2>¿Listo para transformar el futuro del agro?</h2>
        <p>Comunícate con nuestra facultad o acércate a nuestras instalaciones.</p>

        <div className="contact-details">
          <p><i className="fa-solid fa-building-columns" aria-hidden="true" /> {contacto.facultad || 'Universidad Nacional de Ingeniería (UNI)'}</p>
          <p><i className="fa-solid fa-map-marker-alt" aria-hidden="true" /> {campusLocation.name}</p>
          <p><i className="fa-solid fa-globe" aria-hidden="true" /> Coordenadas: {campusLocation.coordinatesLabel}</p>
          <p><i className="fa-solid fa-university" aria-hidden="true" /> {contacto.instituciones || 'UNICAM · FAE-Masaya'}</p>
          <p><i className="fa-solid fa-envelope" aria-hidden="true" /> <a href={`mailto:${email}`}>{email}</a></p>
          <p><i className="fa-solid fa-phone" aria-hidden="true" /> <a href={`tel:${phoneLink}`}>{phone}</a></p>
        </div>

        <div className="contact-form-wrapper">
          <h3>Envíanos un mensaje</h3>
          {status && (
            <div className={error ? 'form-error' : 'form-success'} role={error ? 'alert' : 'status'}>
              {status}
            </div>
          )}
          <form className="contact-form" ref={formRef} action={FORMSPREE_ENDPOINT} method="POST" onSubmit={handleSubmit}>
            <input type="hidden" name="_next" value={returnUrl} />
            <input type="hidden" name="_subject" value="Nuevo mensaje desde Ingeniería Agrícola Web" />
            <input type="hidden" name="_replyto" value={email} />
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="contact-nombre">Nombre *</label>
                <input
                  type="text"
                  id="contact-nombre"
                  name="name"
                  autoComplete="name"
                  placeholder="Tu nombre"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="contact-correo">Correo *</label>
                <input
                  type="email"
                  id="contact-correo"
                  name="email"
                  autoComplete="email"
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
                name="phone"
                autoComplete="tel"
                placeholder="86855972"
              />
            </div>
            <div className="form-group">
              <label htmlFor="contact-mensaje">Mensaje *</label>
              <textarea
                id="contact-mensaje"
                name="message"
                placeholder="Escribe tu mensaje aquí..."
                rows={4}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary btn-lg" disabled={submitting}>
              {submitting ? 'Enviando...' : 'Enviar mensaje'}
              <i className="fa-solid fa-paper-plane" aria-hidden="true" />
            </button>
          </form>
          {status && <p className="form-note">Los mensajes llegan directamente a <strong>evenorcast@gmail.com</strong> via Formspree.</p>}
        </div>

        <div className="contact-social">
          <h4>Síguenos</h4>
          <p className="social-description">Síguenos en nuestras redes sociales oficiales</p>
          <div className="social-links social-links-centered">
            {officialSocialLinks.map((social) => (
              <a
                key={social.name}
                href={social.url}
                aria-label={social.name}
                title={social.name}
                target="_blank"
                rel="noopener noreferrer"
              >
                {SOCIAL_ICONS[social.icon] || <i className={`fa-brands ${social.icon}`} aria-hidden="true" />}
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
          />
          <div className="map-actions">
            <a href={campusMapsUrl} target="_blank" rel="noopener noreferrer" className="btn btn-secondary btn-sm">
              <i className="fa-solid fa-map-location-dot" aria-hidden="true" /> Abrir en Google Maps
            </a>
            <a href={campusDirectionsUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-sm">
              <i className="fa-solid fa-directions" aria-hidden="true" /> Cómo llegar
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export function createContactoState() {
  // Handled by React state in component
}

export async function submitContacto() {
  // Handled by React component
}