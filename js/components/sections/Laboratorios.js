import { esc, toArray } from '../../utils/dom.js'

const state = { lightbox: null }

function Laboratorios({ items = [] }) {
    const labs = toArray(items)

    return `
        <section id="laboratorios" class="section bg-light">
            <div class="container">
                <div class="section-title reveal">
                    <h2>Laboratorios y Equipos</h2>
                    <p>Áreas de laboratorio relacionadas con la formación y la investigación agrícola.</p>
                </div>
                <div class="lab-grid">
                    ${labs.map((lab, i) => `
                        <div
                            class="lab-card reveal"
                            data-action="lab-open"
                            data-index="${i}"
                            role="button"
                            tabindex="0"
                            aria-label="Ver ${esc(lab.nombre)}"
                        >
                            <img
                                src="${esc(lab.imagen)}"
                                alt="${esc(lab.nombre)}"
                                loading="lazy"
                                width="600"
                                height="400"
                            />
                            <div class="lab-overlay">
                                <h3>${esc(lab.nombre)}</h3>
                                <p>${esc(lab.descripcion)}</p>
                            </div>
                        </div>`).join('')}
                </div>
            </div>
        </section>
    `
}

/** Guarda los labs para el lightbox y lo muestra/oculta manipulando el DOM. */
Laboratorios.setLabs = (labs) => {
    Laboratorios.labs = toArray(labs)
}

Laboratorios.open = (index) => {
    const lab = Laboratorios.labs[index]
    if (!lab) return
    state.lightbox = lab

    document.body.insertAdjacentHTML('beforeend', `
        <div class="lightbox" data-lightbox>
            <div class="lightbox-content">
                <button class="lightbox-close" data-action="lab-close" aria-label="Cerrar">
                    <i class="fa-solid fa-xmark"></i>
                </button>
                <img src="${esc(lab.imagen)}" alt="${esc(lab.nombre)}" />
                <div class="lightbox-caption">
                    <h3>${esc(lab.nombre)}</h3>
                    <p>${esc(lab.descripcion)}</p>
                </div>
            </div>
        </div>
    `)
}

Laboratorios.close = () => {
    state.lightbox = null
    document.querySelector('[data-lightbox]')?.remove()
}

export default Laboratorios
