function Admision() {
    const requisitos = [
        'Cédula de identidad (o partida de nacimiento).',
        'Título de bachiller o certificado de notas de 4.º y 5.º año.',
        'Comprobante de pago o derecho de prematrícula.',
        'Llenado del formulario de prematrícula en el portal institucional.',
    ]

    const pasos = [
        { numero: 1, titulo: 'Registro e ingreso al portal', descripcion: 'Crea una cuenta en el sistema de prematrícula e ingresa al portal.' },
        { numero: 2, titulo: 'Carga de documentos', descripcion: 'Sube los requisitos escaneados en formato digital.' },
        { numero: 3, titulo: 'Selección de carrera', descripcion: 'Selecciona Ingeniería Agrícola como opción de carrera.' },
        { numero: 4, titulo: 'Confirmación y comprobante', descripcion: 'Confirma la prematrícula y descarga la hoja oficial.' },
    ]

    return (
        <section id="admision" className="section bg-light">
            <div className="container">
                <div className="section-title reveal">
                    <h2>Proceso de Prematrícula</h2>
                    <p>Requisitos, fechas claves y pasos para realizar tu prematrícula en línea.</p>
                </div>

                <div className="admision-grid">
                    <div className="admision-card reveal">
                        <h3><i className="fa-solid fa-clipboard-list"></i> Requisitos</h3>
                        <ul className="requisitos-list">
                            {requisitos.map((r, i) => (
                                <li key={i}><i className="fa-solid fa-check"></i> {r}</li>
                            ))}
                        </ul>
                    </div>

                    <div className="admision-card reveal">
                        <h3><i className="fa-solid fa-calendar-alt"></i> Fechas y acceso al portal</h3>
                        <div className="fechas-list">
                            <p>
                                Consulta en el portal institucional las fechas vigentes y completa allí tu proceso de prematrícula.
                            </p>
                            <a
                                className="btn btn-primary"
                                href="https://admision.setec.edu.ni/Prematricula/Inicio"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <i className="fa-solid fa-arrow-up-right-from-square" aria-hidden="true"></i>
                                Abrir portal oficial
                            </a>
                        </div>
                    </div>
                </div>

                <div className="pasos-section reveal">
                    <h3>Pasos para prematricularse</h3>
                    <div className="pasos-grid">
                        {pasos.map((p) => (
                            <div className="paso-card" key={p.numero}>
                                <div className="paso-numero">{p.numero}</div>
                                <h4>{p.titulo}</h4>
                                <p>{p.descripcion}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="admision-cta reveal">
                    <a
                        href="https://admision.setec.edu.ni/Prematricula/Inicio"
                        className="btn btn-primary"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <i className="fa-solid fa-user-plus" aria-hidden="true"></i> Ir al Portal de Prematrícula
                    </a>
                </div>
            </div>
        </section>
    )
}

export default Admision