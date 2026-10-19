import { useState, useEffect, useRef } from 'react'

const NAV_ITEMS = [
    { href: '#inicio', label: 'Inicio' },
    { href: '#nosotros', label: 'Nosotros' },
    { href: '#carrera', label: 'Descubre la Carrera' },
    { href: '#plan-estudios', label: 'Plan de Estudios' },
    { href: '#testimonios', label: 'Reseñas' },
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

function getInitialDarkMode() {
    if (typeof window === 'undefined') return false

    try {
        const savedPreference = window.localStorage.getItem('darkMode')
        if (savedPreference !== null) return savedPreference === 'true'
    } catch (error) {
        console.warn('No se pudo leer la preferencia de tema guardada:', error)
    }

    return window.matchMedia?.('(prefers-color-scheme: dark)').matches ?? false
}

function Navbar({ nombre, activeView }) {
    const [menuOpen, setMenuOpen] = useState(false)
    const [darkMode, setDarkMode] = useState(getInitialDarkMode)
    const [scrolled, setScrolled] = useState(false)
    const navContainerRef = useRef(null)
    const activeSection = ACTIVE_NAV_BY_VIEW[activeView] || activeView

    useEffect(() => {
        const updateScrollState = () => setScrolled(window.scrollY > 12)
        updateScrollState()
        window.addEventListener('scroll', updateScrollState, { passive: true })
        return () => window.removeEventListener('scroll', updateScrollState)
    }, [])

    useEffect(() => {
        document.documentElement.classList.toggle('dark', darkMode)
        try {
            window.localStorage.setItem('darkMode', String(darkMode))
        } catch (error) {
            console.warn('No se pudo guardar la preferencia de tema:', error)
        }
    }, [darkMode])

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') setMenuOpen(false)
        }
        const handleClickOutside = (e) => {
            if (!navContainerRef.current?.contains(e.target)) setMenuOpen(false)
        }
        document.addEventListener('keydown', handleKeyDown)
        document.addEventListener('click', handleClickOutside)
        return () => {
            document.removeEventListener('keydown', handleKeyDown)
            document.removeEventListener('click', handleClickOutside)
        }
    }, [])

    const toggleMenu = (e) => {
        e.stopPropagation()
        setMenuOpen((open) => !open)
    }

    const closeMenu = () => setMenuOpen(false)

    return (
        <header className={`navbar ${scrolled ? 'navbar-scrolled' : ''}`}>
            <div className="container nav-container" ref={navContainerRef}>
                <a className="logo" href="#inicio" onClick={closeMenu} aria-label={`${nombre || 'Ingeniería Agrícola'} - Inicio`}>
                    <i className="fa-solid fa-seedling"></i>
                    <span>{nombre || 'Ingeniería Agrícola'}</span>
                </a>
                <div className="nav-right">
                    <button
                        className="dark-mode-toggle"
                        onClick={() => setDarkMode((current) => !current)}
                        aria-label={darkMode ? 'Activar modo claro' : 'Activar modo oscuro'}
                        type="button"
                    >
                        <i className={darkMode ? 'fa-solid fa-sun' : 'fa-solid fa-moon'}></i>
                    </button>
                    <button
                        className="nav-toggle"
                        onClick={toggleMenu}
                        aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
                        aria-expanded={menuOpen}
                        aria-controls="primary-navigation"
                        type="button"
                    >
                        <i className={menuOpen ? 'fa-solid fa-xmark' : 'fa-solid fa-bars'}></i>
                    </button>
                </div>
                <nav id="primary-navigation" className={menuOpen ? 'nav-open' : ''} aria-label="Navegación principal">
                    <ul className={`nav-links ${menuOpen ? 'nav-open' : ''}`}>
                        {NAV_ITEMS.map((item) => (
                            <li key={item.href}>
                                <a
                                    href={item.href}
                                    onClick={closeMenu}
                                    className={activeSection === item.href.slice(1) ? 'active' : ''}
                                    aria-current={activeSection === item.href.slice(1) ? 'location' : undefined}
                                >
                                    {item.label}
                                </a>
                            </li>
                        ))}
                        <li>
                            <a
                                href="#contacto"
                                className="btn-cta"
                                onClick={closeMenu}
                                aria-current={activeSection === 'contacto' ? 'page' : undefined}
                            >
                                Contacto
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    )
}

export default Navbar