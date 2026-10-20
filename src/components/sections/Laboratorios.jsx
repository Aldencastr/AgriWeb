import React, { useState, useEffect } from 'react'
import { toArray } from '../../utils/dom'

export default function Laboratorios({ items = [] }) {
  const labs = toArray(items)
  const [lightbox, setLightbox] = useState(null)

  const open = (index) => {
    const lab = labs[index]
    if (lab) setLightbox(lab)
  }

  const close = () => setLightbox(null)

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') close()
    }
    if (lightbox) {
      document.addEventListener('keydown', handleKeyDown)
    }
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [lightbox])

  return (
    <>
      <section id="laboratorios" className="section bg-light">
        <div className="container">
          <div className="section-title reveal">
            <h2>Laboratorios y Equipos</h2>
            <p>Áreas de laboratorio relacionadas con la formación y la investigación agrícola.</p>
          </div>
          <div className="lab-grid">
            {labs.map((lab, i) => (
              <div
                key={i}
                className="lab-card reveal"
                onClick={() => open(i)}
                onKeyDown={(e) => e.key === 'Enter' && open(i)}
                role="button"
                tabIndex={0}
                aria-label={`Ver ${lab.nombre}`}
              >
                <img
                  src={lab.imagen}
                  alt={lab.nombre}
                  loading="lazy"
                  width="600"
                  height="400"
                />
                <div className="lab-overlay">
                  <h3>{lab.nombre}</h3>
                  <p>{lab.descripcion}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {lightbox && (
        <div className="lightbox" data-lightbox onClick={close}>
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <button className="lightbox-close" onClick={close} aria-label="Cerrar">
              <i className="fa-solid fa-xmark" aria-hidden="true" />
            </button>
            <img src={lightbox.imagen} alt={lightbox.nombre} />
            <div className="lightbox-caption">
              <h3>{lightbox.nombre}</h3>
              <p>{lightbox.descripcion}</p>
            </div>
          </div>
        </div>
      )}
    </>
  )
}