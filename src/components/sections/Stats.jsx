import { useState, useEffect, useRef } from 'react'

// Configuración de estadísticas (editable)
const STATS_CONFIG = [
    { target: 95, suffix: '%', label: 'Empleabilidad en 6 meses', description: 'De nuestros egresados consiguen empleo en el sector agropecuario' },
    { target: 1200, suffix: '+', label: 'Egresados activos', description: 'Profesionales formados en Ingeniería Agrícola' },
    { target: 35, suffix: '', label: 'Asignaturas del plan', description: 'Materias que integran la formación técnica' },
    { target: 15, suffix: '+', label: 'Laboratorios activos', description: 'Espacios equipados para prácticas e investigación' }
]

function Stats() {
    const [animated, setAnimated] = useState(false)
    const sectionRef = useRef(null)

    useEffect(() => {
        if (!('IntersectionObserver' in window)) {
            setAnimated(true)
            return
        }
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    setAnimated(true)
                    observer.disconnect()
                }
            },
            { threshold: 0.3 }
        )
        if (sectionRef.current) observer.observe(sectionRef.current)
        return () => observer.disconnect()
    }, [])

    return (
        <section id="stats" className="stats-section" ref={sectionRef}>
            <div className="container">
                <div className="stats-grid">
                    {STATS_CONFIG.map((stat, i) => (
                        <div className="stat-card" key={i}>
                            <div className="stat-num">
                                {animated ? (
                                    <Counter target={stat.target} suffix={stat.suffix} />
                                ) : (
                                    `0${stat.suffix}`
                                )}
                            </div>
                            <div className="stat-label">{stat.label}</div>
                            <div className="stat-description">{stat.description}</div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

function Counter({ target, suffix }) {
    const [value, setValue] = useState(0)

    useEffect(() => {
        const duration = 1800
        const startTime = performance.now()
        let rafId

        const step = (now) => {
            const progress = Math.min((now - startTime) / duration, 1)
            const eased = 1 - Math.pow(1 - progress, 3)
            setValue(Math.floor(eased * target))
            if (progress < 1) rafId = requestAnimationFrame(step)
        }
        rafId = requestAnimationFrame(step)
        return () => cancelAnimationFrame(rafId)
    }, [target])

    return <>{value.toLocaleString()}{suffix}</>
}

export default Stats