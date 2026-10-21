import React from 'react'
import { toArray } from '../../utils/dom'

function getArticleUrl(value) {
  if (typeof value !== 'string' || !value.trim()) return ''

  try {
    const url = new URL(value, window.location.origin)
    if (!['http:', 'https:'].includes(url.protocol)) return ''
    return url.href
  } catch {
    return ''
  }
}

export default function Noticias({ items = [] }) {
  const values = toArray(items)

  return (
    <section id="noticias" className="section">
      <div className="container">
        <div className="section-title reveal">
          <h2>Noticias del Agro</h2>
          <p>Mantente al día con lo último en innovación agrícola y tecnología del campo.</p>
        </div>
        <div className="news-grid">
          {values.length === 0 ? (
            <div className="card-loading">Próximamente habrá noticias disponibles.</div>
          ) : (
            values.map((n, i) => {
              const articleUrl = getArticleUrl(n.url)
              return (
                <article key={i} className="news-card reveal">
                  <img
                    src={n.imagen || '/images/alden.jpeg'}
                    alt={n.titulo || ''}
                    loading="lazy"
                    width="600"
                    height="400"
                  />
                  <div className="news-card-content">
                    <span className="news-card-category">{n.categoria || 'General'}</span>
                    <h3>{n.titulo || 'Noticia'}</h3>
                    <p>{n.descripcion || ''}</p>
                    {articleUrl ? (
                      <a
                        href={articleUrl}
                        className="read-more"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Leer más <i className="fa-solid fa-arrow-right" aria-hidden="true" />
                      </a>
                    ) : null}
                  </div>
                </article>
              )
            })
          )}
        </div>
      </div>
    </section>
  )
}