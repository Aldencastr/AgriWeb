import { campusLocation } from '../../data/campusLocation'
import { officialSocialLinks } from '../../data/socialLinks'

const CONNECTION_LABELS = {
    loading: 'Conectando con Firebase…',
    connected: 'Datos actualizados en tiempo real',
    warning: 'Mostrando contenido de demostración'
}

function Footer({ connectionState = 'loading' }) {
    const connectionLabel = CONNECTION_LABELS[connectionState] || CONNECTION_LABELS.warning

    return (
        <footer>
            <div className="container footer-content">
                <div className="footer-grid">
                    <div className="footer-col">
                        <h3><i className="fa-solid fa-seedling"></i> Ingeniería Agrícola</h3>
                        <p>Diseñando el futuro del agro con ingeniería, tecnología y sostenibilidad.</p>
                        <p className="footer-address">
                            <i className="fa-solid fa-location-dot"></i> {campusLocation.name}
                        </p>
                    </div>
                    <div className="footer-col">
                        <h4>Enlaces rápidos</h4>
                        <ul>
                            <li><a href="#inicio">Inicio</a></li>
                            <li><a href="#nosotros">Nosotros</a></li>
                            <li><a href="#carrera">Descubre la Carrera</a></li>
                            <li><a href="#plan-estudios">Plan de Estudios</a></li>
                            <li><a href="#testimonios">Reseñas</a></li>
                            <li><a href="#contacto">Contacto</a></li>
                        </ul>
                    </div>
                    <div className="footer-col">
                        <h4>Recursos</h4>
                        <ul>
                            <li><a href="#admision">Proceso de Prematrícula</a></li>
                            <li><a href="#laboratorios">Laboratorios</a></li>
                            <li><a href="#proyectos">Proyectos</a></li>
                            <li><a href="#noticias">Noticias</a></li>
                            <li><a href="#faq">Preguntas Frecuentes</a></li>
                            <li><a href="#carrusel">Galería fotográfica</a></li>
                            <li><a href="#perfil-egresado">Perfil del egresado</a></li>
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
                                    {social.name === 'TikTok' ? (
                                        <svg
                                            viewBox="0 0 24 24"
                                            className="social-tiktok-icon"
                                            aria-hidden="true"
                                            focusable="false"
                                        >
                                            <path d="M19.6 7.2a6.7 6.7 0 0 1-4.1-1.4v8.1a5.4 5.4 0 1 1-5.4-5.4c.4 0 .8 0 1.2.1v3a2.5 2.5 0 1 0 1.7 2.4V2.5h2.9a6.7 6.7 0 0 0 3.7 4.1v.6Z" />
                                        </svg>
                                    ) : (
                                        <i className={`fa-brands ${social.icon}`} aria-hidden="true"></i>
                                    )}
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

export default Footer