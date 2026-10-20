import {
    asignaturasPlanEstudios2026,
    planEstudios2026,
    practicasProfesionales2026
} from '../../data/planEstudios2026.js'
import { esc } from '../../utils/dom.js'

const state = { searchTerm: '', academicYearFilter: 'todos' }

function normalizeSearchText(value) {
    return value
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLocaleLowerCase()
}

function matchesSearch(asignatura, search) {
    return !search ||
        normalizeSearchText(asignatura.codigo).includes(search) ||
        normalizeSearchText(asignatura.nombre).includes(search)
}

function getSemesterCourseCount(semester) {
    return semester.asignaturas.length +
        (semester.optativas || []).reduce((count, optativa) => count + optativa.opciones.length, 0)
}

function getFilteredYears() {
    const normalizedSearch = normalizeSearchText(state.searchTerm.trim())

    return planEstudios2026.anios
        .filter((anio) => state.academicYearFilter === 'todos' || String(anio.numero) === state.academicYearFilter)
        .map((anio) => ({
            ...anio,
            semestres: anio.semestres
                .map((semestre) => ({
                    ...semestre,
                    asignaturas: semestre.asignaturas.filter((asignatura) => matchesSearch(asignatura, normalizedSearch)),
                    optativas: (semestre.optativas || [])
                        .map((optativa) => ({
                            ...optativa,
                            opciones: optativa.opciones.filter((opcion) => matchesSearch(opcion, normalizedSearch))
                        }))
                        .filter((optativa) => optativa.opciones.length > 0)
                }))
                .filter((semestre) => semestre.asignaturas.length > 0 || semestre.optativas.length > 0)
        }))
        .filter((anio) => anio.semestres.length > 0)
}

function clearFilters() {
    state.searchTerm = ''
    state.academicYearFilter = 'todos'
    const search = document.getElementById('curriculum-search')
    const select = document.getElementById('curriculum-academic-year')
    if (search) search.value = ''
    if (select) select.value = 'todos'
    renderResults()
}

export function planReset() {
    clearFilters()
}

export function planClearSearch() {
    state.searchTerm = ''
    document.getElementById('curriculum-search').value = ''
    renderResults()
}

function renderResults() {
    const target = document.querySelector('[data-plan-results]')
    if (!target) return

    const filteredYears = getFilteredYears()
    const visibleSubjectCount = filteredYears
        .flatMap((anio) => anio.semestres)
        .reduce((total, semestre) => total + getSemesterCourseCount(semestre), 0)
    const hasActiveFilters = state.searchTerm.trim() !== '' || state.academicYearFilter !== 'todos'

    target.innerHTML = `
        ${hasActiveFilters ? `
            <button class="curriculum-reset-filters" type="button" data-action="plan-reset">
                <i class="fa-solid fa-rotate-left" aria-hidden="true"></i>
                Mostrar todo el plan
            </button>` : ''}

        <p class="curriculum-result-count" aria-live="polite">
            Se muestran ${visibleSubjectCount} de ${asignaturasPlanEstudios2026} asignaturas y opciones optativas.
        </p>

        ${filteredYears.length === 0 ? `
            <div class="curriculum-empty" role="status">
                <i class="fa-solid fa-magnifying-glass" aria-hidden="true"></i>
                <strong>No encontramos asignaturas con esos filtros.</strong>
                <span>Prueba otro nombre o código, o muestra todo el plan.</span>
                ${hasActiveFilters ? `
                    <button class="curriculum-reset-filters" type="button" data-action="plan-reset">
                        Mostrar todo el plan
                    </button>` : ''}
            </div>
        ` : filteredYears.map((anio) => `
            <section class="curriculum-year" aria-labelledby="curriculum-year-${esc(String(anio.numero))}">
                <h3 class="curriculum-year-heading" id="curriculum-year-${esc(String(anio.numero))}">
                    <span>${esc(String(anio.numero).padStart(2, '0'))}</span>
                    ${esc(anio.nombre)}
                </h3>
                ${anio.semestres.map((semestre) => `
                    <section
                        class="curriculum-semester"
                        aria-labelledby="semester-${esc(String(semestre.numero))}"
                    >
                        <div class="curriculum-semester-heading">
                            <h4 id="semester-${esc(String(semestre.numero))}">
                                <span class="curriculum-semester-number">
                                    ${esc(String(semestre.numero).padStart(2, '0'))}
                                </span>
                                ${esc(semestre.nombre)}
                            </h4>
                            <p>${getSemesterCourseCount(semestre)} asignaturas y opciones</p>
                        </div>
                        <div class="curriculum-subject-grid">
                            ${semestre.asignaturas.map((asignatura) => `
                                <article
                                    class="curriculum-subject ${asignatura.tipo === 'practica' ? 'curriculum-subject-practice' : ''}"
                                >
                                    <div class="curriculum-subject-heading">
                                        <span class="curriculum-subject-code">${esc(asignatura.codigo)}</span>
                                        ${asignatura.tipo === 'practica' ? '<span class="curriculum-subject-tag">Práctica profesional</span>' : ''}
                                    </div>
                                    <h4>${esc(asignatura.nombre)}</h4>
                                </article>`).join('')}
                            ${semestre.optativas.map((optativa) => `
                                <article class="curriculum-subject curriculum-elective">
                                    <div class="curriculum-subject-heading">
                                        <span class="curriculum-elective-label">
                                            <i class="fa-solid fa-shuffle" aria-hidden="true"></i>
                                            ${esc(optativa.nombre)}
                                        </span>
                                        <span class="curriculum-subject-tag">Elegir una opción</span>
                                    </div>
                                    <div class="curriculum-elective-options">
                                        ${optativa.opciones.map((opcion, index) => `
                                            <div class="curriculum-elective-option">
                                                ${index > 0 ? '<span class="curriculum-elective-or">o</span>' : ''}
                                                <span class="curriculum-subject-code">${esc(opcion.codigo)}</span>
                                                <h4>${esc(opcion.nombre)}</h4>
                                            </div>`).join('')}
                                    </div>
                                </article>`).join('')}
                        </div>
                    </section>`).join('')}
            </section>`).join('')}
    `
}

