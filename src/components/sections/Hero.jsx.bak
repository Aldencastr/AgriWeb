import React, { useState, useEffect, useRef, useCallback } from 'react'

export default function Hero({ slogan, descripcion, slides = [], onInscripcionOpen }) {
  const [index, setIndex] = useState(0)
  const [fade, setFade] = useState(false)
  const timerRef = useRef(null)
  const heroSectionRef = useRef(null)

  const slideItems = Array.isArray(slides) ? slides : Object.values(slides || {})
  const hasSlides = slideItems.length > 0
  const currentSlide = hasSlides ? slideItems[index] || {} : {}

  const go = useCallback((newIndex) => {
    const len = slideItems.length
    if (!len) return
    setFade(true)
    setTimeout(() => {
      setIndex(((newIndex % len) + len) % len)
      setFade(false)
    }, 300)
  }, [slideItems.length])

  const goPrev = useCallback(() => go(index - 1), [go, index])
  const goNext = useCallback(() => go(index + 1), [go, index])

  // Auto-play effect
  useEffect(() => {
    if (!hasSlides || slideItems.length < 2) return

    const stopAuto = () => {
      if (timerRef.current) {
        clearInterval(timerRef.current)
        timerRef.current = null
      }
    }

    const startAuto = () => {
      if (timerRef.current) return
      timerRef.current = setInterval(() => {
        if (document.hidden) return
        go(index + 1)
      }, 5000)
    }

    const onVisibility = () => {
      if (document.hidden) stopAuto()
      else startAuto()
    }

    const onPointerEnter = () => stopAuto()
    const onPointerLeave = () => startAuto()

    if (heroSectionRef.current) {
      heroSectionRef.current.addEventListener('pointerenter', onPointerEnter)
      heroSectionRef.current.addEventListener('pointerleave', onPointerLeave)
    }
    document.addEventListener('visibilitychange', onVisibility)

    if (!window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) startAuto()

    return () => {
      stopAuto()
      document.removeEventListener('visibilitychange', onVisibility)
      if (heroSectionRef.current) {
        heroSectionRef.current.removeEventListener('pointerenter', onPointerEnter)
        heroSectionRef.current.removeEventListener('pointerleave', onPointerLeave)
      }
    }
  }, [hasSlides, slideItems.length, go, index])

  const getSlideStyle = (slide) => {
    if (slide.imagen) {
      return { backgroundImage: `url("${slide.imagen}")` }
    }
    return { background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.75), rgba(4, 120, 87, 0.55))' }
  }

  return (
    <section id="inicio" className="hero" ref={heroSectionRef} aria-label="Carrusel principal">
      <div
        className="hero-carousel"
        style={{
          transform: hasSlides ? `translateX(-${index * 100}%)` : 'none',
          transition: 'transform 0.5s ease',
        }}
      >
        {hasSlides && slideItems.map((slide, i) => (
          <div
            key={i}
            className="hero-slide"
            aria-hidden={i !== index}
            style={getSlideStyle(slide)}
          />
        ))}
      </div>
      <div className="hero-overlay" />

      <button
        className="hero-btn hero-prev"
        onClick={goPrev}
        disabled={!hasSlides}
        aria-label="Diapositiva anterior"
      >
        {'\u003C'}
      </button>
      <button
        className="hero-btn hero-next"
        onClick={goNext}
        disabled={!hasSlides}
        aria-label="Siguiente diapositiva"
      >
        {'\u003E'}
      </button>

      {hasSlides && (
        <div className="hero-dots" role="group" aria-label="Seleccionar diapositiva">
          {slideItems.map((_, i) => (
            <button
              key={i}
              className={`hero-dot ${i === index ? 'active' : ''}`}
              onClick={() => go(i)}
              aria-label={`Diapositiva ${i + 1}`}
              aria-current={i === index ? 'true' : undefined}
              type="button"
            />
          ))}
        </div>
      )}

      <div className={`hero-content ${fade ? 'fade-out' : ''}`} style={{ transition: 'opacity 0.3s ease' }}>
        <span className="badge">Carrera Universitaria de Vanguardia</span>
        <h1>{currentSlide.titulo || slogan || 'Ingeniería Agrícola'}</h1>
        <p>{currentSlide.descripcion || descripcion || 'Diseña soluciones sostenibles para el campo combinando ingeniería, tecnología y ciencias agrícolas.'}</p>
        <div className="hero-buttons">
          <a href="#plan-estudios" className="btn btn-primary">
            Ver Plan de Estudios <i className="fa-solid fa-arrow-down" aria-hidden="true" />
          </a>
          <button className="btn btn-secondary" onClick={onInscripcionOpen}>
            Contacto <i className="fa-solid fa-envelope" aria-hidden="true" />
          </button>
        </div>
      </div>
    </section>
  )
}