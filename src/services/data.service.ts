// Data service - Single source of truth for all data operations
// Combines Firebase real-time data with local JSON fallbacks

import { loadSiteData, loadPlanEstudios, loadSocialLinks, loadCampusLocation } from '@/data/loaders'
import {
  subscribeToSiteData,
  subscribeToLatestTestimonios,
  subscribeToIngenieros,
  fetchTestimonios,
  fetchIngenieros,
  submitTestimonio,
  type Testimonio,
} from '@/lib/firebase'
import type { SiteData, PlanEstudios, SocialLink, CampusLocation } from '@/lib/types'

// Cache for server-side data
let siteDataCache: SiteData | null = null
let planEstudiosCache: PlanEstudios | null = null
let socialLinksCache: SocialLink[] | null = null
let campusLocationCache: CampusLocation | null = null

// Server-side data fetching (for SSR/SSG)
export async function getSiteData(): Promise<SiteData> {
  if (siteDataCache) return siteDataCache
  siteDataCache = await loadSiteData()
  return siteDataCache
}

export async function getPlanEstudios(): Promise<PlanEstudios> {
  if (planEstudiosCache) return planEstudiosCache
  planEstudiosCache = await loadPlanEstudios()
  return planEstudiosCache
}

export async function getSocialLinks(): Promise<SocialLink[]> {
  if (socialLinksCache) return socialLinksCache
  socialLinksCache = await loadSocialLinks()
  return socialLinksCache
}

export async function getCampusLocation(): Promise<CampusLocation> {
  if (campusLocationCache) return campusLocationCache
  campusLocationCache = await loadCampusLocation()
  return campusLocationCache
}

// Real-time subscriptions (client-side only)
export function subscribeToSiteDataChanges(callback: (data: SiteData | null) => void): () => void {
  return subscribeToSiteData((data) => {
    if (data) {
      siteDataCache = data as unknown as SiteData
      callback(siteDataCache)
    } else {
      // Fallback to local data
      getSiteData().then(callback).catch(() => callback(null))
    }
  })
}

export function subscribeToTestimonios(
  callback: (testimonios: Testimonio[]) => void,
  limit = 50
): () => void {
  return subscribeToLatestTestimonios(limit, (data) => {
    const mapped = data.map(item => ({
      id: item.id,
      nombre: (item as Record<string, unknown>).nombre as string,
      rol: (item as Record<string, unknown>).rol as string,
      texto: (item as Record<string, unknown>).texto as string,
      imagen: (item as Record<string, unknown>).imagen as string | undefined,
      uid: (item as Record<string, unknown>).uid as string | undefined,
      creadoEn: item.creadoEn,
    })) as Testimonio[]
    callback(mapped)
  })
}

export function subscribeToIngenierosList(callback: (ingenieros: Testimonio[]) => void): () => void {
  return subscribeToIngenieros((data) => {
    const mapped = data.map(item => ({
      id: item.id,
      nombre: (item as Record<string, unknown>).nombre as string,
      rol: (item as Record<string, unknown>).rol as string,
      texto: (item as Record<string, unknown>).texto as string,
      imagen: (item as Record<string, unknown>).imagen as string | undefined,
      uid: (item as Record<string, unknown>).uid as string | undefined,
      creadoEn: (item as Record<string, unknown>).creadoEn as number | undefined,
    })) as Testimonio[]
    callback(mapped)
  })
}

// Hybrid fetch: try Firebase first, fallback to local
export async function getTestimonios(): Promise<Testimonio[]> {
  try {
    return await fetchTestimonios()
  } catch {
    // Fallback to local demo data
    const siteData = await getSiteData()
    return siteData.testimonios ?? []
  }
}

export async function getIngenieros() {
  try {
    return await fetchIngenieros()
  } catch {
    const siteData = await getSiteData()
    return siteData.ingenieros ?? []
  }
}

export async function addTestimonio(data: Omit<Testimonio, 'id' | 'creadoEn'>): Promise<string> {
  return submitTestimonio(data)
}

// Computed data helpers
export function getTotalSubjects(plan: PlanEstudios): number {
  return plan.anios.reduce((total, anio) => {
    return total + anio.semestres.reduce((semTotal, semestre) => {
      return semTotal + semestre.asignaturas.length + 
        (semestre.optativas?.reduce((optTotal, opt) => optTotal + opt.opciones.length, 0) ?? 0)
    }, 0)
  }, 0)
}

export function getTotalSemesters(plan: PlanEstudios): number {
  return plan.anios.reduce((total, anio) => total + anio.semestres.length, 0)
}

export function getYearsArray(plan: PlanEstudios) {
  return plan.anios.map(anio => ({
    value: String(anio.numero),
    label: anio.nombre,
    semestres: anio.semestres.length,
    asignaturas: anio.semestres.reduce((sum, s) => sum + s.asignaturas.length, 0),
  }))
}

export function filterPlanEstudios(
  plan: PlanEstudios,
  search: string,
  anioFilter: string
) {
  const normalizedSearch = search
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()

  const matchesSearch = (asignatura: { codigo: string; nombre: string }) =>
    !normalizedSearch ||
    asignatura.codigo.toLowerCase().includes(normalizedSearch) ||
    asignatura.nombre.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().includes(normalizedSearch)

  return plan.anios
    .filter(anio => anioFilter === 'todos' || String(anio.numero) === anioFilter)
    .map(anio => ({
      ...anio,
      semestres: anio.semestres
        .map(semestre => ({
          ...semestre,
          asignaturas: semestre.asignaturas.filter(matchesSearch),
          optativas: (semestre.optativas || [])
            .map(optativa => ({
              ...optativa,
              opciones: optativa.opciones.filter(matchesSearch),
            }))
            .filter(optativa => optativa.opciones.length > 0),
        }))
        .filter(semestre => semestre.asignaturas.length > 0 || semestre.optativas?.length > 0),
    }))
    .filter(anio => anio.semestres.length > 0)
}

export function getVisibleSubjectCount(filteredAnios: ReturnType<typeof filterPlanEstudios>): number {
  return filteredAnios.flatMap(anio => anio.semestres).reduce((total, semestre) => {
    return total + semestre.asignaturas.length + 
      (semestre.optativas?.reduce((sum, opt) => sum + opt.opciones.length, 0) ?? 0)
  }, 0)
}

// Clear cache (useful for testing or after mutations)
export function clearDataCache() {
  siteDataCache = null
  planEstudiosCache = null
  socialLinksCache = null
  campusLocationCache = null
}