function PlanEstudios() {
    return `
        <section id="plan-estudios" class="section curriculum-section">
            <div class="container">
                <div class="section-title reveal">
                    <h2>${esc(planEstudios2026.plan)}</h2>
                    <p>
                        ${esc(planEstudios2026.carrera)} · ${esc(planEstudios2026.universidad)}
                    </p>
                </div>

                <div class="curriculum-modalities reveal" aria-label="Modalidades disponibles">
                    ${planEstudios2026.modalidades.map((modalidad) => `
                        <article class="curriculum-modality">
                            <strong>${esc(modalidad.nombre)}</strong>
                            <p>${esc(modalidad.descripcion)}</p>
                        </article>`).join('')}
                </div>

                <div class="curriculum-overview curriculum-overview-2026 reveal">
                    <div>
                        <span>Duración</span>
                        <strong>${planEstudios2026.anios.length} años</strong>
                    </div>
                    <div>
                        <span>Semestres</span>
                        <strong>${planEstudios2026.anios.flatMap((anio) => anio.semestres).length}</strong>
                    </div>
                    <div>
                        <span>Asignaturas y opciones</span>
                        <strong>${asignaturasPlanEstudios2026}</strong>
                    </div>
                </div>

                <p class="curriculum-source-note">
                    Malla organizada según la información proporcionada. Los datos recibidos incluyen códigos y nombres,
                    pero no horas, créditos ni prerrequisitos.
                </p>

                <div class="curriculum-controls">
                    <div class="curriculum-search">
                        <label for="curriculum-search">Buscar asignatura</label>
                        <div class="curriculum-search-field">
                            <i class="fa-solid fa-magnifying-glass" aria-hidden="true"></i>
                            <input
                                id="curriculum-search"
                                type="search"
                                placeholder="Nombre o código"
                            />
                            <button
                                type="button"
                                class="curriculum-clear-search"
                                data-action="plan-clear-search"
                                aria-label="Limpiar búsqueda"
                            >
                                <i class="fa-solid fa-xmark" aria-hidden="true"></i>
                            </button>
                        </div>
                    </div>
                    <div class="curriculum-semester-filter">
                        <label for="curriculum-academic-year">Filtrar por año</label>
                        <select id="curriculum-academic-year">
                            <option value="todos">Todos los años</option>
                            ${planEstudios2026.anios.map((anio) => `
                                <option value="${esc(String(anio.numero))}">
                                    ${esc(anio.nombre)}
                                </option>`).join('')}
                        </select>
                    </div>
                </div>

                <div data-plan-results></div>

                <section class="curriculum-practice-path" aria-labelledby="professional-practices-heading">
                    <div class="curriculum-practice-heading">
                        <span class="curriculum-practice-icon" aria-hidden="true">
                            <i class="fa-solid fa-tractor"></i>
                        </span>
                        <div>
                            <h3 id="professional-practices-heading">Prácticas Profesionales</h3>
                            <p>Trayecto de práctica a lo largo del plan de estudios</p>
                        </div>
                    </div>
                    <div class="curriculum-practice-list">
                        ${practicasProfesionales2026.map((practica) => `
                            <div class="curriculum-practice-item">
                                <span class="curriculum-practice-code">${esc(practica.codigo)}</span>
                                <strong>${esc(practica.nombre)}</strong>
                                <span>${esc(practica.semestre)}</span>
                            </div>`).join('')}
                    </div>
                </section>
            </div>
        </section>
    `
}

export function initPlanEstudios(root) {
    const searchInput = root.querySelector('#curriculum-search')
    const yearSelect = root.querySelector('#curriculum-academic-year')
    if (!searchInput || !yearSelect) return () => {}

    const onSearch = (event) => {
        state.searchTerm = event.target.value
        renderResults()
    }
    const onYearChange = (event) => {
        state.academicYearFilter = event.target.value
        renderResults()
    }

    searchInput.addEventListener('input', onSearch)
    yearSelect.addEventListener('change', onYearChange)
    renderResults()

    return () => {
        searchInput.removeEventListener('input', onSearch)
        yearSelect.removeEventListener('change', onYearChange)
        state.searchTerm = ''
        state.academicYearFilter = 'todos'
    }
}

export default PlanEstudios
