import { esc, toArray } from '../../utils/dom.js'

const state = { currentIndex: 0, removeResize: null }

function Carousel({ items = [], titulo = 'Destacados', descripcion = 'Descubre los proyectos, laboratorios y logros de Ingeniería Agrícola.' }) {
    const values = toArray(items)
    if (values.length === 0) return ''
    if (state.currentIndex >= values.length) state.currentIndex = 0

    return `
        <section id="carrusel" class="section bg-light">
            <div class="container">
                <div class="section-title reveal">
                    <h2>${esc(titulo)}</h2>
                    <p>${esc(descripcion)}</p>
                </div>
                <div class="carousel" aria-label="Carrusel de destacados">
                    <button class="carousel-btn carousel-prev" data-action="carousel-prev" aria-label="Diapositiva anterior">&#10094;</button>
                    <div class="carousel-track-wrapper" style="overflow: hidden;">
                        <div class="carousel-track" data-carousel-track>
                            ${values.map((item) => `
                                <div class="carousel-slide">
                                    <img
                                        src="${esc(item.imagen)}"
                                        alt="${esc(item.titulo || '')}"
                                        loading="lazy"
                                    />
                                    <div class="carousel-slide-content">
                                        <h3>${esc(item.titulo || 'Destacado')}</h3>
                                        <p>${esc(item.descripcion || '')}</p>
                                        <div class="tags">
                                            ${(item.tags || []).map((tag) => `<span class="tag">${esc(tag)}</span>`).join('')}
                                        </div>
                                    </div>
                                </div>`).join('')}
                        </div>
                    </div>
                    <button class="carousel-btn carousel-next" data-action="carousel-next" aria-label="Siguiente diapositiva">&#10095;</button>
                    <div class="carousel-dots">
                        ${values.map((_, i) => `
                            <button
                                class="carousel-dot ${i === state.currentIndex ? 'active' : ''}"
                                data-action="carousel-dot"
                                data-index="${i}"
                                aria-label="Diapositiva ${i + 1}"
                                aria-current="${i === state.currentIndex ? 'true' : undefined}"
                                type="button"
                            />`).join('')}
                    </div>
                </div>
            </div>
        </section>
    `
}

function getSlideWidth(track) {
    return track?.querySelector('.carousel-slide')?.getBoundingClientRect().width || 0
}

function applyTransform(track) {
    if (track) track.style.transform = `translateX(-${state.currentIndex * getSlideWidth(track)}px)`
}

export function updateCarouselDots(root) {
    root.querySelectorAll('.carousel-dot').forEach((dot, i) => {
        dot.classList.toggle('active', i === state.currentIndex)
        if (i === state.currentIndex) dot.setAttribute('aria-current', 'true')
        else dot.removeAttribute('aria-current')
    })
}

export function carouselPrev() {
    const track = document.querySelector('[data-carousel-track]')
    const count = track?.querySelectorAll('.carousel-slide').length || 0
    if (!count) return
    state.currentIndex = (state.currentIndex - 1 + count) % count
    applyTransform(track)
    updateCarouselDots(document)
}

export function carouselNext() {
    const track = document.querySelector('[data-carousel-track]')
    const count = track?.querySelectorAll('.carousel-slide').length || 0
    if (!count) return
    state.currentIndex = (state.currentIndex + 1) % count
    applyTransform(track)
    updateCarouselDots(document)
}

export function carouselDot(index) {
    const track = document.querySelector('[data-carousel-track]')
    state.currentIndex = Math.max(0, index)
    applyTransform(track)
    updateCarouselDots(document)
}

export function initCarousel(root) {
    const track = root.querySelector('[data-carousel-track]')
    if (!track) return () => {}

    applyTransform(track)
    const onResize = () => applyTransform(track)
    window.addEventListener('resize', onResize)

    return () => window.removeEventListener('resize', onResize)
}

export default Carousel
