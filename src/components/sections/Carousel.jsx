import { useState, useEffect, useRef } from 'react'

function Carousel({ items = [], titulo = 'Destacados', descripcion = 'Descubre los proyectos, laboratorios y logros de Ingeniería Agrícola.' }) {
    const values = Array.isArray(items) ? items : Object.values(items || {})
    const [currentIndex, setCurrentIndex] = useState(0)
    const trackRef = useRef(null)

    useEffect(() => {
        setCurrentIndex((index) => Math.min(index, Math.max(0, values.length - 1)))
    }, [values.length])

    useEffect(() => {
        if (trackRef.current) {
            const slideWidth = trackRef.current.querySelector('.carousel-slide')?.getBoundingClientRect().width || 0
            trackRef.current.style.transform = `translateX(-${currentIndex * slideWidth}px)`
        }
    }, [currentIndex])

    useEffect(() => {
        const handleResize = () => {
            if (trackRef.current) {
                const slideWidth = trackRef.current.querySelector('.carousel-slide')?.getBoundingClientRect().width || 0
                trackRef.current.style.transform = `translateX(-${currentIndex * slideWidth}px)`
            }
        }
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [currentIndex])

    const goTo = (index) => {
        setCurrentIndex(Math.max(0, Math.min(index, values.length - 1)))
    }

    const prev = () => {
        if (!values.length) return
        setCurrentIndex((prev) => (prev - 1 + values.length) % values.length)
    }

    const next = () => {
        if (!values.length) return
        setCurrentIndex((prev) => (prev + 1) % values.length)
    }

    if (values.length === 0) return null

    return (
        <section id="carrusel" className="section bg-light">
            <div className="container">
                <div className="section-title reveal">
                    <h2>{titulo}</h2>
                    <p>{descripcion}</p>
                </div>
                <div className="carousel" aria-label="Carrusel de destacados">
                    <button className="carousel-btn carousel-prev" onClick={prev} aria-label="Diapositiva anterior">&#10094;</button>
                    <div className="carousel-track-wrapper" style={{ overflow: 'hidden' }}>
                        <div className="carousel-track" ref={trackRef}>
                            {values.map((item, i) => (
                                <div className="carousel-slide" key={i}>
                                    <img
                                        src={item.imagen}
                                        alt={item.titulo || ''}
                                        loading="lazy"
                                    />
                                    <div className="carousel-slide-content">
                                        <h3>{item.titulo || 'Destacado'}</h3>
                                        <p>{item.descripcion || ''}</p>
                                        <div className="tags">
                                            {(item.tags || []).map((tag, j) => (
                                                <span className="tag" key={j}>{tag}</span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <button className="carousel-btn carousel-next" onClick={next} aria-label="Siguiente diapositiva">&#10095;</button>
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

export default Carousel