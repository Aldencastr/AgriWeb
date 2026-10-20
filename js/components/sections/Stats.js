import { esc } from '../../utils/dom.js'

// Configuración de estadísticas (editable)
const STATS_CONFIG = [
    { target: 95, suffix: '%', label: 'Empleabilidad en 6 meses', description: 'De nuestros egresados consiguen empleo en el sector agropecuario' },
    { target: 1200, suffix: '+', label: 'Egresados activos', description: 'Profesionales formados en Ingeniería Agrícola' },
    { target: 35, suffix: '', label: 'Asignaturas del plan', description: 'Materias que integran la formación técnica' },
    { target: 15, suffix: '+', label: 'Laboratorios activos', description: 'Espacios equipados para prácticas e investigación' }
]

function renderStats() {
    return `
        <section id="stats" class="stats-section" data-stats>
            <div class="container">
                <div class="stats-grid">
                    ${STATS_CONFIG.map((stat) => `
                        <div class="stat-card">
                            <div class="stat-num">0${esc(stat.suffix)}</div>
                            <div class="stat-label">${esc(stat.label)}</div>
                            <div class="stat-description">${esc(stat.description)}</div>
                        </div>`).join('')}
                </div>
            </div>
        </section>
    `
}

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

/** Animación del contador al entrar el viewport. */
export function initStats(root) {
    const section = root.querySelector('[data-stats]')
    if (!section) return () => {}

    const nums = section.querySelectorAll('.stat-num')

    const run = () => STATS_CONFIG.forEach((stat, i) => animateCounter(nums[i], stat))

    if (!('IntersectionObserver' in window)) {
        run()
        return () => {}
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
}

export default renderStats
