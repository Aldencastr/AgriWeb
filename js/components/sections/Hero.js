import { esc } from '../../utils/dom.js'

function Hero({ slogan, descripcion, slides = [] }) {
    Hero.slideItems = Array.isArray(slides) ? slides : Object.values(slides || {})
    const hasSlides = Hero.slideItems.length > 0
    const currentSlide = hasSlides ? Hero.slideItems[Hero.index || 0] || {} : {}

    return `
        <section id="inicio" class="hero" aria-label="Carrusel principal">
            <div class="hero-carousel" style="transform: ${hasSlides ? `translateX(-${(Hero.index || 0) * 100}%)` : 'none'}">
                ${hasSlides ? Hero.slideItems.map((slide) => `
                    <div
                        class="hero-slide"
                        aria-hidden="true"
                        style="background-image: ${slide.imagen ? `url(&quot;${esc(slide.imagen)}&quot;)` : 'linear-gradient(135deg, rgba(15, 23, 42, 0.75), rgba(4, 120, 87, 0.55))'}"
                    ></div>`).join('') : ''}
            </div>
            <div class="hero-overlay"></div>

            <button class="hero-btn hero-prev" data-action="hero-prev" ${hasSlides ? '' : 'disabled'} aria-label="Diapositiva anterior">&#10094;</button>
            <button class="hero-btn hero-next" data-action="hero-next" ${hasSlides ? '' : 'disabled'} aria-label="Siguiente diapositiva">&#10095;</button>

            ${hasSlides ? `
            <div class="hero-dots" role="group" aria-label="Seleccionar diapositiva">
                ${Hero.slideItems.map((_, i) => `
                    <button
                        class="hero-dot ${i === (Hero.index || 0) ? 'active' : ''}"
                        data-action="hero-dot"
                        data-index="${i}"
                        aria-label="Diapositiva ${i + 1}"
                        aria-current="${i === (Hero.index || 0) ? 'true' : undefined}"
                        type="button"
                    ></button>`).join('')}
            </div>` : ''}

            <div class="hero-content">
                <span class="badge">Carrera Universitaria de Vanguardia</span>
                <h1>${esc(currentSlide.titulo || slogan || 'Ingeniería Agrícola')}</h1>
                <p>${esc(currentSlide.descripcion || descripcion || 'Diseña soluciones sostenibles para el campo combinando ingeniería, tecnología y ciencias agrícolas.')}</p>
                <div class="hero-buttons">
                    <a href="#plan-estudios" class="btn btn-primary">
                        Ver Plan de Estudios <i class="fa-solid fa-arrow-down"></i>
                    </a>
                    <button class="btn btn-secondary" data-action="open-inscripcion">
                        Contacto <i class="fa-solid fa-envelope"></i>
                    </button>
                </div>
            </div>
        </section>
    `
}

Hero.slideItems = []
Hero.index = 0
Hero.intervalRef = null

/** Configura autoplay, pausa por hover/foco y transición de fade. Se llama tras cada render. */
Hero.init = (root) => {
    if (Hero.timer) {
        clearInterval(Hero.timer)
        Hero.timer = null
    }
    // Limpia listeners previos para no acumularlos en cada render
    Hero.detach?.()
    Hero.detach = null

    const heroSection = root.querySelector('#inicio')
    const hasSlides = Hero.slideItems.length >= 2

    if (heroSection && hasSlides) {
        const stopAuto = () => {
            clearInterval(Hero.timer)
            Hero.timer = null
        }
        const startAuto = () => {
            if (Hero.timer) return
            Hero.timer = setInterval(() => {
                if (document.hidden) return
                go(Hero.index + 1)
            }, 5000)
        }

        const onPointerEnter = () => stopAuto()
        const onPointerLeave = () => startAuto()
        const onFocusIn = () => stopAuto()
        const onFocusOut = () => {
            if (!heroSection.contains(document.activeElement)) startAuto()
        }
        const onVisibility = () => {
            if (document.hidden) stopAuto()
            else startAuto()
        }

        heroSection.addEventListener('pointerenter', onPointerEnter)
        heroSection.addEventListener('pointerleave', onPointerLeave)
        heroSection.addEventListener('focusin', onFocusIn)
        heroSection.addEventListener('focusout', onFocusOut)
        document.addEventListener('visibilitychange', onVisibility)

        Hero.detach = () => {
            heroSection.removeEventListener('pointerenter', onPointerEnter)
            heroSection.removeEventListener('pointerleave', onPointerLeave)
            heroSection.removeEventListener('focusin', onFocusIn)
            heroSection.removeEventListener('focusout', onFocusOut)
            document.removeEventListener('visibilitychange', onVisibility)
        }
        if (!window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) startAuto()
    }
}

function go(index) {
    const len = Hero.slideItems.length
    if (!len) return
    Hero.index = ((index % len) + len) % len
    // El rerender lo ejecuta app.js con el callback registered
    Hero.onChange?.()
}

export const heroPrev = () => go(Hero.index - 1)
export const heroNext = () => go(Hero.index + 1)
export const heroDot = (index) => go(index)

export default Hero
