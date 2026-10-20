import { esc, toArray } from '../../utils/dom.js'

function getArticleUrl(value) {
    if (typeof value !== 'string' || !value.trim()) return ''

    try {
        const url = new URL(value, window.location.origin)
        if (!['http:', 'https:'].includes(url.protocol)) return ''
        // En GitHub Pages (subruta) resuelve rutas relativas dentro del proyecto
        return url.href
    } catch {
        return ''
    }
}

function Noticias({ items = [] }) {
    const values = toArray(items)

    return `
        <section id="noticias" class="section">
            <div class="container">
                <div class="section-title reveal">
                    <h2>Noticias del Agro</h2>
                    <p>Mantente al día con lo último en innovación agrícola y tecnología del campo.</p>
                </div>
                <div class="news-grid">
                    ${values.length === 0 ? '<div class="card-loading">Próximamente habrá noticias disponibles.</div>' : ''}
                    ${values.map((n) => {
                        const articleUrl = getArticleUrl(n.url)
                        return `
                            <article class="news-card reveal">
                                <img
                                    src="${esc(n.imagen || 'images/alden.jpeg')}"
                                    alt="${esc(n.titulo || '')}"
                                    loading="lazy"
                                    width="600"
                                    height="400"
                                />
                                <div class="news-card-content">
                                    <span class="news-card-category">${esc(n.categoria || 'General')}</span>
                                    <h3>${esc(n.titulo || 'Noticia')}</h3>
                                    <p>${esc(n.descripcion || '')}</p>
                                    ${articleUrl ? `
                                        <a href="${esc(articleUrl)}" class="read-more" target="_blank" rel="noopener noreferrer">
                                            Leer más <i class="fa-solid fa-arrow-right" aria-hidden="true"></i>
                                        </a>` : ''}
                                </div>
                            </article>`
                    }).join('')}
                </div>
            </div>
        </section>
    `
}

export default Noticias
