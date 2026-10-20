import React from 'react'
import { NavLink } from 'react-router-dom'

const NAV_ITEMS = [
  { path: '/', label: 'Inicio' },
  { path: '/nosotros', label: 'Nosotros' },
  { path: '/carrera', label: 'Descubre la Carrera' },
  { path: '/plan-estudios', label: 'Plan de Estudios' },
  { path: '/ingenieros', label: 'Ingenieros' },
  { path: '/testimonios', label: 'Reseñas' },
]

const ACTIVE_NAV_BY_VIEW = {
  carrusel: 'nosotros',
  'perfil-egresado': 'nosotros',
  laboratorios: 'carrera',
  proyectos: 'carrera',
  noticias: 'carrera',
  admision: 'contacto',
  faq: 'contacto',
}

export default function Navbar({ 
  nombre, 
  activeView, 
  menuOpen, 
  darkMode, 
  onToggleMenu, 
  onCloseMenu, 
  onToggleDarkMode 
}) {
  const activeSection = ACTIVE_NAV_BY_VIEW[activeView] || activeView
  const iconClass = menuOpen ? 'fa-solid fa-xmark' : 'fa-solid fa-bars'
  const sunMoon = darkMode ? 'fa-solid fa-sun' : 'fa-solid fa-moon'

  return (
    <header className="navbar" data-navbar>
      <div className="container nav-container" data-nav-container>
        <NavLink 
          className="logo" 
          to="/" 
          onClick={onCloseMenu}
          aria-label={`${nombre || 'Ingeniería Agrícola'} - Inicio`}
        >
          <i className="fa-solid fa-seedling" aria-hidden="true" />
          <span>{nombre || 'Ingeniería Agrícola'}</span>
        </NavLink>
        <div className="nav-right">
          <button 
            className="dark-mode-toggle" 
            onClick={onToggleDarkMode}
            aria-label={darkMode ? 'Activar modo claro' : 'Activar modo oscuro'}
            type="button"
          >
            <i className={sunMoon} aria-hidden="true" />
          </button>
          <button
            className="nav-toggle"
            onClick={onToggleMenu}
            aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={menuOpen}
            aria-controls="primary-navigation"
            type="button"
          >
            <i className={iconClass} aria-hidden="true" />
          </button>
        </div>
        <nav id="primary-navigation" className={menuOpen ? 'nav-open' : ''} aria-label="Navegación principal">
          <ul className={`nav-links ${menuOpen ? 'nav-open' : ''}`}>
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.path.slice(1) || (item.path === '/' && activeSection === 'inicio')
              return (
                <li key={item.path}>
                  <NavLink 
                    to={item.path} 
                    onClick={onCloseMenu}
                    className={({ isActive }) => isActive ? 'active' : ''}
                    aria-current={isActive ? 'location' : undefined}
                  >
                    {item.label}
                  </NavLink>
                </li>
              )
            })}
            <li>
              <NavLink 
                to="/contacto" 
                onClick={onCloseMenu}
                className={({ isActive }) => `btn-cta ${isActive ? 'active' : ''}`}
                aria-current={activeSection === 'contacto' ? 'page' : undefined}
              >
                Contacto
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}