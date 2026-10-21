// SEO service - Dynamic meta tags and JSON-LD structured data

import type { SEOProps } from '@/lib/types'
import { getSiteData } from './data.service'

// Default SEO configuration
const DEFAULT_SEO: SEOProps = {
  title: 'Ingeniería Agrícola | Universidad Nacional de Ingeniería',
  description: 'Conoce el plan de estudios, laboratorios, proyectos y oportunidades de admisión de Ingeniería Agrícola en la UNI.',
  canonical: 'https://agriweb.example.com',
  ogImage: '/images/og-default.jpg',
  ogType: 'website',
  twitterCard: 'summary_large_image',
}

// In-memory cache for meta tags
let currentMeta: SEOProps = DEFAULT_SEO

export function setSEO(props: Partial<SEOProps>): void {
  if (typeof window === 'undefined') return
  
  currentMeta = { ...DEFAULT_SEO, ...props }
  updateMetaTags(currentMeta)
  injectJsonLd(currentMeta.jsonLd)
}

export function resetSEO(): void {
  setSEO(DEFAULT_SEO)
}

function updateMetaTags(seo: SEOProps): void {
  const { title, description, canonical, ogImage, ogType, twitterCard, noIndex, noFollow } = seo
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://agriweb.example.com'
  const fullImageUrl = ogImage?.startsWith('http') ? ogImage : `${siteUrl}${ogImage}`
  const fullCanonical = canonical?.startsWith('http') ? canonical : `${siteUrl}${canonical}`

  // Update or create meta tags
  updateTag('title', title)
  updateTag('meta', 'name', 'description', description)
  updateTag('link', 'rel', 'canonical', fullCanonical)
  
  // Open Graph
  updateTag('meta', 'property', 'og:site_name', 'Ingeniería Agrícola')
  updateTag('meta', 'property', 'og:title', title)
  updateTag('meta', 'property', 'og:description', description)
  updateTag('meta', 'property', 'og:type', ogType || 'website')
  updateTag('meta', 'property', 'og:url', fullCanonical)
  updateTag('meta', 'property', 'og:image', fullImageUrl)
  updateTag('meta', 'property', 'og:locale', 'es_NI')
  
  // Twitter
  updateTag('meta', 'name', 'twitter:card', twitterCard || 'summary_large_image')
  updateTag('meta', 'name', 'twitter:title', title)
  updateTag('meta', 'name', 'twitter:description', description)
  updateTag('meta', 'name', 'twitter:image', fullImageUrl)
  
  // Robots
  if (noIndex || noFollow) {
    const robots = [
      noIndex ? 'noindex' : 'index',
      noFollow ? 'nofollow' : 'follow',
    ].join(', ')
    updateTag('meta', 'name', 'robots', robots)
  } else {
    removeTag('meta', 'name', 'robots')
  }
}

function updateTag(
  tag: 'title',
  attr: string,
  key?: never,
  content?: never
): void
function updateTag(
  tag: 'meta' | 'link',
  attr: 'name' | 'property' | 'rel',
  key: string,
  content: string
): void
function updateTag(
  tag: 'title' | 'meta' | 'link',
  attr: string,
  key?: string,
  content?: string
): void {
  if (tag === 'title') {
    document.title = attr
    return
  }
  
  let element = document.querySelector(`${tag}[${attr}="${key}"]`) as HTMLMetaElement | HTMLLinkElement | null
  
  if (!element) {
    element = document.createElement(tag) as HTMLMetaElement | HTMLLinkElement
    element.setAttribute(attr, key as string)
    document.head.appendChild(element)
  }
  
  if (tag === 'meta') {
    element.setAttribute('content', content as string)
  } else if (tag === 'link') {
    element.setAttribute('href', content as string)
  }
}

function removeTag(tag: 'meta' | 'link', attr: 'name' | 'property' | 'rel', key: string): void {
  const element = document.querySelector(`${tag}[${attr}="${key}"]`)
  if (element) element.remove()
}

function injectJsonLd(jsonLd?: Record<string, unknown>): void {
  if (typeof window === 'undefined') return
  
  // Remove existing JSON-LD
  const existing = document.querySelector('script[type="application/ld+json"][data-seo]')
  if (existing) existing.remove()
  
  if (!jsonLd) return
  
  const script = document.createElement('script')
  script.type = 'application/ld+json'
  script.setAttribute('data-seo', 'true')
  script.textContent = JSON.stringify(jsonLd)
  document.head.appendChild(script)
}

