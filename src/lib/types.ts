// Shared type definitions

export interface SiteData {
  nombre: string
  slogan: string
  descripcion: string
  perfil_valor: string[]
  contacto: {
    facultad: string
    correo: string
    telefono: string
    ubicacion: string
    instituciones: string
  }
  carrusel_hero: HeroSlide[]
  carrusel: CarouselItem[]
  videos: VideoItem[]
  testimonios: Testimonio[]
  noticias: Noticia[]
  proyectos: Proyecto[]
  laboratorios: Laboratorio[]
  ingenieros: Ingeniero[]
}

export interface HeroSlide {
  imagen: string
  titulo: string
  descripcion: string
}

export interface CarouselItem {
  imagen: string
  titulo: string
  descripcion: string
  tags: string[]
}

export interface VideoItem {
  id: string
  titulo: string
  descripcion: string
  canal: string
  tipoContenido: string
  plataforma: 'YouTube' | 'Facebook Video' | 'Otro'
  url: string
  thumbnail?: string
}

export interface Testimonio {
  id?: string
  nombre: string
  rol: string
  texto: string
  imagen?: string
  uid?: string
  creadoEn: number
}

export interface Noticia {
  id?: string
  imagen?: string
  categoria: string
  titulo: string
  descripcion: string
  url?: string
  creadoEn?: number
}

export interface Proyecto {
  id?: string
  titulo: string
  imagen?: string
  descripcion: string
  creadoEn?: number
}

export interface Laboratorio {
  nombre: string
  imagen?: string
  descripcion: string
}

export interface Ingeniero {
  id?: string
  imagen?: string
  nombre: string
  rol: string
  biografia: string
}

export interface PlanEstudios {
  universidad: string
  carrera: string
  plan: string
  modalidades: Modalidad[]
  anios: Anio[]
}

export interface Modalidad {
  nombre: string
  descripcion: string
}

export interface Anio {
  numero: number
  nombre: string
  semestres: Semestre[]
}

export interface Semestre {
  numero: number
  nombre: string
  asignaturas: Asignatura[]
  optativas?: Optativa[]
}

export interface Asignatura {
  codigo: string
  nombre: string
  tipo?: 'regular' | 'practica'
  creditos?: number
  horas?: number
  prerrequisitos?: string[]
}

export interface Optativa {
  nombre: string
  opciones: Asignatura[]
}

export interface CalculadoraRiegoResult {
  eficienciaAplicacion: number
  clasificacion: 'Excelente' | 'Buena' | 'Regular' | 'Mala'
  laminaNeta: number
  laminaBruta: number
  volumenTotal: number
  costoEstimado?: number
  profundidadHumedecimiento: number
  requerimientoLavado: number
  laminaNetaAjustada: number
}

export interface TestPerfilResult {
  scores: Record<string, number>
  topRoles: Array<{
    rol: string
    match: number
    descripcion: string
    habilidades: string[]
    asignaturasClave: string[]
  }>
  radarData: Array<{ axis: string; value: number }>
}

export interface SEOProps {
  title: string
  description: string
  canonical?: string
  ogImage?: string
  ogType?: 'website' | 'article'
  twitterCard?: 'summary' | 'summary_large_image'
  noIndex?: boolean
  noFollow?: boolean
  jsonLd?: Record<string, unknown>
}

export interface SimuladorState<T> {
  data: T | null
  loading: boolean
  error: string | null
  lastUpdated: number | null
}

export interface Toast {
  id: string
  type: 'success' | 'error' | 'warning' | 'info'
  title: string
  message: string
  duration?: number
  action?: {
    label: string
    onClick: () => void
  }
}

export interface SocialLink {
  name: string
  url: string
  icon: string
}

export interface CampusLocation {
  name: string
  latitude: number
  longitude: number
  coordinatesLabel: string
  mapsUrl: string
  directionsUrl: string
  embedUrl: string
}

export interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  description?: string
  children: React.ReactNode
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
}

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive'
  size?: 'sm' | 'md' | 'lg' | 'icon'
  loading?: boolean
  asChild?: boolean
}

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'bordered' | 'elevated' | 'outlined'
  padding?: 'none' | 'sm' | 'md' | 'lg'
  hover?: boolean
}

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  hint?: string
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
}

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  error?: string
  hint?: string
  options: Array<{ value: string; label: string }>
  placeholder?: string
}

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  error?: string
  hint?: string
}