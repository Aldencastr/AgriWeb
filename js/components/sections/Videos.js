import { esc, toValues } from '../../utils/dom.js'

const FACEBOOK_PRECISION_VIDEO_URL = 'https://www.facebook.com/watch/?v=1078303833234809'
const FACEBOOK_IRRIGATION_VIDEO_URL = 'https://www.facebook.com/share/v/1K5cEdwy93/'

function normalizeVideoText(value = '') {
    return value
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLocaleLowerCase()
}

function getFacebookVideoDetails(video) {
    const url = video.url || ''

    if (normalizeVideoText(video.titulo).includes('agricultura de precision') || url.includes('1078303833234809')) {
        return {
            title: 'Conoce sobre nuestra carrera',
            description: 'Conoce la carrera de Ingeniería Agrícola y su aporte al desarrollo del sector agropecuario.',
            url: FACEBOOK_PRECISION_VIDEO_URL,
            contentType: 'Presentación institucional'
        }
    }

    if (
        normalizeVideoText(video.titulo).includes('riego sostenible') ||
        normalizeVideoText(video.titulo).includes('sistemas de riego inteligente') ||
        url.includes('1K5cEdwy93')
    ) {
        return {
            title: 'Agrícola la mejor',
            description: 'Un video institucional para descubrir Ingeniería Agrícola y su aporte al campo.',
            url: FACEBOOK_IRRIGATION_VIDEO_URL,
            contentType: 'Vida universitaria'
        }
    }

    return null
}

function isSustainableIrrigationVideo(title = '') {
    const normalizedTitle = normalizeVideoText(title)
    return normalizedTitle.includes('riego sostenible') || normalizedTitle.includes('sistemas de riego inteligente')
}

function getVideoContentType(video) {
    if (video.tipoContenido) return video.tipoContenido

    const title = normalizeVideoText(video.titulo)

    if (title.includes('precision') || title.includes('tecnologia')) return 'Tecnología'
    if (title.includes('riego') || title.includes('hidraulic')) return 'Riego'
    if (title.includes('maquinaria') || title.includes('mecanizacion')) return 'Maquinaria'
    if (title.includes('proyecto')) return 'Proyecto'
    if (title.includes('laboratorio')) return 'Laboratorio'
    if (title.includes('campo') || title.includes('cultivo')) return 'Campo'
    if (title.includes('que es') || title.includes('introduccion')) return 'Introducción'
    return 'Video informativo'
}

function Videos({ videos = [] }) {
    const values = toValues(videos)
    const playingIndex = Videos.playingIndex

    return `
        <section id="carrera" class="section bg-light">
            <div class="container">
                <div class="section-title reveal">
                    <h2>Descubre la Carrera</h2>
                    <p>Explora en video las áreas de especialización, tecnologías aplicadas y proyectos de campo de Ingeniería Agrícola.</p>
                </div>
                <div class="videos-grid">
                    ${values.length === 0 ? '<div class="card-loading">Próximamente habrá contenido disponible.</div>' : ''}
                    ${values.map((video, i) => {
                        const facebookDetails = getFacebookVideoDetails(video)
                        const isSustainableIrrigation = isSustainableIrrigationVideo(video.titulo) ||
                            Boolean(facebookDetails && facebookDetails.title === 'Agrícola la mejor')
                        const title = facebookDetails?.title || video.titulo || 'Video informativo'
                        const description = facebookDetails?.description || video.descripcion || ''
                        const videoId = typeof video.id === 'string' && /^[\w-]{11}$/.test(video.id) ? video.id : null
                        const thumbnailUrl = videoId ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg` : null
                        const embedUrl = videoId ? `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1` : null
                        const externalUrl = isSustainableIrrigation
                            ? facebookDetails?.url || FACEBOOK_IRRIGATION_VIDEO_URL
                            : facebookDetails?.url || video.url || `https://www.youtube.com/results?search_query=${encodeURIComponent(title)}`
                        const platform = video.plataforma || (externalUrl.includes('facebook.com') ? 'Facebook Video' : 'YouTube')
                        const isFacebookVideo = Boolean(facebookDetails) || platform === 'Facebook Video' || externalUrl.includes('facebook.com')
                        const contentType = facebookDetails?.contentType || getVideoContentType(video)

                        return `
                            <div class="video-card reveal">
                                ${isFacebookVideo ? `
                                    <a
                                        class="video-placeholder video-placeholder-facebook"
                                        href="${esc(externalUrl)}"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label="Ver ${esc(title)} en Facebook"
                                    >
                                        <i class="fa-brands fa-facebook" aria-hidden="true"></i>
                                        <span>Ver video en Facebook</span>
                                    </a>
                                ` : videoId ? (
                                    playingIndex === i ? `
                                        <iframe
                                            src="${esc(embedUrl)}"
                                            title="${esc(title)}"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen
                                            loading="lazy"
                                        ></iframe>
                                    ` : `
                                        <div
                                            class="video-lite-embed"
                                            data-action="play-video"
                                            data-index="${i}"
                                            role="button"
                                            tabindex="0"
                                            aria-label="Reproducir: ${esc(title)}"
                                        >
                                            <img src="${esc(thumbnailUrl)}" alt="${esc(title)}" loading="lazy" width="480" height="360" />
                                            <div class="play-button">
                                                <i class="fa-brands fa-youtube"></i>
                                            </div>
                                        </div>
                                    `) : `
                                    <a class="video-placeholder" href="${esc(externalUrl)}" target="_blank" rel="noopener noreferrer">
                                        <i class="fa-brands fa-youtube"></i>
                                        <span>Ver en YouTube</span>
                                    </a>
                                `}
                                <div class="video-info">
                                    <h3>${esc(title)}</h3>
                                    <p>${esc(description)}</p>
                                    <div class="video-meta">
                                        <span class="video-badge video-badge-category"><i class="fa-solid fa-film" aria-hidden="true"></i> ${esc(contentType)}</span>
                                        <span class="video-badge ${isFacebookVideo ? 'video-badge-facebook' : 'video-badge-youtube'}">
                                            <i class="fa-brands ${isFacebookVideo ? 'fa-facebook' : 'fa-youtube'}" aria-hidden="true"></i>
                                            ${isFacebookVideo ? 'Facebook Video' : esc(platform)}
                                        </span>
                                    </div>
                                </div>
                            </div>`
                    }).join('')}
                </div>
            </div>
        </section>
    `
}

Videos.playingIndex = null

export default Videos
