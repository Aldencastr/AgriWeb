// Analytics service - Event tracking for Plausible, GA4, and Firebase Analytics

import { logEvent, AnalyticsEvents } from '@/lib/firebase'

// Event types for type safety
export type AnalyticsEvent =
  | 'simulator_start'
  | 'simulator_complete'
  | 'lead_submit'
  | 'pdf_download'
  | 'testimonial_submit'
  | 'page_view'
  | 'cta_click'
  | 'nav_click'
  | 'video_play'
  | 'map_interaction'
  | 'search'
  | 'filter'
  | 'share'
  | 'error'

interface EventParams {
  [key: string]: string | number | boolean | undefined
}

// Queue for offline events
const eventQueue: Array<{ event: AnalyticsEvent; params: EventParams; timestamp: number }> = []
let isOnline = typeof navigator !== 'undefined' ? navigator.onLine : true

// Initialize online/offline listeners
if (typeof window !== 'undefined') {
  window.addEventListener('online', flushQueue)
  window.addEventListener('offline', () => { isOnline = false })
}

/**
 * Track an analytics event
 */
export function trackEvent(event: AnalyticsEvent, params: EventParams = {}): void {
  const enrichedParams = {
    ...params,
    timestamp: Date.now(),
    page: typeof window !== 'undefined' ? window.location.pathname : 'unknown',
    referrer: typeof document !== 'undefined' ? document.referrer : 'unknown',
    user_agent: typeof navigator !== 'undefined' ? navigator.userAgent : 'unknown',
  }

  // Send to all providers
  sendToPlausible(event, enrichedParams)
  sendToGA4(event, enrichedParams)
  sendToFirebase(event, enrichedParams)

  // Queue if offline
  if (!isOnline) {
    eventQueue.push({ event, params: enrichedParams, timestamp: Date.now() })
  }
}

/**
 * Send event to Plausible Analytics
 */
function sendToPlausible(event: AnalyticsEvent, params: EventParams): void {
  if (typeof window === 'undefined') return
  
  // Check if Plausible is loaded
  if ('plausible' in window) {
    const plausible = (window as { plausible?: (event: string, options?: { props: EventParams }) => void }).plausible
    if (plausible) {
      plausible(event, { props: params })
    }
  }
  
  // Also try data-layer for GTM
  if ('dataLayer' in window) {
    (window as { dataLayer: unknown[] }).dataLayer.push({
      event,
      ...params,
    })
  }
}

/**
 * Send event to Google Analytics 4
 */
function sendToGA4(event: AnalyticsEvent, params: EventParams): void {
  if (typeof window === 'undefined') return
  
  const gtag = (window as { gtag?: (...args: unknown[]) => void }).gtag
  if (gtag) {
    gtag('event', event, params)
  }
}

/**
 * Send event to Firebase Analytics
 */
async function sendToFirebase(event: AnalyticsEvent, params: EventParams): Promise<void> {
  if (process.env.NEXT_PUBLIC_ENABLE_ANALYTICS !== 'true') return
  
  // Filter out undefined values for Firebase
  const firebaseParams: Record<string, string | number | boolean> = {}
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined) {
      firebaseParams[key] = value as string | number | boolean
    }
  }
  
  try {
    await logEvent(event, firebaseParams)
  } catch (error) {
    // Silently fail - analytics shouldn't break the app
    console.debug('Firebase Analytics error:', error)
  }
}

/**
 * Flush queued events when coming back online
 */
async function flushQueue(): Promise<void> {
  isOnline = true
  const queue = [...eventQueue]
  eventQueue.length = 0
  
  for (const { event, params } of queue) {
    sendToPlausible(event, params)
    sendToGA4(event, params)
    await sendToFirebase(event, params)
  }
}

/**
 * Convenience functions for common events
 */
export const Analytics = {
  // Simulator events
  simulatorStart: (simulator: 'calculadora-riego' | 'test-perfil') =>
    trackEvent('simulator_start', { simulator }),
  
  simulatorComplete: (simulator: 'calculadora-riego' | 'test-perfil', result?: Record<string, unknown>) =>
    trackEvent('simulator_complete', { simulator, ...result }),
  
  // Lead events
  leadSubmit: (source: string, userType?: string) =>
    trackEvent('lead_submit', { source, user_type: userType }),
  
  // Download events
  pdfDownload: (resource: string, simulator?: string) =>
    trackEvent('pdf_download', { resource, simulator }),
  
  // Testimonial events
  testimonialSubmit: (success: boolean) =>
    trackEvent('testimonial_submit', { success }),
  
  // Navigation events
  navClick: (label: string, href: string) =>
    trackEvent('nav_click', { label, href }),
  
  ctaClick: (label: string, location: string) =>
    trackEvent('cta_click', { label, location }),
  
  // Content interaction
  videoPlay: (videoId: string, platform: string) =>
    trackEvent('video_play', { video_id: videoId, platform }),
  
  mapInteraction: (action: string, layer?: string) =>
    trackEvent('map_interaction', { action, layer }),
  
  search: (query: string, results: number) =>
    trackEvent('search', { query, results }),
  
  filter: (filterType: string, value: string) =>
    trackEvent('filter', { filter_type: filterType, value }),
  
  share: (resource: string, method: 'url' | 'whatsapp' | 'email' | 'social') =>
    trackEvent('share', { resource, method }),
  
  // Error tracking
  error: (message: string, context?: string) =>
    trackEvent('error', { message, context }),
  
  // Page view (for SPA navigation)
  pageView: (path: string, title: string) =>
    trackEvent('page_view', { path, title }),
}

/**
 * Initialize analytics on app load
 */
export function initAnalytics(): void {
  if (typeof window === 'undefined') return
  
  // Track initial page view
  Analytics.pageView(window.location.pathname, document.title)
  
  // Track navigation changes (for SPA)
  let lastPath = window.location.pathname
  const observer = new MutationObserver(() => {
    if (window.location.pathname !== lastPath) {
      lastPath = window.location.pathname
      Analytics.pageView(lastPath, document.title)
    }
  })
  
  observer.observe(document, { subtree: true, childList: true })
  
  // Track outbound links
  document.addEventListener('click', (e) => {
    const target = e.target as Element | null
    const link = target?.closest('a[href^="http"]') as HTMLAnchorElement | null
    if (link && !link.href.startsWith(window.location.origin)) {
      Analytics.navClick(link.textContent?.trim() || 'external_link', link.href)
    }
  })
  
  // Track file downloads
  document.addEventListener('click', (e) => {
    const target = e.target as Element | null
    const link = target?.closest('a[download], a[href$=".pdf"], a[href$=".doc"], a[href$=".xls"]') as HTMLAnchorElement | null
    if (link) {
      const href = link.getAttribute('href') || ''
      Analytics.pdfDownload(href.split('/').pop() || 'unknown_file')
    }
  })
}

/**
 * Get analytics consent status
 */
export function hasAnalyticsConsent(): boolean {
  if (typeof window === 'undefined') return false
  return localStorage.getItem('analytics_consent') === 'granted'
}

/**
 * Set analytics consent
 */
export function setAnalyticsConsent(granted: boolean): void {
  if (typeof window === 'undefined') return
  localStorage.setItem('analytics_consent', granted ? 'granted' : 'denied')
  
  if (granted) {
    initAnalytics()
  }
}