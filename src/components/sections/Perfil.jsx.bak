import React from 'react'

const PROFILE_ICONS = [
  'fa-solid fa-satellite-dish',
  'fa-solid fa-droplet',
  'fa-solid fa-tractor',
  'fa-solid fa-leaf',
  'fa-solid fa-chart-line',
  'fa-solid fa-flask',
]

export default function Perfil({ items = [] }) {
  const values = Array.isArray(items) ? items : Object.values(items || {})

  return (
    <section id="nosotros" className="container section">
      <div className="section-title reveal">
        <h2>Nosotros</h2>
        <p>Conoce más sobre nuestra facultad y por qué elegir Ingeniería Agrícola.</p>
      </div>
      <div className="grid-cards">
        {values.length === 0 ? (
          <div className="card-loading">Próximamente conocerás las ventajas de esta carrera.</div>
        ) : (
          values.map((item, i) => {
            const text = typeof item === 'string' ? item : ''
            const [rawTitle, ...descParts] = text.split(':')
            const title = descParts.length
              ? rawTitle.trim().charAt(0).toUpperCase() + rawTitle.trim().slice(1)
              : 'Una carrera para transformar el agro'
            const description = descParts.length ? descParts.join(':').trim() : text
            const icon = PROFILE_ICONS[i % PROFILE_ICONS.length]

            return (
              <article key={i} className="feature-card reveal">
                <div className="feature-icon">
                  <i className={icon} aria-hidden="true" />
                </div>
                <h3>{title}</h3>
                <p>{description}</p>
              </article>
            )
          })
        )}
      </div>
    </section>
  )
}