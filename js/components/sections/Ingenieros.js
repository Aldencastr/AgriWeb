import { esc, toArray } from '../../utils/dom.js'

/**
 * Sección "Ingenieros Especializados": tarjeta con foto y biografía
 * por cada ingeniero. Los datos vienen de Firebase (`ingenieros`) o de
 * la demo en `js/data/demoData.js`.
 */
function Ingenieros({ items = [] }) {
    const values = toArray(items).filter((item) => item && typeof item === 'object')

    return `
        <section id="ingenieros" class="section">
            <div class="container">
                <div class="section-title reveal">
                    <h2>Ingenieros Especializados</h2>
                    <p>Conoce a los especialistas que respaldan la formación e investigación de la carrera.</p>
                </div>
                <div class="ingenieros-grid">
                    ${values.length === 0 ? '<div class="card-loading">Próximamente conocerás a los especialistas de la carrera.</div>' : ''}
                    ${values.map((ing) => `
                        <article class="ingeniero-card reveal">
                            <div class="ingeniero-photo">
                                <img
                                    src="${esc(ing.imagen || 'images/logo.jpeg')}"
                                    alt="Foto de ${esc(ing.nombre || 'ingeniero especializado')}"
                                    loading="lazy"
                                    width="600"
                                    height="400"
                                />
                            </div>
                            <div class="ingeniero-info">
                                <h3>${esc(ing.nombre || 'Ingeniero especializado')}</h3>
                                ${ing.rol ? `<span class="ingeniero-rol">${esc(ing.rol)}</span>` : ''}
                                <p>${esc(ing.biografia || '')}</p>
                            </div>
                        </article>`).join('')}
                </div>
            </div>
        </section>
    `
}

export default Ingenieros
