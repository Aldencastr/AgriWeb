/**
 * Escapa texto para inserción segura en plantillas HTML.
 */
export function esc(value) {
    return String(value ?? '')
        .replaceAll('&', '&amp;')
        .replaceAll('<', '&lt;')
        .replaceAll('>', '&gt;')
        .replaceAll('"', '&quot;')
        .replaceAll("'", '&#39;')
}

/**
 * Convierte un valor (array u objeto) en array, filtrando no-objetos.
 */
export function toValues(value) {
    if (Array.isArray(value)) return value
    if (value && typeof value === 'object' && !Array.isArray(value)) return Object.values(value)
    return []
}

export function toArray(value) {
    return toValues(value).filter((item) => item && typeof item === 'object')
}
