import { demoData } from './demoData.js'

function isRecord(value) {
    return value !== null && typeof value === 'object' && !Array.isArray(value)
}

function toArray(value, fallback) {
    const collection = Array.isArray(value) || isRecord(value) ? value : fallback
    if (Array.isArray(collection)) return collection
    return isRecord(collection) ? Object.values(collection) : []
}

function normalizeText(value, fallback = '') {
    if (typeof value === 'string') return value.trim()
    if (typeof value === 'number' && Number.isFinite(value)) return String(value)
    return fallback
}

function normalizeItems(value, fallback, fields) {
    return toArray(value, fallback)
        .filter(isRecord)
        .map((item) => ({
            ...item,
            ...Object.fromEntries(
                fields.map((field) => [field, normalizeText(item[field])])
            )
        }))
}

export function normalizeCareerData(value) {
    const source = isRecord(value) ? value : {}
    const heroSlides = normalizeItems(source.carrusel_hero, demoData.carrusel_hero, [
        'imagen',
        'titulo',
        'descripcion'
    ])
    const contact = isRecord(source.contacto) ? source.contacto : {}

    return {
        ...demoData,
        ...source,
        nombre: typeof source.nombre === 'string' && source.nombre.trim()
            ? source.nombre.trim()
            : demoData.nombre,
        slogan: typeof source.slogan === 'string' && source.slogan.trim()
            ? source.slogan.trim()
            : demoData.slogan,
        descripcion: typeof source.descripcion === 'string' && source.descripcion.trim()
            ? source.descripcion.trim()
            : demoData.descripcion,
        contacto: {
            ...demoData.contacto,
            ...Object.fromEntries(
                Object.keys(demoData.contacto).map((field) => [
                    field,
                    normalizeText(contact[field], demoData.contacto[field])
                ])
            )
        },
        perfil_valor: toArray(source.perfil_valor, demoData.perfil_valor)
            .filter((item) => typeof item === 'string')
            .map((item) => item.trim())
            .filter(Boolean),
        carrusel_hero: heroSlides.length ? heroSlides : demoData.carrusel_hero,
        carrusel: normalizeItems(source.carrusel, demoData.carrusel, [
            'imagen',
            'titulo',
            'descripcion'
        ]).map((item) => ({
            ...item,
            tags: toArray(item.tags, []).filter((tag) => typeof tag === 'string')
        })),
        videos: normalizeItems(source.videos, demoData.videos, [
            'id',
            'titulo',
            'descripcion',
            'canal',
            'tipoContenido',
            'plataforma',
            'url'
        ]),
        testimonios: normalizeItems(
            source.testimonios ?? source.resenas,
            demoData.testimonios,
            ['nombre', 'rol', 'texto', 'imagen']
        ),
        noticias: normalizeItems(source.noticias, demoData.noticias, [
            'imagen',
            'categoria',
            'titulo',
            'descripcion',
            'url'
        ]),
        proyectos: normalizeItems(source.proyectos, demoData.proyectos, [
            'titulo',
            'imagen',
            'descripcion'
        ]),
        laboratorios: normalizeItems(source.laboratorios, demoData.laboratorios, [
            'nombre',
            'imagen',
            'descripcion'
        ])
    }
}
