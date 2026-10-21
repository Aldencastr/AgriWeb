'use client'

import { useState, useMemo } from 'react'
import { ChevronDown, ChevronUp, Search, X, Shuffle, BookOpen, GraduationCap, Clock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { ACADEMIC_YEARS } from '@/lib/constants'
import type { PlanEstudios, Anio, Semestre, Asignatura, Optativa } from '@/lib/types'

interface PlanEstudiosSectionProps {
  data: PlanEstudios
}

function normalizeSearchText(value: string): string {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLocaleLowerCase()
}

function matchesSearch(
  item: { codigo: string; nombre: string },
  search: string
): boolean {
  return (
    !search ||
    normalizeSearchText(item.codigo).includes(search) ||
    normalizeSearchText(item.nombre).includes(search)
  )
}

function getSemesterCourseCount(semestre: Semestre): number {
  return (
    semestre.asignaturas.length +
    (semestre.optativas || []).reduce(
      (count, optativa) => count + optativa.opciones.length,
      0
    )
  )
}

export function PlanEstudiosSection({ data }: PlanEstudiosSectionProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [academicYearFilter, setAcademicYearFilter] = useState('todos')
  const [expandedYears, setExpandedYears] = useState<Record<string, boolean>>(
    Object.fromEntries(data.anios.map((anio) => [String(anio.numero), true]))
  )

  const filteredYears = useMemo(() => {
    const normalizedSearch = normalizeSearchText(searchTerm.trim())

    return data.anios
      .filter((anio) => academicYearFilter === 'todos' || String(anio.numero) === academicYearFilter)
      .map((anio) => ({
        ...anio,
        semestres: anio.semestres
          .map((semestre) => ({
            ...semestre,
            asignaturas: semestre.asignaturas.filter((asignatura) =>
              matchesSearch(asignatura, normalizedSearch)
            ),
            optativas: (semestre.optativas || [])
              .map((optativa) => ({
                ...optativa,
                opciones: optativa.opciones.filter((opcion) =>
                  matchesSearch(opcion, normalizedSearch)
                ),
              }))
              .filter((optativa) => optativa.opciones.length > 0),
          }))
          .filter((semestre) => semestre.asignaturas.length > 0 || semestre.optativas.length > 0),
      }))
      .filter((anio) => anio.semestres.length > 0)
  }, [searchTerm, academicYearFilter])

  const visibleSubjectCount = useMemo(
    () =>
      filteredYears.flatMap((anio) => anio.semestres).reduce(
        (total, semestre) => total + getSemesterCourseCount(semestre),
        0
      ),
    [filteredYears]
  )

  const totalSubjects = data.anios.flatMap((anio) => anio.semestres).reduce(
    (total, semestre) => total + getSemesterCourseCount(semestre),
    0
  )

  const hasActiveFilters = searchTerm.trim() !== '' || academicYearFilter !== 'todos'

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }

  const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setAcademicYearFilter(e.target.value)
  }

  const clearFilters = () => {
    setSearchTerm('')
    setAcademicYearFilter('todos')
  }

  const clearSearch = () => {
    setSearchTerm('')
  }

  const toggleYear = (year: string) => {
    setExpandedYears((prev) => ({ ...prev, [year]: !prev[year] }))
  }

  return (
    <section id="plan-estudios" className="py-20 lg:py-28 bg-surface-1" aria-labelledby="plan-estudios-title">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <Badge variant="secondary" className="mb-4">
            <GraduationCap className="h-3 w-3 mr-1" />
            {data.plan}
          </Badge>
          <h2 id="plan-estudios-title" className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-neutral-900 dark:text-neutral-100 mb-4">
            {data.carrera}
          </h2>
          <p className="text-lg text-neutral-600 dark:text-neutral-400">
            {data.universidad}
          </p>
        </div>

        {/* Modalities */}
        <div className="grid md:grid-cols-2 gap-4 mb-10" aria-label="Modalidades disponibles">
          {data.modalidades.map((modalidad, i) => (
            <Card key={i} variant="bordered" className="h-full">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 h-10 w-10 rounded-lg bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center">
                  <BookOpen className="h-5 w-5 text-primary-600 dark:text-primary-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-neutral-900 dark:text-neutral-100">
                    {modalidad.nombre}
                  </h3>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">
                    {modalidad.descripcion}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-3 gap-4 mb-10" aria-label="Resumen del plan de estudios">
          <Card variant="bordered" className="text-center">
            <div className="text-3xl font-extrabold text-primary-600 dark:text-primary-400">
              {data.anios.length}
            </div>
            <div className="text-sm text-neutral-600 dark:text-neutral-400">Años</div>
          </Card>
          <Card variant="bordered" className="text-center">
            <div className="text-3xl font-extrabold text-primary-600 dark:text-primary-400">
              {data.anios.flatMap((a) => a.semestres).length}
            </div>
            <div className="text-sm text-neutral-600 dark:text-neutral-400">Semestres</div>
          </Card>
          <Card variant="bordered" className="text-center">
            <div className="text-3xl font-extrabold text-primary-600 dark:text-primary-400">
              {totalSubjects}
            </div>
            <div className="text-sm text-neutral-600 dark:text-neutral-400">Asignaturas y opciones</div>
          </Card>
        </div>

        <p className="text-center text-sm text-neutral-500 dark:text-neutral-500 mb-8 max-w-2xl mx-auto">
          Malla organizada según el Plan de Estudio 2026. Incluye códigos, nombres, créditos, horas y prerrequisitos.
        </p>

        {/* Controls */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1">
            <Input
              id="curriculum-search"
              type="search"
              placeholder="Buscar por nombre o código..."
              value={searchTerm}
              onChange={handleSearch}
              leftIcon={<Search className="h-4 w-4" />}
              rightIcon={
                searchTerm && (
                  <Button variant="ghost" size="icon" onClick={clearSearch} aria-label="Limpiar búsqueda">
                    <X className="h-4 w-4" />
                  </Button>
                )
              }
            />
          </div>
          <div className="w-full sm:w-48">
            <Select
              id="curriculum-academic-year"
              value={academicYearFilter}
              onChange={handleYearChange}
              options={[
                { value: 'todos', label: 'Todos los años' },
                ...ACADEMIC_YEARS,
              ]}
              placeholder="Filtrar por año"
            />
          </div>
        </div>

        {hasActiveFilters && (
          <Button variant="outline" onClick={clearFilters} className="mb-6 w-fit">
            <Shuffle className="h-4 w-4 mr-2" />
            Mostrar todo el plan
          </Button>
        )}

        <p className="text-center text-sm text-neutral-500 dark:text-neutral-500 mb-8" aria-live="polite">
          Se muestran {visibleSubjectCount} de {totalSubjects} asignaturas y opciones optativas.
        </p>

        {/* Empty State */}
        {filteredYears.length === 0 ? (
          <div className="text-center py-12" role="status">
            <Search className="h-12 w-12 mx-auto text-neutral-300 dark:text-neutral-700 mb-4" />
            <h3 className="text-lg font-medium text-neutral-900 dark:text-neutral-100 mb-2">
              No encontramos asignaturas con esos filtros
            </h3>
            <p className="text-neutral-500 dark:text-neutral-400 mb-4">
              Prueba otro nombre o código, o muestra todo el plan.
            </p>
            {hasActiveFilters && (
              <Button variant="outline" onClick={clearFilters}>
                Mostrar todo el plan
              </Button>
            )}
          </div>
        ) : (
          /* Years Accordion */
          <div className="space-y-4" role="list" aria-label="Años del plan de estudios">
            {filteredYears.map((anio) => (
              <Card key={anio.numero} variant="bordered" className="overflow-hidden">
                <button
                  onClick={() => toggleYear(String(anio.numero))}
                  className="w-full px-6 py-4 flex items-center justify-between gap-4 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
                  aria-expanded={expandedYears[String(anio.numero)]}
                  aria-controls={`year-content-${anio.numero}`}
                >
                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 font-extrabold text-lg">
                      {String(anio.numero).padStart(2, '0')}
                    </span>
                    <div>
                      <h3 className="font-semibold text-neutral-900 dark:text-neutral-100">
                        {anio.nombre}
                      </h3>
                      <p className="text-sm text-neutral-500 dark:text-neutral-400">
                        {anio.semestres.length} semestres ·{' '}
                        {anio.semestres.reduce((sum, s) => sum + s.asignaturas.length, 0)} asignaturas
                      </p>
                    </div>
                  </div>
                  {expandedYears[String(anio.numero)] ? (
                    <ChevronUp className="h-5 w-5 text-neutral-500 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-neutral-500 flex-shrink-0" />
                  )}
                </button>

                <div
                  id={`year-content-${anio.numero}`}
                  role="region"
                  aria-label={`${anio.nombre} - Contenido`}
                  className={cn(
                    'overflow-hidden transition-all duration-300',
                    expandedYears[String(anio.numero)] ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'
                  )}
                >
                  <div className="px-6 pb-6 space-y-6">
                    {anio.semestres.map((semestre) => (
                      <div key={semestre.numero} className="space-y-3">
                        <div className="flex items-center justify-between border-b border-surface-border pb-2">
                          <h4 className="font-medium text-neutral-900 dark:text-neutral-100 flex items-center gap-2">
                            <span className="flex h-6 w-6 items-center justify-center rounded bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 text-xs font-bold">
                              {String(semestre.numero).padStart(2, '0')}
                            </span>
                            {semestre.nombre}
                          </h4>
                          <span className="text-sm text-neutral-500 dark:text-neutral-400">
                            {getSemesterCourseCount(semestre)} asignaturas y opciones
                          </span>
                        </div>

                        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                          {semestre.asignaturas.map((asignatura, idx) => (
                            <article
                              key={asignatura.codigo || idx}
                              className={cn(
                                'p-3 rounded-lg border transition-colors',
                                asignatura.tipo === 'practica'
                                  ? 'bg-yellow-50 border-yellow-200 dark:bg-yellow-900/20 dark:border-yellow-800'
                                  : 'bg-surface-2 border-surface-border hover:border-primary-200 dark:hover:border-primary-800'
                              )}
                            >
                              <div className="flex items-start justify-between gap-2">
                                <span className="font-mono text-xs font-medium text-primary-600 dark:text-primary-400 flex-shrink-0">
                                  {asignatura.codigo}
                                </span>
                                {asignatura.tipo === 'practica' && (
                                  <Badge variant="secondary" className="text-xs flex-shrink-0">
                                    Práctica
                                  </Badge>
                                )}
                              </div>
                              <h5 className="font-medium text-neutral-900 dark:text-neutral-100 mt-1 text-sm leading-snug">
                                {asignatura.nombre}
                              </h5>
                              {(asignatura.creditos || asignatura.horas) && (
                                <div className="flex flex-wrap gap-2 mt-2 text-xs text-neutral-500 dark:text-neutral-400">
                                  {asignatura.creditos && (
                                    <span className="flex items-center gap-1">
                                      <GraduationCap className="h-3 w-3" />
                                      {asignatura.creditos} créd.
                                    </span>
                                  )}
                                  {asignatura.horas && (
                                    <span className="flex items-center gap-1">
                                      <Clock className="h-3 w-3" />
                                      {asignatura.horas} h
                                    </span>
                                  )}
                                </div>
                              )}
                            </article>
                          ))}

                          {semestre.optativas?.map((optativa, idx) => (
                            <article
                              key={optativa.nombre || idx}
                              className="p-3 rounded-lg border bg-blue-50 border-blue-200 dark:bg-blue-900/20 dark:border-blue-800"
                            >
                              <div className="flex items-center gap-2 mb-2">
                                <Shuffle className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                                <span className="font-medium text-sm text-blue-800 dark:text-blue-300">
                                  {optativa.nombre}
                                </span>
                                <Badge variant="outline" className="text-xs ml-auto">
                                  Elegir una
                                </Badge>
                              </div>
                              <div className="space-y-2">
                                {optativa.opciones.map((opcion, optIdx) => (
                                  <div
                                    key={opcion.codigo || optIdx}
                                    className="flex items-center gap-2 text-sm"
                                  >
                                    {optIdx > 0 && (
                                      <span className="text-neutral-400 dark:text-neutral-500 text-xs">
                                        o
                                      </span>
                                    )}
                                    <span className="font-mono text-xs font-medium text-blue-600 dark:text-blue-400">
                                      {opcion.codigo}
                                    </span>
                                    <span className="text-neutral-700 dark:text-neutral-300 flex-1">
                                      {opcion.nombre}
                                    </span>
                                  </div>
                                ))}
                              </div>
                            </article>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}