// Predefined JSON-LD schemas
export const JsonLdSchemas = {
  organization: (siteUrl: string) => ({
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    name: 'Universidad Nacional de Ingeniería - Ingeniería Agrícola',
    alternateName: 'Ingeniería Agrícola UNI',
    url: siteUrl,
    logo: `${siteUrl}/images/logo.jpeg`,
    sameAs: [
      'https://www.facebook.com/share/1dButcyaSK/?mibextid=wwXIfr',
      'https://www.instagram.com/unen_aneia',
      'https://www.tiktok.com/@unen_aneia',
    ],
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Recinto Universitario Pedro Aráuz Palacios',
      addressLocality: 'Managua',
      addressCountry: 'NI',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+505-8685-5972',
      contactType: 'admissions',
      availableLanguage: 'Spanish',
    },
  }),

  webSite: (siteUrl: string) => ({
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Ingeniería Agrícola UNI',
    url: siteUrl,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${siteUrl}/plan-estudios?search={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  }),

  course: (planName: string, siteUrl: string) => ({
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: planName,
    description: 'Plan de estudios de Ingeniería Agrícola - Universidad Nacional de Ingeniería',
    provider: {
      '@type': 'EducationalOrganization',
      name: 'Universidad Nacional de Ingeniería',
      url: siteUrl,
    },
    hasCourseInstance: {
      '@type': 'CourseInstance',
      courseMode: 'presencial',
      courseWorkload: 'P10Y', // 5 years
      location: {
        '@type': 'Place',
        name: 'Recinto Universitario Pedro Aráuz Palacios (UNI-RUPAP)',
        address: {
          '@type': 'PostalAddress',
          addressCountry: 'NI',
        },
      },
    },
  }),

  faqPage: (faqs: Array<{ question: string; answer: string }>) => ({
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }),

  breadcrumb: (items: Array<{ name: string; url: string }>) => ({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }),
}

// Generate SEO for specific pages
export function generatePageSEO(page: string, data?: Record<string, unknown>): SEOProps {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://agriweb.example.com'
  const basePath = page.startsWith('/') ? page : `/${page}`
  
  const pageConfigs: Record<string, Partial<SEOProps>> = {
    '/': {
      title: 'Ingeniería Agrícola | Universidad Nacional de Ingeniería',
      description: 'Cultivamos innovación para alimentar el futuro. Conoce la carrera de Ingeniería Agrícola en la UNI: plan de estudios, laboratorios, proyectos y admisión.',
      jsonLd: {
        ...JsonLdSchemas.organization(siteUrl),
        ...JsonLdSchemas.webSite(siteUrl),
      },
    },
    '/nosotros': {
      title: 'Nosotros | Ingeniería Agrícola UNI',
      description: 'Conoce la facultad, misión, visión, valores y autoridades de Ingeniería Agrícola en la Universidad Nacional de Ingeniería.',
      jsonLd: JsonLdSchemas.organization(siteUrl),
    },
    '/carrera': {
      title: 'Descubre la Carrera | Ingeniería Agrícola UNI',
      description: 'Qué es la Ingeniería Agrícola moderna: gestión hídrica, maquinaria de precisión, geomática, agricultura digital y sostenibilidad.',
      jsonLd: JsonLdSchemas.course('Ingeniería Agrícola', siteUrl),
    },
    '/plan-estudios': {
      title: 'Plan de Estudios 2026 | Ingeniería Agrícola UNI',
      description: 'Malla curricular completa: 5 años, 10 semestres, asignaturas por año, prácticas profesionales, optativas y modalidades.',
      jsonLd: JsonLdSchemas.course('Plan de Estudios 2026 - Ingeniería Agrícola', siteUrl),
    },
    '/ingenieros': {
      title: 'Ingenieros Especializados | Ingeniería Agrícola UNI',
      description: 'Conoce a nuestros docentes e investigadores: perfiles, especialidades, publicaciones y experiencia en el sector agropecuario.',
    },
    '/testimonios': {
      title: 'Reseñas y Testimonios | Ingeniería Agrícola UNI',
      description: 'Experiencias de estudiantes y egresados de Ingeniería Agrícola. Opiniones reales sobre la carrera, prácticas y campo laboral.',
    },
    '/simuladores': {
      title: 'Simuladores Interactivos | Ingeniería Agrícola UNI',
      description: 'Calculadora de eficiencia de riego y test de perfil profesional. Herramientas gratuitas para futuros ingenieros agrícolas.',
    },
    '/simuladores/calculadora-riego': {
      title: 'Calculadora de Eficiencia de Riego | Ingeniería Agrícola UNI',
      description: 'Calcula eficiencia de aplicación, lámina neta/bruta, volumen y costo de riego. Para goteo, aspersión, pivote y gravedad.',
    },
    '/simuladores/test-perfil': {
      title: 'Test de Perfil Profesional Agrícola | Ingeniería Agrícola UNI',
      description: 'Descubre tu afinidad con las áreas de la Ingeniería Agrícola: agua, maquinaria, datos, GIS, ambiente o emprendimiento.',
    },
    '/admision': {
      title: 'Admisión y Prematrícula | Ingeniería Agrícola UNI',
      description: 'Proceso de admisión, fechas de examen, requisitos, guía de estudio, becas y modalidades (presencial y UNICAM semipresencial).',
    },
    '/contacto': {
      title: 'Contacto | Ingeniería Agrícola UNI',
      description: 'Formulario de contacto, ubicación, teléfono, email y redes sociales de Ingeniería Agrícola en la UNI.',
    },
  }
  
  const config = pageConfigs[basePath] || {}
  
  return {
    ...DEFAULT_SEO,
    ...config,
    canonical: `${siteUrl}${basePath}`,
    ogImage: config.ogImage || '/images/og-default.jpg',
  }
}