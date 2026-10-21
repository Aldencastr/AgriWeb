// Data loaders - imports JSON data directly for static generation
// In production, these are inlined at build time

import type { SiteData, PlanEstudios, SocialLink, CampusLocation } from '@/lib/types'

// Import JSON files directly - Next.js will inline them at build time
import sitioData from '@/data/sitio.json'
import planEstudiosData from '@/data/plan-estudios.json'
import socialLinksData from '@/data/social-links.json'
import campusLocationData from '@/data/campus-location.json'

// Loaders for each data file - synchronous since data is imported at build time
export function loadSiteData(): Promise<SiteData> {
  return Promise.resolve(sitioData as SiteData)
}

export function loadPlanEstudios(): Promise<PlanEstudios> {
  return Promise.resolve(planEstudiosData as PlanEstudios)
}

export function loadSocialLinks(): Promise<SocialLink[]> {
  return Promise.resolve(socialLinksData as SocialLink[])
}

export function loadCampusLocation(): Promise<CampusLocation> {
  return Promise.resolve(campusLocationData as CampusLocation)
}

// Batch loader for initial page load
export async function loadInitialData() {
  const [siteData, planEstudios, socialLinks, campusLocation] = await Promise.all([
    loadSiteData(),
    loadPlanEstudios(),
    loadSocialLinks(),
    loadCampusLocation(),
  ])
  
  return {
    siteData,
    planEstudios,
    socialLinks,
    campusLocation,
  }
}

// Client-side fetcher with SWR-like behavior (for runtime updates)
export function createDataFetcher<T>(url: string) {
  let promise: Promise<T> | null = null
  let subscribers = new Set<(data: T) => void>()
  let cachedData: T | null = null
  
  async function fetchData() {
    if (promise) return promise
    
    promise = (async () => {
      const response = await fetch(url)
      if (!response.ok) throw new Error(`Failed to fetch ${url}`)
      const data = await response.json()
      cachedData = data
      subscribers.forEach(cb => cb(data))
      return data
    })()
    
    return promise
  }
  
  function subscribe(callback: (data: T) => void) {
    subscribers.add(callback)
    if (cachedData) callback(cachedData)
    return () => subscribers.delete(callback)
  }
  
  return { fetchData, subscribe }
}

// Preload function for critical data (client-side only)
export function preloadCriticalData() {
  if (typeof window !== 'undefined') {
    // Data is already loaded at build time, but we can prefetch for updates
    Promise.all([
      fetch('/data/sitio.json').then(r => r.json()).catch(console.error),
      fetch('/data/plan-estudios.json').then(r => r.json()).catch(console.error),
    ]).catch(console.error)
  }
}