import { esc } from '../../utils/dom.js'

const competencias = [
    { icon: 'fa-solid fa-tractor', titulo: 'Diseño de sistemas de riego', descripcion: 'Planificación, dimensionamiento y gestión de sistemas de riego eficientes' },
    { icon: 'fa-solid fa-satellite-dish', titulo: 'Agricultura de precisión', descripcion: 'Uso de sensores, drones y análisis de datos para optimizar cultivos' },
    { icon: 'fa-solid fa-mountain', titulo: 'Conservación de suelos', descripcion: 'Evaluación y manejo sostenible de recursos edáficos' },
    { icon: 'fa-solid fa-chart-line', titulo: 'Gestión de proyectos', descripcion: 'Formulación y evaluación de proyectos agropecuarios' },
    { icon: 'fa-solid fa-water', titulo: 'Hidráulica agrícola', descripcion: 'Diseño de obras hidráulicas y sistemas de bombeo' },
    { icon: 'fa-solid fa-cogs', titulo: 'Maquinaria agrícola', descripcion: 'Selección, operación y mantenimiento de equipos' }
]

const campoLaboral = [
    'Empresas de ingeniería y consultoría agropecuaria',
    'Instituciones públicas y ONGs de desarrollo rural',
    'Empresas de insumos y maquinaria agrícola',
    'Cooperativas y asociaciones de productores',
    'Investigación y docencia universitaria',
    'Emprendimiento propio en el sector agro'
]

export function renderPerfilEgresado() {
    return `
        <section id="perfil-egresado" class="section">
            <div class="container">
                <div class="section-title reveal">
                    <h2>Perfil del Egresado</h2>
                    <p>Competencias y campo laboral del ingeniero agrícola.</p>
                </div>

                <div class="grid-cards">
                    ${competencias.map((c) => `
                        <article class="feature-card reveal">
                            <div class="feature-icon">
                                <i class="${esc(c.icon)}"></i>
                            </div>
                            <h3>${esc(c.titulo)}</h3>
                            <p>${esc(c.descripcion)}</p>
                        </article>`).join('')}
                </div>

                <div class="campo-laboral reveal">
                    <h3><i class="fa-solid fa-briefcase"></i> Campo Laboral</h3>
                    <ul class="campo-list">
                        ${campoLaboral.map((item) => `
                            <li><i class="fa-solid fa-check-circle"></i> ${esc(item)}</li>`).join('')}
                    </ul>
                </div>
            </div>
        </section>
    `
}

export default renderPerfilEgresado
