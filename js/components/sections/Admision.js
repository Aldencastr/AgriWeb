import { esc } from '../../utils/dom.js'

const requisitos = [
    'Cédula de identidad (o partida de nacimiento).',
    'Título de bachiller o certificado de notas de 4.º y 5.º año.',
    'Comprobante de pago o derecho de prematrícula.',
    'Llenado del formulario de prematrícula en el portal institucional.'
]

const pasos = [
    { numero: 1, titulo: 'Registro e ingreso al portal', descripcion: 'Crea una cuenta en el sistema de prematrícula e ingresa al portal.' },
    { numero: 2, titulo: 'Carga de documentos', descripcion: 'Sube los requisitos escaneados en formato digital.' },
    { numero: 3, titulo: 'Selección de carrera', descripcion: 'Selecciona Ingeniería Agrícola como opción de carrera.' },
    { numero: 4, titulo: 'Confirmación y comprobante', descripcion: 'Confirma la prematrícula y descarga la hoja oficial.' }
]

export function renderAdmision() {
    return `
        <section id="admision" class="section bg-light">
            <div class="container">
                <div class="section-title reveal">
                    <h2>Proceso de Prematrícula</h2>
                    <p>Requisitos, fechas claves y pasos para realizar tu prematrícula en línea.</p>
                </div>

                <div class="admision-grid">
                    <div class="admision-card reveal">
                        <h3><i class="fa-solid fa-clipboard-list"></i> Requisitos</h3>
                        <ul class="requisitos-list">
                            ${requisitos.map((r) => `
                                <li><i class="fa-solid fa-check"></i> ${esc(r)}</li>`).join('')}
                        </ul>
                    </div>

                    <div class="admision-card reveal">
                        <h3><i class="fa-solid fa-calendar-alt"></i> Fechas y acceso al portal</h3>
                        <div class="fechas-list">
                            <p>
                                Consulta en el portal institucional las fechas vigentes y completa allí tu proceso de prematrícula.
                            </p>
                            <a
                                class="btn btn-primary"
                                href="https://admision.setec.edu.ni/Prematricula/Inicio"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <i class="fa-solid fa-arrow-up-right-from-square" aria-hidden="true"></i>
                                Abrir portal oficial
                            </a>
                        </div>
                    </div>
                </div>

                <div class="pasos-section reveal">
                    <h3>Pasos para prematricularse</h3>
                    <div class="pasos-grid">
                        ${pasos.map((p) => `
                            <div class="paso-card">
                                <div class="paso-numero">${p.numero}</div>
                                <h4>${esc(p.titulo)}</h4>
                                <p>${esc(p.descripcion)}</p>
                            </div>`).join('')}
                    </div>
                </div>

                <div class="admision-cta reveal">
                    <a
                        href="https://admision.setec.edu.ni/Prematricula/Inicio"
                        class="btn btn-primary"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <i class="fa-solid fa-user-plus" aria-hidden="true"></i> Ir al Portal de Prematrícula
                    </a>
                </div>
            </div>
        </section>
    `
}

export default renderAdmision
