import { useState } from 'react'

const FACEBOOK_PRECISION_VIDEO_URL = 'https://www.facebook.com/watch/?v=1078303833234809'
const FACEBOOK_IRRIGATION_VIDEO_URL = 'https://www.facebook.com/share/v/1K5cEdwy93/'

function normalizeVideoText(value = '') {
    return value
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLocaleLowerCase()
}

function getFacebookVideoDetails(video) {
    const normalizedTitle = normalizeVideoText(video.titulo)
    const url = video.url || ''

    if (normalizedTitle.includes('agricultura de precision') || url.includes('1078303833234809')) {
        return {
            title: 'Conoce sobre nuestra carrera',
            description: 'Conoce la carrera de Ingeniería Agrícola y su aporte al desarrollo del sector agropecuario.',
            url: FACEBOOK_PRECISION_VIDEO_URL,
            contentType: 'Presentación institucional'
        }
    }

    if (
        normalizedTitle.includes('riego sostenible') ||
        normalizedTitle.includes('sistemas de riego inteligente') ||
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

    return normalizedTitle.includes('riego sostenible') ||
        normalizedTitle.includes('sistemas de riego inteligente')
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
    const values = Array.isArray(videos) ? videos : Object.values(videos || {})
    const [playingIndex, setPlayingIndex] = useState(null)

    return (
        <section id="carrera" className="section bg-light">
            <div className="container">
                <div className="section-title reveal">
                    <h2>Descubre la Carrera</h2>
                    <p>Explora en video las áreas de especialización, tecnologías aplicadas y proyectos de campo de Ingeniería Agrícola.</p>
                </div>
                <div className="videos-grid">
                    {values.length === 0 && <div className="card-loading">Próximamente habrá contenido disponible.</div>}
                    {values.map((video, i) => {
                        const facebookDetails = getFacebookVideoDetails(video)
                        const isSustainableIrrigation = isSustainableIrrigationVideo(video.titulo) ||
                            Boolean(facebookDetails && facebookDetails.title === 'Agrícola la mejor')
                        const title = facebookDetails?.title || video.titulo || 'Video informativo'
                        const description = facebookDetails?.description || video.descripcion || ''
                        const videoId = typeof video.id === 'string' && /^[\w-]{11}$/.test(video.id) ? video.id : null
                        const thumbnailUrl = videoId
                            ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
                            : null
                        const embedUrl = videoId
                            ? `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1`
                            : null
                        const externalUrl = isSustainableIrrigation
                            ? facebookDetails?.url || FACEBOOK_IRRIGATION_VIDEO_URL
                            : facebookDetails?.url || video.url || `https://www.youtube.com/results?search_query=${encodeURIComponent(title)}`
                        const platform = video.plataforma || (
                            externalUrl.includes('facebook.com') ? 'Facebook Video' : 'YouTube'
                        )
                        const isFacebookVideo = Boolean(facebookDetails) || platform === 'Facebook Video' || externalUrl.includes('facebook.com')
                        const contentType = facebookDetails?.contentType || getVideoContentType(video)

                        return (
                            <div className="video-card reveal" key={i}>
                                {isFacebookVideo ? (
                                    <a
                                        className="video-placeholder video-placeholder-facebook"
                                        href={externalUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label={`Ver ${title} en Facebook`}
                                    >
                                        <i className="fa-brands fa-facebook" aria-hidden="true"></i>
                                        <span>Ver video en Facebook</span>
                                    </a>
                                ) : videoId ? (
                                    playingIndex === i ? (
                                        <iframe
                                            src={embedUrl}
                                            title={title}
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen
                                            loading="lazy"
                                        />
                                    ) : (
                                        <div
                                            className="video-lite-embed"
                                            onClick={() => setPlayingIndex(i)}
                                            role="button"
                                            tabIndex={0}
                                            aria-label={`Reproducir: ${title}`}
                                            onKeyDown={(e) => e.key === 'Enter' && setPlayingIndex(i)}
                                        >
                                            <img
                                                src={thumbnailUrl}
                                                alt={title}
                                                loading="lazy"
                                                width="480"
                                                height="360"
                                            />
                                            <div className="play-button">
                                                <i className="fa-brands fa-youtube"></i>
                                            </div>
                                        </div>
                                    )
                                ) : (
                                    <a
                                        className="video-placeholder"
                                        href={externalUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <i className="fa-brands fa-youtube"></i>
                                        <span>Ver en YouTube</span>
                                    </a>
                                )}
                                <div className="video-info">
                                    <h3>{title}</h3>
                                    <p>{description}</p>
                                    <div className="video-meta">
                                        <span className="video-badge video-badge-category"><i className="fa-solid fa-film" aria-hidden="true"></i> {contentType}</span>
                                        <span className={`video-badge ${isFacebookVideo ? 'video-badge-facebook' : 'video-badge-youtube'}`}>
                                            <i className={`fa-brands ${isFacebookVideo ? 'fa-facebook' : 'fa-youtube'}`} aria-hidden="true"></i>
                                            {isFacebookVideo ? 'Facebook Video' : platform}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}

export default Videos