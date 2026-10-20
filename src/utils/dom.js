/**
 * Utilidades DOM para React.
 * En React/JSX el escaping es automático, estas funciones son para compatibilidad.
 */

/**
 * En React no es necesario escapar - JSX lo hace automáticamente.
 * Se mantiene para compatibilidad con código legado.
 */
export function esc(value) {
  return String(value ?? '')
}

/**
 * Convierte un valor (array u objeto) en array.
 */
export function toValues(value) {
  if (Array.isArray(value)) return value
  if (value && typeof value === 'object' && !Array.isArray(value)) return Object.values(value)
  return []
}

export function toArray(value) {
  return toValues(value).filter((item) => item && typeof item === 'object')
}