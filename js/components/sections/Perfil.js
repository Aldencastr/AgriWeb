import { esc, toValues } from '../../utils/dom.js'

// Iconos por índice para las tarjetas de "Nosotros"
const PROFILE_ICONS = [
    'fa-solid fa-satellite-dish',
    'fa-solid fa-droplet',
    'fa-solid fa-tractor',
    'fa-solid fa-leaf',
    'fa-solid fa-chart-line',
    'fa-solid fa-flask'
]

export function renderPerfil(items = []) {
    const values = toValues(items)

    return `
        <section id="nosotros" class="container section">
            <div class="section-title reveal">
                <h2>Nosotros</h2>
                <p>Conoce más sobre nuestra facultad y por qué elegir Ingeniería Agrícola.</p>
            </div>
            <div class="grid-cards">
                ${values.length === 0 ? '<div class="card-loading">Próximamente conocerás las ventajas de esta carrera.</div>' : ''}
                ${values.map((item, i) => {
                    const text = typeof item === 'string' ? item : ''
                    const [rawTitle, ...descParts] = text.split(':')
                    const title = descParts.length
                        ? rawTitle.trim().charAt(0).toUpperCase() + rawTitle.trim().slice(1)
                        : 'Una carrera para transformar el agro'
                    const description = descParts.length ? descParts.join(':').trim() : text
                    const icon = PROFILE_ICONS[i % PROFILE_ICONS.length]
                    return `
                        <article class="feature-card reveal">
                            <div class="feature-icon">
                                <i class="${esc(icon)}"></i>
                            </div>
                            <h3>${esc(title)}</h3>
                            <p>${esc(description)}</p>
                        </article>`
                }).join('')}
            </div>
        </section>
    `
}

export default renderPerfil
