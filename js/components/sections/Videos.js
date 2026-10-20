import { esc, toValues } from '../../utils/dom.js'

const FACEBOOK_PRECISION_VIDEO_URL = 'https://www.facebook.com/watch/?v=1078303833234809'
const FACEBOOK_IRRIGATION_VIDEO_URL = 'https://www.facebook.com/share/v/1K5cEdwy93/'

// Poster images for the custom video players
const LAB_STUDENTS_POSTER = 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=800&auto=format&fit=crop'
const TRACTOR_GPS_POSTER = 'https://images.unsplash.com/photo-1625246273081-c2639588f444?q=80&w=800&auto=format&fit=crop'

function formatTime(seconds) {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, '0')}`
}

function renderCustomVideoPlayer({ index, title, poster, videoTitle, videoDescription, contentType, externalUrl, isFacebookVideo }) {
    // Duration in seconds for the mock player (e.g., 3:45 = 225s)
    const duration = 225
    const currentTime = 0

    return `
        <div class="custom-video-player" data-player-index="${index}">
            <div class="video-player-wrapper">
                <img
                    class="video-poster"
                    src="${esc(poster)}"
                    alt="${esc(title)} - ${esc(videoTitle)}"
                    loading="lazy"
                    width="480"
                    height="270"
                />
                <div class="video-overlay" data-action="open-external-video" data-url="${esc(externalUrl)}">
                    <div class="video-title-overlay">${esc(title)}</div>
                    <button
                        class="video-play-button"
                        aria-label="Reproducir ${esc(title)}"
                        type="button"
                    >
                        <svg class="play-icon" viewBox="0 0 24 24" width="48" height="48" aria-hidden="true">
                            <path fill="currentColor" d="M8 5v14l11-7z"/>
                        </svg>
                    </button>
                </div>
                <div class="video-controls" role="region" aria-label="Controles de reproducción">
                    <div class="controls-progress">
                        <span class="time-current">${formatTime(currentTime)}</span>
                        <div class="progress-bar" role="slider" aria-label="Progreso del video" aria-valuemin="0" aria-valuemax="${duration}" aria-valuenow="${currentTime}" tabindex="0">
                            <div class="progress-filled" style="width: 0%;"></div>
                            <div class="progress-handle"></div>
                        </div>
                        <span class="time-duration">${formatTime(duration)}</span>
                    </div>
                    <div class="controls-right">
                        <button class="control-btn volume-btn" aria-label="Silenciar" type="button">
                            <svg class="volume-icon" viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
                                <path fill="currentColor" d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z"/>
                            </svg>
                        </button>
                        <div class="volume-slider" role="slider" aria-label="Volumen" aria-valuemin="0" aria-valuemax="1" aria-valuenow="1" tabindex="0">
                            <div class="volume-filled" style="width: 100%;"></div>
                        </div>
                        <button class="control-btn fullscreen-btn" aria-label="Pantalla completa" type="button">
                            <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
                                <path fill="currentColor" d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"/>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `
}

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

                        // Check if this is one of the two Facebook videos we want to replace with custom players
                        const isPrecisionVideo = facebookDetails?.title === 'Conoce sobre nuestra carrera'
                        const isIrrigationVideo = facebookDetails?.title === 'Agrícola la mejor'

                        let videoPlayerHtml = ''

                        if (isPrecisionVideo) {
                            // Left card: Custom video player - students in modern lab
                            videoPlayerHtml = renderCustomVideoPlayer({
                                index: i,
                                title: 'Video Explicativo 1',
                                poster: LAB_STUDENTS_POSTER,
                                videoTitle: title,
                                videoDescription: description,
                                contentType: contentType,
                                externalUrl: externalUrl,
                                isFacebookVideo: true
                            })
                        } else if (isIrrigationVideo) {
                            // Middle card: Custom video player - tractor with GPS field work
                            videoPlayerHtml = renderCustomVideoPlayer({
                                index: i,
                                title: 'Video Explicativo 2',
                                poster: TRACTOR_GPS_POSTER,
                                videoTitle: title,
                                videoDescription: description,
                                contentType: contentType,
                                externalUrl: externalUrl,
                                isFacebookVideo: true
                            })
                        } else if (isFacebookVideo) {
                            videoPlayerHtml = `
                                <a
                                    class="video-placeholder video-placeholder-facebook"
                                    href="${esc(externalUrl)}"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="Ver ${esc(title)} en Facebook"
                                >
                                    <i class="fa-brands fa-facebook" aria-hidden="true"></i>
                                    <span>Ver video en Facebook</span>
                                </a>`
                        } else if (videoId) {
                            videoPlayerHtml = playingIndex === i ? `
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
                            `
                        } else {
                            videoPlayerHtml = `
                                <a class="video-placeholder" href="${esc(externalUrl)}" target="_blank" rel="noopener noreferrer">
                                    <i class="fa-brands fa-youtube"></i>
                                    <span>Ver en YouTube</span>
                                </a>`
                        }

                        return `
                            <div class="video-card reveal">
                                ${videoPlayerHtml}
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
