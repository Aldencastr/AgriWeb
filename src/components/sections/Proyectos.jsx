function Proyectos({ items = [] }) {
    const projects = Array.isArray(items) ? items : Object.values(items || {})

    return (
        <section id="proyectos" className="section">
            <div className="container">
                <div className="section-title reveal">
                    <h2>Proyectos y Prácticas de Campo</h2>
                    <p>Ejemplos de proyectos y prácticas académicas de Ingeniería Agrícola.</p>
                </div>
                <div className="proyectos-grid">
                    {projects.filter((project) => project && typeof project === 'object').map((p, i) => (
                        <article className="proyecto-card reveal" key={i}>
                            <img
                                src={p.imagen}
                                alt={p.titulo}
                                loading="lazy"
                                width="600"
                                height="400"
                            />
                            <div className="proyecto-content">
                                <h3>{p.titulo}</h3>
                                <p>{p.descripcion}</p>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Proyectos