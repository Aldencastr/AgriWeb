// Application constants and configuration

export const ROUTES = {
  HOME: '/',
  NOSOTROS: '/nosotros',
  CARRERA: '/carrera',
  PLAN_ESTUDIOS: '/plan-estudios',
  INGENIEROS: '/ingenieros',
  TESTIMONIOS: '/testimonios',
  SIMULADORES: '/simuladores',
  CALCULADORA_RIEGO: '/simuladores/calculadora-riego',
  TEST_PERFIL: '/simuladores/test-perfil',
  ADMISION: '/admision',
  CONTACTO: '/contacto',
  GRACIAS: '/gracias',
  BLOG: '/blog',
} as const

export const NAV_ITEMS = [
  { href: ROUTES.HOME, label: 'Inicio', icon: 'home' },
  { href: ROUTES.NOSOTROS, label: 'Nosotros', icon: 'users' },
  { href: ROUTES.CARRERA, label: 'Descubre la Carrera', icon: 'graduation-cap' },
  { href: ROUTES.PLAN_ESTUDIOS, label: 'Plan de Estudios', icon: 'book-open' },
  { href: ROUTES.INGENIEROS, label: 'Ingenieros', icon: 'user-check' },
  { href: ROUTES.TESTIMONIOS, label: 'Reseñas', icon: 'star' },
  { href: ROUTES.SIMULADORES, label: 'Simuladores', icon: 'calculator' },
] as const

export const FOOTER_QUICK_LINKS = [
  { href: ROUTES.HOME, label: 'Inicio' },
  { href: ROUTES.NOSOTROS, label: 'Nosotros' },
  { href: ROUTES.CARRERA, label: 'Descubre la Carrera' },
  { href: ROUTES.PLAN_ESTUDIOS, label: 'Plan de Estudios' },
  { href: ROUTES.INGENIEROS, label: 'Ingenieros Especializados' },
  { href: ROUTES.TESTIMONIOS, label: 'Reseñas' },
  { href: ROUTES.CONTACTO, label: 'Contacto' },
] as const

export const FOOTER_RESOURCES = [
  { href: ROUTES.ADMISION, label: 'Proceso de Prematrícula' },
  { href: '/laboratorios', label: 'Laboratorios' },
  { href: '/proyectos', label: 'Proyectos' },
  { href: '/noticias', label: 'Noticias' },
  { href: '/faq', label: 'Preguntas Frecuentes' },
  { href: '/carrusel', label: 'Galería fotográfica' },
  { href: '/perfil-egresado', label: 'Perfil del egresado' },
] as const

export const SOCIAL_LINKS = [
  {
    name: 'Facebook',
    url: 'https://www.facebook.com/share/1dButcyaSK/?mibextid=wwXIfr',
    icon: 'facebook',
  },
  {
    name: 'Instagram',
    url: 'https://www.instagram.com/unen_aneia?psln=MWgyMnowMWVvYndnYw==',
    icon: 'instagram',
  },
  {
    name: 'TikTok',
    url: 'https://www.tiktok.com/@unen_aneia?_r=1&_t=ZS-9AfTn1U8Ucf',
    icon: 'tiktok',
  },
] as const

export const CAMPUS_LOCATION = {
  name: 'Recinto Universitario Pedro Aráuz Palacios (UNI-RUPAP)',
  latitude: 12.13832,
  longitude: -86.22397,
  coordinatesLabel: '12.13832° N, -86.22397° O',
} as const

export const MAP_URLS = {
  search: `https://www.google.com/maps/search/?api=1&query=${CAMPUS_LOCATION.latitude},${CAMPUS_LOCATION.longitude}`,
  directions: `https://www.google.com/maps/dir/?api=1&destination=${CAMPUS_LOCATION.latitude},${CAMPUS_LOCATION.longitude}`,
  embed: `https://maps.google.com/maps?q=${CAMPUS_LOCATION.latitude},${CAMPUS_LOCATION.longitude}&output=embed&z=17`,
} as const

export const ACADEMIC_YEARS = [
  { value: '1', label: 'I Año' },
  { value: '2', label: 'II Año' },
  { value: '3', label: 'III Año' },
  { value: '4', label: 'IV Año' },
  { value: '5', label: 'V Año' },
] as const

export const SEMESTERS_PER_YEAR = 2

export const TOAST_DURATION = 5000

export const ANIMATION_DURATION = {
  fast: 150,
  normal: 300,
  slow: 500,
} as const

export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
} as const

export const STORAGE_KEYS = {
  DARK_MODE: 'agriweb-dark-mode',
  TEST_PERFIL_RESULTS: 'agriweb-test-perfil-results',
  CALCULADORA_RIEGO_LAST: 'agriweb-calculadora-riego-last',
  SCROLL_POSITION: 'agriweb-scroll-position',
} as const

export const CONTACT_INTERESTS = [
  { value: 'riego', label: 'Riego y Gestión Hídrica' },
  { value: 'maquinaria', label: 'Maquinaria y Automatización' },
  { value: 'datos', label: 'Datos, GIS y Agricultura de Precisión' },
  { value: 'ambiente', label: 'Ambiente y Sostenibilidad' },
  { value: 'emprendimiento', label: 'Emprendimiento AgTech' },
  { value: 'general', label: 'Información General' },
] as const

export const USER_TYPES = [
  { value: 'aspirante', label: 'Aspirante a la carrera' },
  { value: 'padre', label: 'Padre / Tutor' },
  { value: 'empresa', label: 'Empresa / Institución' },
  { value: 'otro', label: 'Otro' },
] as const