import { campusLocation } from '../../data/campusLocation.js'
import { officialSocialLinks } from '../../data/socialLinks.js'
import { esc } from '../../utils/dom.js'

const CONNECTION_LABELS = {
    loading: 'Conectando con Firebase…',
    connected: 'Datos actualizados en tiempo real',
    warning: 'Mostrando contenido de demostración'
}

export function renderFooter(connectionState = 'loading') {
    const connectionLabel = CONNECTION_LABELS[connectionState] || CONNECTION_LABELS.warning
    const socialLinks = officialSocialLinks.map((social) => `
        <a
            href="${esc(social.url)}"
            aria-label="${esc(social.name)}"
            title="${esc(social.name)}"
            target="_blank"
            rel="noopener noreferrer"
        >${social.name === 'TikTok' ? `
            <svg viewBox="0 0 24 24" class="social-tiktok-icon" aria-hidden="true" focusable="false">
                <path d="M19.6 7.2a6.7 6.7 0 0 1-4.1-1.4v8.1a5.4 5.4 0 1 1-5.4-5.4c.4 0 .8 0 1.2.1v3a2.5 2.5 0 1 0 1.7 2.4V2.5h2.9a6.7 6.7 0 0 0 3.7 4.1v.6Z" />
            </svg>` : `
            <i class="fa-brands ${esc(social.icon)}" aria-hidden="true"></i>`}
        </a>`).join('\n')

    return `
        <footer>
            <div class="container footer-content">
                <div class="footer-grid">
                    <div class="footer-col">
                        <h3><i class="fa-solid fa-seedling"></i> Ingeniería Agrícola</h3>
                        <p>Diseñando el futuro del agro con ingeniería, tecnología y sostenibilidad.</p>
                        <p class="footer-address">
                            <i class="fa-solid fa-location-dot"></i> ${esc(campusLocation.name)}
                        </p>
                    </div>
                    <div class="footer-col">
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
                    <div class="footer-col">
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
                    <div class="footer-col">
                        <h4>Síguenos</h4>
                        <p class="social-description">Síguenos en nuestras redes sociales oficiales</p>
                        <div class="social-links">
                            ${socialLinks}
                        </div>
                    </div>
                </div>
                <div class="footer-bottom">
                    <p>&copy; ${new Date().getFullYear()} Ingeniería Agrícola. Todos los derechos reservados.</p>
                    <p role="status" aria-live="polite">${esc(connectionLabel)}</p>
                </div>
            </div>
        </footer>
    `
}

export default renderFooter
