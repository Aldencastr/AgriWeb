import { useState } from 'react'

function Laboratorios({ items = [] }) {
    const [lightbox, setLightbox] = useState(null)
    const labs = (Array.isArray(items) ? items : Object.values(items || {}))
        .filter((item) => item && typeof item === 'object')

    return (
        <section id="laboratorios" className="section bg-light">
            <div className="container">
                <div className="section-title reveal">
                    <h2>Laboratorios y Equipos</h2>
                    <p>Áreas de laboratorio relacionadas con la formación y la investigación agrícola.</p>
                </div>
                <div className="lab-grid">
                    {labs.map((lab, i) => (
                        <div
                            className="lab-card reveal"
                            key={i}
                            onClick={() => setLightbox(lab)}
                            role="button"
                            tabIndex={0}
                            aria-label={`Ver ${lab.nombre}`}
                            onKeyDown={(e) => e.key === 'Enter' && setLightbox(lab)}
                        >
                            <img
                                src={lab.imagen}
                                alt={lab.nombre}
                                loading="lazy"
                                width="600"
                                height="400"
                            />
                            <div className="lab-overlay">
                                <h3>{lab.nombre}</h3>
                                <p>{lab.descripcion}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {lightbox && (
                <div className="lightbox" onClick={() => setLightbox(null)}>
                    <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
                        <button className="lightbox-close" onClick={() => setLightbox(null)} aria-label="Cerrar">
                            <i className="fa-solid fa-xmark"></i>
                        </button>
                        <img src={lightbox.imagen} alt={lightbox.nombre} />
                        <div className="lightbox-caption">
                            <h3>{lightbox.nombre}</h3>
                            <p>{lightbox.descripcion}</p>
                        </div>
                    </div>
                </div>
            )}
        </section>
    )
}

export default Laboratorios