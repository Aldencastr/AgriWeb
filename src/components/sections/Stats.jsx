import React, { useRef, useEffect, useState } from 'react'

const STATS_CONFIG = [
  { target: 95, suffix: '%', label: 'Empleabilidad en 6 meses', description: 'De nuestros egresados consiguen empleo en el sector agropecuario' },
  { target: 1200, suffix: '+', label: 'Egresados activos', description: 'Profesionales formados en Ingeniería Agrícola' },
  { target: 35, suffix: '', label: 'Asignaturas del plan', description: 'Materias que integran la formación técnica' },
  { target: 15, suffix: '+', label: 'Laboratorios activos', description: 'Espacios equipados para prácticas e investigación' },
]

function animateCounter(numEl, stat) {
  const duration = 1800
  const startTime = performance.now()

  const step = (now) => {
    const progress = Math.min((now - startTime) / duration, 1)
    const eased = 1 - Math.pow(1 - progress, 3)
    numEl.textContent = `${Math.floor(eased * stat.target).toLocaleString()}${stat.suffix}`
    if (progress < 1) requestAnimationFrame(step)
  }
  requestAnimationFrame(step)
}

export default function Stats() {
  const sectionRef = useRef(null)
  const numsRef = useRef([])
  const [animated, setAnimated] = useState(false)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const run = () => {
      STATS_CONFIG.forEach((stat, i) => {
        if (numsRef.current[i]) {
          animateCounter(numsRef.current[i], stat)
        }
      })
    }

    if (!('IntersectionObserver' in window)) {
      run()
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          run()
          observer.disconnect()
        }
      },
      { threshold: 0.3 }
    )
    observer.observe(section)

    return () => observer.disconnect()
  }, [])

  return (
    <section id="stats" className="stats-section" ref={sectionRef} data-stats>
      <div className="container">
        <div className="stats-grid">
          {STATS_CONFIG.map((stat, i) => (
            <div key={i} className="stat-card">
              <div 
                className="stat-num" 
                ref={(el) => { numsRef.current[i] = el }}
              >
                0{stat.suffix}
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