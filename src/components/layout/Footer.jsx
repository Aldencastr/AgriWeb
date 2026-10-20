import React from 'react'
import { NavLink } from 'react-router-dom'
import { campusLocation } from '../../data/campusLocation'
import { officialSocialLinks } from '../../data/socialLinks'

const CONNECTION_LABELS = {
  loading: 'Conectando con Firebase…',
  connected: 'Datos actualizados en tiempo real',
  warning: 'Mostrando contenido de demostración',
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

export default function Footer({ connectionState = 'loading' }) {
  const connectionLabel = CONNECTION_LABELS[connectionState] || CONNECTION_LABELS.warning

  const quickLinks = [
    { path: '/', label: 'Inicio' },
    { path: '/nosotros', label: 'Nosotros' },
    { path: '/carrera', label: 'Descubre la Carrera' },
    { path: '/plan-estudios', label: 'Plan de Estudios' },
    { path: '/ingenieros', label: 'Ingenieros Especializados' },
    { path: '/testimonios', label: 'Reseñas' },
    { path: '/contacto', label: 'Contacto' },
  ]

  const resources = [
    { path: '/admision', label: 'Proceso de Prematrícula' },
    { path: '/laboratorios', label: 'Laboratorios' },
    { path: '/proyectos', label: 'Proyectos' },
    { path: '/noticias', label: 'Noticias' },
    { path: '/faq', label: 'Preguntas Frecuentes' },
    { path: '/carrusel', label: 'Galería fotográfica' },
    { path: '/perfil-egresado', label: 'Perfil del egresado' },
  ]

  return (
    <footer>
      <div className="container footer-content">
        <div className="footer-grid">
          <div className="footer-col">
            <h3><i className="fa-solid fa-seedling" aria-hidden="true" /> Ingeniería Agrícola</h3>
            <p>Diseñando el futuro del agro con ingeniería, tecnología y sostenibilidad.</p>
            <p className="footer-address">
              <i className="fa-solid fa-location-dot" aria-hidden="true" /> {campusLocation.name}
            </p>
          </div>
          <div className="footer-col">
            <h4>Enlaces rápidos</h4>
            <ul>
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <NavLink to={link.path}>{link.label}</NavLink>
                </li>
              ))}
            </ul>
          </div>
          <div className="footer-col">
            <h4>Recursos</h4>
            <ul>
              {resources.map((link) => (
                <li key={link.path}>
                  <NavLink to={link.path}>{link.label}</NavLink>
                </li>
              ))}
            </ul>
          </div>
          <div className="footer-col">
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
                  {SOCIAL_ICONS[social.icon] || <i className={`fa-brands ${social.icon}`} aria-hidden="true" />}
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Ingeniería Agrícola. Todos los derechos reservados.</p>
          <p role="status" aria-live="polite">{connectionLabel}</p>
        </div>
      </div>
    </footer>
  )
}