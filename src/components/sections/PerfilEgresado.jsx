function PerfilEgresado() {
    const competencias = [
        { icon: 'fa-solid fa-tractor', titulo: 'Diseño de sistemas de riego', descripcion: 'Planificación, dimensionamiento y gestión de sistemas de riego eficientes' },
        { icon: 'fa-solid fa-satellite-dish', titulo: 'Agricultura de precisión', descripcion: 'Uso de sensores, drones y análisis de datos para optimizar cultivos' },
        { icon: 'fa-solid fa-mountain', titulo: 'Conservación de suelos', descripcion: 'Evaluación y manejo sostenible de recursos edáficos' },
        { icon: 'fa-solid fa-chart-line', titulo: 'Gestión de proyectos', descripcion: 'Formulación y evaluación de proyectos agropecuarios' },
        { icon: 'fa-solid fa-water', titulo: 'Hidráulica agrícola', descripcion: 'Diseño de obras hidráulicas y sistemas de bombeo' },
        { icon: 'fa-solid fa-cogs', titulo: 'Maquinaria agrícola', descripcion: 'Selección, operación y mantenimiento de equipos' },
    ]

    const campoLaboral = [
        'Empresas de ingeniería y consultoría agropecuaria',
        'Instituciones públicas y ONGs de desarrollo rural',
        'Empresas de insumos y maquinaria agrícola',
        'Cooperativas y asociaciones de productores',
        'Investigación y docencia universitaria',
        'Emprendimiento propio en el sector agro'
    ]

    return (
        <section id="perfil-egresado" className="section">
            <div className="container">
                <div className="section-title reveal">
                    <h2>Perfil del Egresado</h2>
                    <p>Competencias y campo laboral del ingeniero agrícola.</p>
                </div>

                <div className="grid-cards">
                    {competencias.map((c, i) => (
                        <article className="feature-card reveal" key={i}>
                            <div className="feature-icon">
                                <i className={c.icon}></i>
                            </div>
                            <h3>{c.titulo}</h3>
                            <p>{c.descripcion}</p>
                        </article>
                    ))}
                </div>

                <div className="campo-laboral reveal">
                    <h3><i className="fa-solid fa-briefcase"></i> Campo Laboral</h3>
                    <ul className="campo-list">
                        {campoLaboral.map((item, i) => (
                            <li key={i}><i className="fa-solid fa-check-circle"></i> {item}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    )
}

export default PerfilEgresado