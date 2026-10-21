import { z } from 'zod'

// Contact form wizard steps
export const contactStep1Schema = z.object({
  userType: z.enum(['aspirante', 'padre', 'empresa', 'otro'], {
    required_error: 'Selecciona tu perfil',
  }),
})

export const contactStep2Schema = z.object({
  nombre: z.string().min(2, 'El nombre debe tener al menos 2 caracteres').max(100),
  email: z.string().email('Email inválido'),
  telefono: z.string().min(8, 'Teléfono inválido').max(20).optional(),
  departamento: z.string().min(1, 'Selecciona tu departamento').optional(),
  municipio: z.string().min(1, 'Selecciona tu municipio').optional(),
  anioBachillerato: z.string().optional(),
})

export const contactStep3Schema = z.object({
  intereses: z.array(z.string()).min(1, 'Selecciona al menos un área de interés'),
})

export const contactStep4Schema = z.object({
  mensaje: z.string().min(10, 'El mensaje debe tener al menos 10 caracteres').max(2000),
  archivo: z.instanceof(File).optional().nullable(),
})

export const contactStep5Schema = z.object({
  consentimiento: z.literal(true, {
    required_error: 'Debes aceptar la política de privacidad',
  }),
  suscripcion: z.boolean().default(false),
})

export const contactFormSchema = contactStep1Schema
  .merge(contactStep2Schema)
  .merge(contactStep3Schema)
  .merge(contactStep4Schema)
  .merge(contactStep5Schema)

export type ContactFormData = z.infer<typeof contactFormSchema>

// Testimonio form
export const testimonioSchema = z.object({
  nombre: z.string().min(2, 'El nombre debe tener al menos 2 caracteres').max(100),
  rol: z.string().max(100).default('Estudiante'),
  texto: z.string().min(10, 'La reseña debe tener al menos 10 caracteres').max(2000),
})

export type TestimonioFormData = z.infer<typeof testimonioSchema>

// Calculadora de Riego
export const calculadoraRiegoSchema = z.object({
  tipoRiego: z.enum(['goteo', 'aspersion', 'pivote', 'gravedad']),
  caudal: z.number().positive('El caudal debe ser mayor a 0').max(1000),
  tiempoRiego: z.number().positive('El tiempo debe ser mayor a 0').max(24),
  areaRegada: z.number().positive('El área debe ser mayor a 0').max(10000),
  tipoSuelo: z.enum(['arenoso', 'franco', 'arcilloso']),
  ecAgua: z.number().min(0).max(5).default(0.5),
  cultivo: z.string().optional(),
  precioEnergia: z.number().min(0).optional(),
  eficienciaBomba: z.number().min(0.1).max(1).default(0.75),
})

export type CalculadoraRiegoData = z.infer<typeof calculadoraRiegoSchema>

// Test de Perfil
export const testPerfilSchema = z.object({
  respuestas: z.array(z.number().min(1).max(5)).length(12),
})

export type TestPerfilData = z.infer<typeof testPerfilSchema>

// Plan de estudios filters
export const planEstudiosFiltersSchema = z.object({
  search: z.string().optional(),
  anio: z.enum(['todos', '1', '2', '3', '4', '5']).default('todos'),
})

export type PlanEstudiosFilters = z.infer<typeof planEstudiosFiltersSchema>

// Newsletter subscription
export const newsletterSchema = z.object({
  email: z.string().email('Email inválido'),
  intereses: z.array(z.string()).optional(),
})

export type NewsletterData = z.infer<typeof newsletterSchema>

// Generic validation helper
export function validateData<T>(schema: z.ZodSchema<T>, data: unknown): { success: true; data: T } | { success: false; errors: z.ZodError } {
  const result = schema.safeParse(data)
  if (result.success) {
    return { success: true, data: result.data }
  }
  return { success: false, errors: result.error }
}

// Field-level validation for react-hook-form
export function getFieldError<T>(error: z.ZodError | null, field: string): string | undefined {
  if (!error) return undefined
  const fieldError = error.errors.find((e) => e.path.join('.') === field)
  return fieldError?.message
}