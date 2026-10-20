import React, { useState, useRef, useEffect } from 'react'
import { toValues } from '../../utils/dom'

const FACEBOOK_PRECISION_VIDEO_URL = 'https://www.facebook.com/watch/?v=1078303833234809'
const FACEBOOK_IRRIGATION_VIDEO_URL = 'https://www.facebook.com/share/v/1K5cEdwy93/'

const LAB_STUDENTS_POSTER = 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=800&auto=format&fit=crop'
const TRACTOR_GPS_POSTER = 'https://images.unsplash.com/photo-1625246273081-c2639588f444?q=80&w=800&auto=format&fit=crop'

export function formatTime(seconds) {
  const mins = Math.floor(seconds / 60)
  const secs = Math.floor(seconds % 60)
  return `${mins}:${secs.toString().padStart(2, '0')}`
}

function normalizeVideoText(value = '') {
  return value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase()
}

function getFacebookVideoDetails(video) {
  const url = video.url || ''

  if (normalizeVideoText(video.titulo).includes('agricultura de precision') || url.includes('1078303833234809')) {
    return {
      title: 'Conoce sobre nuestra carrera',
      description: 'Conoce la carrera de Ingeniería Agrícola y su aporte al desarrollo del sector agropecuario.',
      url: FACEBOOK_PRECISION_VIDEO_URL,
      contentType: 'Presentación institucional',
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
      contentType: 'Vida universitaria',
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

function CustomVideoPlayer({ index, title, poster, videoTitle, videoDescription, contentType, externalUrl, isFacebookVideo }) {
  const [showControls, setShowControls] = useState(false)
  const duration = 225
  const [currentTime, setCurrentTime] = useState(0)
  const progressRef = useRef(null)

  const handleProgressClick = (e) => {
    if (!progressRef.current) return
    const rect = progressRef.current.getBoundingClientRect()
    const percent = (e.clientX - rect.left) / rect.width
    setCurrentTime(Math.floor(percent * duration))
  }

  const openExternal = () => {
    if (externalUrl) window.open(externalUrl, '_blank', 'noopener,noreferrer')
  }

  return (
    <div className="custom-video-player" data-player-index={index} onMouseEnter={() => setShowControls(true)} onMouseLeave={() => setShowControls(false)}>
      <div className="video-player-wrapper" onClick={openExternal}>
        <img
          className="video-poster"
          src={poster}
          alt={`${title} - ${videoTitle}`}
          loading="lazy"
          width="480"
          height="270"
        />
        <div className="video-overlay" onClick={openExternal}>
          <div className="video-title-overlay">{title}</div>
          <button className="video-play-button" aria-label={`Reproducir ${title}`} type="button">
            <svg className="play-icon" viewBox="0 0 24 24" width="48" height="48" aria-hidden="true">
              <path fill="currentColor" d="M8 5v14l11-7z" />
            </svg>
          </button>
        </div>
        <div className={`video-controls ${showControls ? 'visible' : ''}`} role="region" aria-label="Controles de reproducción">
          <div className="controls-progress">
            <span className="time-current">{formatTime(currentTime)}</span>
            <div
              className="progress-bar"
              role="slider"
              aria-label="Progreso del video"
              aria-valuemin={0}
              aria-valuemax={duration}
              aria-valuenow={currentTime}
              tabIndex={0}
              ref={progressRef}
              onClick={handleProgressClick}
            >
              <div className="progress-filled" style={{ width: `${(currentTime / duration) * 100}%` }} />
              <div className="progress-handle" style={{ left: `${(currentTime / duration) * 100}%` }} />
            </div>
            <span className="time-duration">{formatTime(duration)}</span>
          </div>
          <div className="controls-right">
            <button className="control-btn volume-btn" aria-label="Silenciar" type="button">
              <svg className="volume-icon" viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
                <path fill="currentColor" d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z" />
              </svg>
            </button>
            <div className="volume-slider" role="slider" aria-label="Volumen" aria-valuemin={0} aria-valuemax={1} aria-valuenow={1} tabIndex={0}>
              <div className="volume-filled" style={{ width: '100%' }} />
            </div>
            <button className="control-btn fullscreen-btn" aria-label="Pantalla completa" type="button">
              <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
                <path fill="currentColor" d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Videos({ videos = [] }) {
  const values = toValues(videos)
  const [playingIndex, setPlayingIndex] = useState(null)

  return (
    <section id="carrera" className="section bg-light">
      <div className="container">
        <div className="section-title reveal">
          <h2>Descubre la Carrera</h2>
          <p>Explora en video las áreas de especialización, tecnologías aplicadas y proyectos de campo de Ingeniería Agrícola.</p>
        </div>
        <div className="videos-grid">
          {values.length === 0 ? (
            <div className="card-loading">Próximamente habrá contenido disponible.</div>
          ) : (
            values.map((video, i) => {
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

              const isPrecisionVideo = facebookDetails?.title === 'Conoce sobre nuestra carrera'
              const isIrrigationVideo = facebookDetails?.title === 'Agrícola la mejor'

              let videoPlayer = null

              if (isPrecisionVideo) {
                videoPlayer = (
                  <CustomVideoPlayer
                    key={i}
                    index={i}
                    title="Video Explicativo 1"
                    poster={LAB_STUDENTS_POSTER}
                    videoTitle={title}
                    videoDescription={description}
                    contentType={contentType}
                    externalUrl={externalUrl}
                    isFacebookVideo={true}
                  />
                )
              } else if (isIrrigationVideo) {
                videoPlayer = (
                  <CustomVideoPlayer
                    key={i}
                    index={i}
                    title="Video Explicativo 2"
                    poster={TRACTOR_GPS_POSTER}
                    videoTitle={title}
                    videoDescription={description}
                    contentType={contentType}
                    externalUrl={externalUrl}
                    isFacebookVideo={true}
                  />
                )
              } else if (isFacebookVideo) {
                videoPlayer = (
                  <a
                    key={i}
                    className="video-placeholder video-placeholder-facebook"
                    href={externalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Ver ${title} en Facebook`}
                  >
                    <i className="fa-brands fa-facebook" aria-hidden="true" />
                    <span>Ver video en Facebook</span>
                  </a>
                )
              } else if (videoId) {
                if (playingIndex === i) {
                  videoPlayer = (
                    <iframe
                      key={i}
                      src={embedUrl}
                      title={title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      loading="lazy"
                    />
                  )
                } else {
                  videoPlayer = (
                    <div
                      key={i}
                      className="video-lite-embed"
                      onClick={() => setPlayingIndex(i)}
                      role="button"
                      tabIndex={0}
                      aria-label={`Reproducir: ${title}`}
                    >
                      <img src={thumbnailUrl} alt={title} loading="lazy" width="480" height="360" />
                      <div className="play-button">
                        <i className="fa-brands fa-youtube" aria-hidden="true" />
                      </div>
                    </div>
                  )
                }
              } else {
                videoPlayer = (
                  <a
                    key={i}
                    className="video-placeholder"
                    href={externalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="fa-brands fa-youtube" aria-hidden="true" />
                    <span>Ver en YouTube</span>
                  </a>
                )
              }

              return (
                <div key={i} className="video-card reveal">
                  {videoPlayer}
                  <div className="video-info">
                    <h3>{title}</h3>
                    <p>{description}</p>
                    <div className="video-meta">
                      <span className="video-badge video-badge-category"><i className="fa-solid fa-film" aria-hidden="true" /> {contentType}</span>
                      <span className={`video-badge ${isFacebookVideo ? 'video-badge-facebook' : 'video-badge-youtube'}`}>
                        <i className={`fa-brands ${isFacebookVideo ? 'fa-facebook' : 'fa-youtube'}`} aria-hidden="true" />
                        {isFacebookVideo ? 'Facebook Video' : platform}
                      </span>
                    </div>
                  </div>
                </div>
              )
            })
          )}
        </div>
      </div>
    </section>
  )
}