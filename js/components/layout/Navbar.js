import { esc } from '../../utils/dom.js'

const NAV_ITEMS = [
    { href: '#inicio', label: 'Inicio' },
    { href: '#nosotros', label: 'Nosotros' },
    { href: '#carrera', label: 'Descubre la Carrera' },
    { href: '#plan-estudios', label: 'Plan de Estudios' },
    { href: '#testimonios', label: 'Reseñas' }
]

const ACTIVE_NAV_BY_VIEW = {
    carrusel: 'nosotros',
    'perfil-egresado': 'nosotros',
    laboratorios: 'carrera',
    proyectos: 'carrera',
    noticias: 'carrera',
    admision: 'contacto',
    faq: 'contacto'
}

export function renderNavbar({ nombre, activeView, menuOpen, darkMode }) {
    const activeSection = ACTIVE_NAV_BY_VIEW[activeView] || activeView
    const iconClass = menuOpen ? 'fa-solid fa-xmark' : 'fa-solid fa-bars'
    const sunMoon = darkMode ? 'fa-solid fa-sun' : 'fa-solid fa-moon'
    const links = NAV_ITEMS.map((item) => {
        const isActive = activeSection === item.href.slice(1)
        return `<li><a href="${item.href}" data-action="close-menu" class="${isActive ? 'active' : ''}"${isActive ? ' aria-current="location"' : ''}>${esc(item.label)}</a></li>`
    }).join('\n')

    return `
        <header class="navbar" data-navbar>
            <div class="container nav-container" data-nav-container>
                <a class="logo" href="#inicio" data-action="close-menu" aria-label="${esc(nombre || 'Ingeniería Agrícola')} - Inicio">
                    <i class="fa-solid fa-seedling"></i>
                    <span>${esc(nombre || 'Ingeniería Agrícola')}</span>
                </a>
                <div class="nav-right">
                    <button class="dark-mode-toggle" data-action="toggle-dark" aria-label="${darkMode ? 'Activar modo claro' : 'Activar modo oscuro'}" type="button">
                        <i class="${sunMoon}"></i>
                    </button>
                    <button
                        class="nav-toggle"
                        data-action="toggle-menu"
                        aria-label="${menuOpen ? 'Cerrar menú' : 'Abrir menú'}"
                        aria-expanded="${menuOpen}"
                        aria-controls="primary-navigation"
                        type="button"
                    >
                        <i class="${iconClass}"></i>
                    </button>
                </div>
                <nav id="primary-navigation" class="${menuOpen ? 'nav-open' : ''}" aria-label="Navegación principal">
                    <ul class="nav-links ${menuOpen ? 'nav-open' : ''}">
                        ${links}
                        <li>
                            <a href="#contacto" data-action="close-menu" class="btn-cta"${activeSection === 'contacto' ? ' aria-current="page"' : ''}>Contacto</a>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    `
}
export default renderNavbar
