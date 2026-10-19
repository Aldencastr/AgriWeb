/**
 * Devuelve una URL de asset compatible con el `base` configurado en Vite.
 * Necesario para que las rutas de `public/` referenciadas desde JS/CSS
 * funcionen tanto en el servidor de desarrollo ('/') como en GitHub
 * Pages ('/AgriWeb/'), ya que Vite no reescribe rutas absolutas en runtime.
 */
export default function assetUrl(path) {
    const clean = String(path).replace(/^\/+/, '')
    const base = import.meta.env.BASE_URL.replace(/\/+$/, '')
    return `${base}/${clean}`
}
