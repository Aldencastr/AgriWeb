import React, { useState, useMemo } from 'react'
import { esc } from '../../utils/dom'
import {
  asignaturasPlanEstudios2026,
  planEstudios2026,
  practicasProfesionales2026,
} from '../../data/planEstudios2026'

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

export default function PlanEstudios() {
  const [searchTerm, setSearchTerm] = useState('')
  const [academicYearFilter, setAcademicYearFilter] = useState('todos')

  const filteredYears = useMemo(() => {
    const normalizedSearch = normalizeSearchText(searchTerm.trim())

    return planEstudios2026.anios
      .filter((anio) => academicYearFilter === 'todos' || String(anio.numero) === academicYearFilter)
      .map((anio) => ({
        ...anio,
        semestres: anio.semestres
          .map((semestre) => ({
            ...semestre,
            asignaturas: semestre.asignaturas.filter((asignatura) => matchesSearch(asignatura, normalizedSearch)),
            optativas: (semestre.optativas || [])
              .map((optativa) => ({
                ...optativa,
                opciones: optativa.opciones.filter((opcion) => matchesSearch(opcion, normalizedSearch)),
              }))
              .filter((optativa) => optativa.opciones.length > 0),
          }))
          .filter((semestre) => semestre.asignaturas.length > 0 || semestre.optativas.length > 0),
      }))
      .filter((anio) => anio.semestres.length > 0)
  }, [searchTerm, academicYearFilter])

  const visibleSubjectCount = useMemo(() =>
    filteredYears
      .flatMap((anio) => anio.semestres)
      .reduce((total, semestre) => total + getSemesterCourseCount(semestre), 0),
    [filteredYears]
  )

  const hasActiveFilters = searchTerm.trim() !== '' || academicYearFilter !== 'todos'

  const handleSearch = (e) => {
    setSearchTerm(e.target.value)
  }

  const handleYearChange = (e) => {
    setAcademicYearFilter(e.target.value)
  }

  const clearFilters = () => {
    setSearchTerm('')
    setAcademicYearFilter('todos')
  }

  const clearSearch = () => {
    setSearchTerm('')
  }

  return (
    <section id="plan-estudios" className="section curriculum-section">
      <div className="container">
        <div className="section-title reveal">
          <h2>{planEstudios2026.plan}</h2>
          <p>
            {planEstudios2026.carrera} · {planEstudios2026.universidad}
          </p>
        </div>

        <div className="curriculum-modalities reveal" aria-label="Modalidades disponibles">
          {planEstudios2026.modalidades.map((modalidad, i) => (
            <article key={i} className="curriculum-modality">
              <strong>{modalidad.nombre}</strong>
              <p>{modalidad.descripcion}</p>
            </article>
          ))}
        </div>

        <div className="curriculum-overview curriculum-overview-2026 reveal">
          <div>
            <span>Duración</span>
            <strong>{planEstudios2026.anios.length} años</strong>
          </div>
          <div>
            <span>Semestres</span>
            <strong>{planEstudios2026.anios.flatMap((anio) => anio.semestres).length}</strong>
          </div>
          <div>
            <span>Asignaturas y opciones</span>
            <strong>{asignaturasPlanEstudios2026}</strong>
          </div>
        </div>

        <p className="curriculum-source-note">
          Malla organizada según la información proporcionada. Los datos recibidos incluyen códigos y nombres,
          pero no horas, créditos ni prerrequisitos.
        </p>

        <div className="curriculum-controls">
          <div className="curriculum-search">
            <label htmlFor="curriculum-search">Buscar asignatura</label>
            <div className="curriculum-search-field">
              <i className="fa-solid fa-magnifying-glass" aria-hidden="true" />
              <input
                id="curriculum-search"
                type="search"
                placeholder="Nombre o código"
                value={searchTerm}
                onChange={handleSearch}
              />
              {searchTerm && (
                <button
                  type="button"
                  className="curriculum-clear-search"
                  onClick={clearSearch}
                  aria-label="Limpiar búsqueda"
                >
                  <i className="fa-solid fa-xmark" aria-hidden="true" />
                </button>
              )}
            </div>
          </div>
          <div className="curriculum-semester-filter">
            <label htmlFor="curriculum-academic-year">Filtrar por año</label>
            <select id="curriculum-academic-year" value={academicYearFilter} onChange={handleYearChange}>
              <option value="todos">Todos los años</option>
              {planEstudios2026.anios.map((anio) => (
                <option key={anio.numero} value={String(anio.numero)}>
                  {anio.nombre}
                </option>
              ))}
            </select>
          </div>
        </div>

        {hasActiveFilters && (
          <button className="curriculum-reset-filters" type="button" onClick={clearFilters}>
            <i className="fa-solid fa-rotate-left" aria-hidden="true" />
            Mostrar todo el plan
          </button>
        )}

        <p className="curriculum-result-count" aria-live="polite">
          Se muestran {visibleSubjectCount} de {asignaturasPlanEstudios2026} asignaturas y opciones optativas.
        </p>

        {filteredYears.length === 0 ? (
          <div className="curriculum-empty" role="status">
            <i className="fa-solid fa-magnifying-glass" aria-hidden="true" />
            <strong>No encontramos asignaturas con esos filtros.</strong>
            <span>Prueba otro nombre o código, o muestra todo el plan.</span>
            {hasActiveFilters && (
              <button className="curriculum-reset-filters" type="button" onClick={clearFilters}>
                Mostrar todo el plan
              </button>
            )}
          </div>
        ) : (
          filteredYears.map((anio) => (
            <section key={anio.numero} className="curriculum-year" aria-labelledby={`curriculum-year-${anio.numero}`}>
              <h3 className="curriculum-year-heading" id={`curriculum-year-${anio.numero}`}>
                <span>{String(anio.numero).padStart(2, '0')}</span>
                {anio.nombre}
              </h3>
              {anio.semestres.map((semestre) => (
                <section
                  key={semestre.numero}
                  className="curriculum-semester"
                  aria-labelledby={`semester-${semestre.numero}`}
                >
                  <div className="curriculum-semester-heading">
                    <h4 id={`semester-${semestre.numero}`}>
                      <span className="curriculum-semester-number">
                        {String(semestre.numero).padStart(2, '0')}
                      </span>
                      {semestre.nombre}
                    </h4>
                    <p>{getSemesterCourseCount(semestre)} asignaturas y opciones</p>
                  </div>
                  <div className="curriculum-subject-grid">
                    {semestre.asignaturas.map((asignatura, idx) => (
                      <article
                        key={asignatura.codigo || idx}
                        className={`curriculum-subject ${asignatura.tipo === 'practica' ? 'curriculum-subject-practice' : ''}`}
                      >
                        <div className="curriculum-subject-heading">
                          <span className="curriculum-subject-code">{asignatura.codigo}</span>
                          {asignatura.tipo === 'practica' && <span className="curriculum-subject-tag">Práctica profesional</span>}
                        </div>
                        <h4>{asignatura.nombre}</h4>
                      </article>
                    ))}
                    {semestre.optativas.map((optativa, idx) => (
                      <article key={optativa.nombre || idx} className="curriculum-subject curriculum-elective">
                        <div className="curriculum-subject-heading">
                          <span className="curriculum-elective-label">
                            <i className="fa-solid fa-shuffle" aria-hidden="true" />
                            {optativa.nombre}
                          </span>
                          <span className="curriculum-subject-tag">Elegir una opción</span>
                        </div>
                        <div className="curriculum-elective-options">
                          {optativa.opciones.map((opcion, optIdx) => (
                            <div key={opcion.codigo || optIdx} className="curriculum-elective-option">
                              {optIdx > 0 && <span className="curriculum-elective-or">o</span>}
                              <span className="curriculum-subject-code">{opcion.codigo}</span>
                              <h4>{opcion.nombre}</h4>
                            </div>
                          ))}
                        </div>
                      </article>
                    ))}
                  </div>
                </section>
              ))}
            </section>
          ))
        )}
      </div>
    </section>
  )
}

// Export legacy functions for compatibility
export function initPlanEstudios() {
  // No longer needed in React - handled by component lifecycle
  return () => {}
}

export function planReset() {
  // Handled by parent component state
}

export function planClearSearch() {
  // Handled by parent component state
}