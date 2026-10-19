import { useState, useEffect, useRef } from 'react'
import InscripcionModal from '../modals/InscripcionModal'

function Hero({ slogan, descripcion, slides = [] }) {
    const slideItems = Array.isArray(slides) ? slides : Object.values(slides || {})
    const hasSlides = slideItems.length > 0
    const [currentIndex, setCurrentIndex] = useState(0)
    const [fade, setFade] = useState(false)
    const [showInscripcion, setShowInscripcion] = useState(false)
    const intervalRef = useRef(null)

    useEffect(() => {
        if (slideItems.length < 2 || window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
            return undefined
        }

        let pointerInside = false
        let focusInside = false

        const startAuto = () => {
            if (pointerInside || focusInside || document.hidden || intervalRef.current) return
            intervalRef.current = setInterval(() => {
                setCurrentIndex((prev) => (prev + 1) % slideItems.length)
            }, 5000)
        }
        const stopAuto = () => {
            clearInterval(intervalRef.current)
            intervalRef.current = null
        }
        const handlePointerEnter = () => {
            pointerInside = true
            stopAuto()
        }
        const handlePointerLeave = () => {
            pointerInside = false
            startAuto()
        }
        const handleFocusIn = () => {
            focusInside = true
            stopAuto()
        }
        const handleFocusOut = (event) => {
            if (event.relatedTarget && event.currentTarget.contains(event.relatedTarget)) return
            focusInside = false
            startAuto()
        }
        const handleVisibilityChange = () => {
            if (document.hidden) stopAuto()
            else startAuto()
        }

        const heroSection = document.getElementById('inicio')
        if (heroSection) {
            heroSection.addEventListener('pointerenter', handlePointerEnter)
            heroSection.addEventListener('pointerleave', handlePointerLeave)
            heroSection.addEventListener('focusin', handleFocusIn)
            heroSection.addEventListener('focusout', handleFocusOut)
        }
        document.addEventListener('visibilitychange', handleVisibilityChange)
        startAuto()
        return () => {
            stopAuto()
            if (heroSection) {
                heroSection.removeEventListener('pointerenter', handlePointerEnter)
                heroSection.removeEventListener('pointerleave', handlePointerLeave)
                heroSection.removeEventListener('focusin', handleFocusIn)
                heroSection.removeEventListener('focusout', handleFocusOut)
            }
            document.removeEventListener('visibilitychange', handleVisibilityChange)
        }
    }, [slideItems.length])

    useEffect(() => {
        setCurrentIndex((index) => Math.min(index, Math.max(0, slideItems.length - 1)))
    }, [slideItems.length])

    useEffect(() => {
        if (!hasSlides) return
        setFade(true)
        const timer = setTimeout(() => setFade(false), 400)
        return () => clearTimeout(timer)
    }, [currentIndex, hasSlides])

    const prev = () => {
        if (!slideItems.length) return
        setCurrentIndex((p) => (p - 1 + slideItems.length) % slideItems.length)
    }
    const next = () => {
        if (!slideItems.length) return
        setCurrentIndex((p) => (p + 1) % slideItems.length)
    }

    const currentSlide = hasSlides ? slideItems[currentIndex] || {} : {}

    return (
        <section id="inicio" className="hero" aria-label="Carrusel principal">
            <div
                className="hero-carousel"
                style={{ transform: hasSlides ? `translateX(-${currentIndex * 100}%)` : 'none' }}
            >
                {hasSlides && slideItems.map((slide, i) => (
                    <div
                        key={i}
                        className="hero-slide"
                        aria-hidden="true"
                        style={{ backgroundImage: slide.imagen ? `url("${slide.imagen}")` : 'linear-gradient(135deg, rgba(15, 23, 42, 0.75), rgba(4, 120, 87, 0.55))' }}
                    />
                ))}
            </div>
            <div className="hero-overlay"></div>

            <button
                className="hero-btn hero-prev"
                onClick={prev}
                disabled={!hasSlides}
                aria-label="Diapositiva anterior"
            >
                &#10094;
            </button>
            <button
                className="hero-btn hero-next"
                onClick={next}
                disabled={!hasSlides}
                aria-label="Siguiente diapositiva"
            >
                &#10095;
            </button>

            {hasSlides && (
                <div className="hero-dots" role="group" aria-label="Seleccionar diapositiva">
                    {slideItems.map((_, i) => (
                        <button
                            key={i}
                            className={`hero-dot ${i === currentIndex ? 'active' : ''}`}
                            onClick={() => setCurrentIndex(i)}
                            aria-label={`Diapositiva ${i + 1}`}
                            aria-current={i === currentIndex ? 'true' : undefined}
                        />
                    ))}
                </div>
            )}

            <div className={`hero-content ${fade ? 'fade-out' : ''}`}>
                <span className="badge">Carrera Universitaria de Vanguardia</span>
                <h1>{currentSlide.titulo || slogan || 'Ingeniería Agrícola'}</h1>
                <p>{currentSlide.descripcion || descripcion || 'Diseña soluciones sostenibles para el campo combinando ingeniería, tecnología y ciencias agrícolas.'}</p>
                <div className="hero-buttons">
                    <a href="#plan-estudios" className="btn btn-primary">
                        Ver Plan de Estudios <i className="fa-solid fa-arrow-down"></i>
                    </a>
                    <button className="btn btn-secondary" onClick={() => setShowInscripcion(true)}>
                        Contacto <i className="fa-solid fa-envelope"></i>
                    </button>
                </div>
            </div>

            {showInscripcion && <InscripcionModal onClose={() => setShowInscripcion(false)} />}
        </section>
    )
}

export default Hero