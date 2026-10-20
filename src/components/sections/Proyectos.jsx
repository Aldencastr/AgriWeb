import React from 'react'
import { toValues } from '../../utils/dom'

export default function Proyectos({ items = [] }) {
  const projects = toValues(items).filter((project) => project && typeof project === 'object')

  return (
    <section id="proyectos" className="section">
      <div className="container">
        <div className="section-title reveal">
          <h2>Proyectos y Prácticas de Campo</h2>
          <p>Ejemplos de proyectos y prácticas académicas de Ingeniería Agrícola.</p>
        </div>
        <div className="proyectos-grid">
          {projects.map((p, i) => (
            <article key={i} className="proyecto-card reveal">
              <img
                src={p.imagen}
                alt={p.titulo}
                loading="lazy"
                width="600"
                height="400"
              />
              <div className="proyecto-content">
                <h3>{p.titulo}</h3>
                <p>{p.descripcion}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}