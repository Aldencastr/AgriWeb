import React from 'react'
import { toArray } from '../../utils/dom'

export default function Ingenieros({ items = [] }) {
  const values = toArray(items).filter((item) => item && typeof item === 'object')

  return (
    <section id="ingenieros" className="section">
      <div className="container">
        <div className="section-title reveal">
          <h2>Ingenieros Especializados</h2>
          <p>Conoce a los especialistas que respaldan la formación e investigación de la carrera.</p>
        </div>
        <div className="ingenieros-grid">
          {values.length === 0 ? (
            <div className="card-loading">Próximamente conocerás a los especialistas de la carrera.</div>
          ) : (
            values.map((ing, i) => (
              <article key={i} className="ingeniero-card reveal">
                <div className="ingeniero-photo">
                  <img
                    src={ing.imagen || '/images/logo.jpeg'}
                    alt={`Foto de ${ing.nombre || 'ingeniero especializado'}`}
                    loading="lazy"
                    width="600"
                    height="400"
                  />
                </div>
                <div className="ingeniero-info">
                  <h3>{ing.nombre || 'Ingeniero especializado'}</h3>
                  {ing.rol && <span className="ingeniero-rol">{ing.rol}</span>}
                  <p>{ing.biografia || ''}</p>
                </div>
              </article>
            ))
          )}
        </div>
      </div>
    </section>
  )
}