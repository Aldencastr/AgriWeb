import { esc, toValues } from '../../utils/dom.js'

function Proyectos({ items = [] }) {
    const projects = toValues(items).filter((project) => project && typeof project === 'object')

    return `
        <section id="proyectos" class="section">
            <div class="container">
                <div class="section-title reveal">
                    <h2>Proyectos y Prácticas de Campo</h2>
                    <p>Ejemplos de proyectos y prácticas académicas de Ingeniería Agrícola.</p>
                </div>
                <div class="proyectos-grid">
                    ${projects.map((p) => `
                        <article class="proyecto-card reveal">
                            <img
                                src="${esc(p.imagen)}"
                                alt="${esc(p.titulo)}"
                                loading="lazy"
                                width="600"
                                height="400"
                            />
                            <div class="proyecto-content">
                                <h3>${esc(p.titulo)}</h3>
                                <p>${esc(p.descripcion)}</p>
                            </div>
                        </article>`).join('')}
                </div>
            </div>
        </section>
    `
}

export default Proyectos
