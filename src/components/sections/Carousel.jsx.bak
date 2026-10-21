import React, { useState, useRef, useEffect, useCallback } from 'react'
import { toArray } from '../../utils/dom'

export default function Carousel({ items = [], titulo = 'Destacados', descripcion = 'Descubre los proyectos, laboratorios y logros de Ingeniería Agrícola.' }) {
  const values = toArray(items)
  if (values.length === 0) return null

  const [currentIndex, setCurrentIndex] = useState(0)
  const trackRef = useRef(null)

  const getSlideWidth = useCallback(() => {
    const slide = trackRef.current?.querySelector('.carousel-slide')
    return slide?.getBoundingClientRect().width || 0
  }, [])

  const applyTransform = useCallback(() => {
    if (trackRef.current) {
      trackRef.current.style.transform = `translateX(-${currentIndex * getSlideWidth()}px)`
    }
  }, [currentIndex, getSlideWidth])

  useEffect(() => {
    applyTransform()
    const onResize = () => applyTransform()
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [applyTransform])

  const goTo = (index) => {
    setCurrentIndex(Math.max(0, Math.min(index, values.length - 1)))
  }

  const goPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + values.length) % values.length)
  }

  const goNext = () => {
    setCurrentIndex((prev) => (prev + 1) % values.length)
  }

  return (
    <section id="carrusel" className="section bg-light">
      <div className="container">
        <div className="section-title reveal">
          <h2>{titulo}</h2>
          <p>{descripcion}</p>
        </div>
        <div className="carousel" aria-label="Carrusel de destacados">
          <button className="carousel-btn carousel-prev" onClick={goPrev} aria-label="Diapositiva anterior">
            {'\u003C'}
          </button>
          <div className="carousel-track-wrapper" style={{ overflow: 'hidden' }}>
            <div className="carousel-track" ref={trackRef} data-carousel-track>
              {values.map((item, i) => (
                <div key={i} className="carousel-slide">
                  <img
                    src={item.imagen}
                    alt={item.titulo || ''}
                    loading="lazy"
                  />
                  <div className="carousel-slide-content">
                    <h3>{item.titulo || 'Destacado'}</h3>
                    <p>{item.descripcion || ''}</p>
                    <div className="tags">
                      {(item.tags || []).map((tag, ti) => (
                        <span key={ti} className="tag">{tag}</span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <button className="carousel-btn carousel-next" onClick={goNext} aria-label="Siguiente diapositiva">
            {'\u003E'}
          </button>
          <div className="carousel-dots">
            {values.map((_, i) => (
              <button
                key={i}
                className={`carousel-dot ${i === currentIndex ? 'active' : ''}`}
                onClick={() => goTo(i)}
                aria-label={`Diapositiva ${i + 1}`}
                aria-current={i === currentIndex ? 'true' : undefined}
                type="button"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}