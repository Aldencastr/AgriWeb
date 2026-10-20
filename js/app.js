import { carreraRef, onValue, auth, onAuthStateChanged } from './services/firebase.js'
import { normalizeCareerData } from './data/normalizeCareerData.js'
import Navbar from './components/layout/Navbar.js'
import Footer from './components/layout/Footer.js'
import Hero, { heroPrev, heroNext, heroDot } from './components/sections/Hero.js'
import renderStats, { initStats } from './components/sections/Stats.js'
import renderPerfil from './components/sections/Perfil.js'
import Carousel, { carouselPrev, carouselNext, carouselDot, initCarousel } from './components/sections/Carousel.js'
import Videos from './components/sections/Videos.js'
import renderPerfilEgresado from './components/sections/PerfilEgresado.js'
import Laboratorios from './components/sections/Laboratorios.js'
import Proyectos from './components/sections/Proyectos.js'
import Noticias from './components/sections/Noticias.js'
import PlanEstudios, { initPlanEstudios, planReset, planClearSearch } from './components/sections/PlanEstudios.js'
import Ingenieros from './components/sections/Ingenieros.js'
import Testimonios, {
    createTestimoniosState,
    getTestimoniosState,
    submitTestimonios,
    handleTestimoniosLogout,
    handleTestimoniosLogin
} from './components/sections/Testimonios.js'
import renderAdmision from './components/sections/Admision.js'
import FAQ, { faqToggle } from './components/sections/FAQ.js'
import Contacto, { createContactoState, submitContacto } from './components/sections/Contacto.js'
import { closeLoginModal, loginSwitch } from './components/modals/LoginModal.js'
import { openInscripcionModal, closeInscripcionModal } from './components/modals/InscripcionModal.js'

const VIEW_IDS = new Set([
    'inicio',
    'nosotros',
    'carrera',
    'plan-estudios',
    'ingenieros',
    'testimonios',
    'contacto',
    'carrusel',
    'perfil-egresado',
    'laboratorios',
    'proyectos',
    'noticias',
    'admision',
    'faq'
])

function getViewFromHash() {
    const viewId = window.location.hash.slice(1)
    return VIEW_IDS.has(viewId) ? viewId : 'inicio'
}

function getInitialDarkMode() {
    try {
        const savedPreference = window.localStorage.getItem('darkMode')
        if (savedPreference !== null) return savedPreference === 'true'
    } catch (error) {
        console.warn('No se pudo leer la preferencia de tema guardada:', error)
    }
    return window.matchMedia?.('(prefers-color-scheme: dark)').matches ?? false
}

const state = {
    data: normalizeCareerData(),
    connectionState: 'loading',
    activeView: getViewFromHash(),
    menuOpen: false,
    darkMode: getInitialDarkMode(),
    scrolled: false,
    user: null
}

let cleanupView = null

/* ── Render ─────────────────────────────────────────────── */

function updateNavbar() {
    document.getElementById('app-navbar').innerHTML = Navbar({
        nombre: state.data.nombre,
        activeView: state.activeView,
        menuOpen: state.menuOpen,
        darkMode: state.darkMode
    })
    document.querySelector('.navbar')?.classList.toggle('navbar-scrolled', state.scrolled)
}

function renderMain() {
    cleanupView?.()
    cleanupView = null

    const root = document.getElementById('app-main')

    root.innerHTML = `<main class="active-view">${renderActiveView()}</main>${state.activeView === 'contacto' ? Footer(state.connectionState) : ''}`
    attachViewInteractivity(root)
    setupReveal(root)
    updateScrollState()
}

function renderActiveView() {
    switch (state.activeView) {
        case 'nosotros':
            return renderPerfil(state.data.perfil_valor)
        case 'carrera':
            return Videos({ videos: state.data.videos })
        case 'plan-estudios':
            return PlanEstudios()
        case 'ingenieros':
            return Ingenieros({ items: state.data.ingenieros })
        case 'testimonios':
            return Testimonios({
                items: state.data.testimonios || state.data.resenas,
                user: state.user,
                ...getTestimoniosState()
            })
        case 'contacto':
            return Contacto({ contacto: state.data.contacto })
        case 'carrusel':
            return Carousel({ items: state.data.carrusel })
        case 'perfil-egresado':
            return renderPerfilEgresado()
        case 'laboratorios':
            return Laboratorios({ items: state.data.laboratorios })
        case 'proyectos':
            return Proyectos({ items: state.data.proyectos })
        case 'noticias':
            return Noticias({ items: state.data.noticias })
        case 'admision':
            return renderAdmision()
        case 'faq':
            return FAQ()
        case 'inicio':
        default:
            return `
                ${Hero({ slogan: state.data.slogan, descripcion: state.data.descripcion, slides: state.data.carrusel_hero })}
                ${renderStats()}
            `
    }
}

function attachViewInteractivity(root) {
    if (state.activeView === 'inicio') {
        Hero.init(root)
        Hero.onChange = () => renderMain()
        cleanupView = initStats(root)
    } else if (state.activeView === 'carrusel') {
        cleanupView = initCarousel(root)
    } else if (state.activeView === 'plan-estudios') {
        cleanupView = initPlanEstudios(root)
    } else if (state.activeView === 'laboratorios') {
        Laboratorios.setLabs(state.data.laboratorios)
    }
}

/* ── Animación de aparición (reveal) ────────────────────── */

function setupReveal(root) {
    if (!('IntersectionObserver' in window)) {
        root.querySelectorAll('.reveal').forEach((el) => el.classList.add('revealed'))
        return
    }
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed')
                    observer.unobserve(entry.target)
                }
            })
        },
        { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    )
    root.querySelectorAll('.reveal').forEach((el) => observer.observe(el))
}

/* ── Barra de progreso, botón volver arriba y navbar ───── */

function updateScrollState() {
    const max = document.documentElement.scrollHeight - window.innerHeight
    const progress = max > 0 ? (window.scrollY / max) * 100 : 0
    const bar = document.querySelector('.scroll-progress')
    if (bar) bar.style.width = `${progress}%`

    const backToTop = document.querySelector('.back-to-top')
    if (backToTop) backToTop.classList.toggle('show', window.scrollY > 400)

    const navbar = document.querySelector('.navbar')
    if (navbar) {
        const isScrolled = window.scrollY > 12
        if (isScrolled !== state.scrolled) {
            state.scrolled = isScrolled
            navbar.classList.toggle('navbar-scrolled', isScrolled)
        }
    }
}

/* ── navegación ─────────────────────────────────────────── */

function navigate(viewId) {
    state.activeView = viewId
    state.menuOpen = false
    updateNavbar()
    renderMain()
    window.scrollTo({ top: 0, behavior: 'smooth' })
}

/* ── Acciones delegadas ─────────────────────────────────── */

document.addEventListener('click', (event) => {
    const target = event.target

    // Navegación interna por anclas (incluye skip-link)
    const link = target.closest?.('a[href^="#"]')
    if (link) {
        const viewId = link.getAttribute('href').slice(1)
        if (VIEW_IDS.has(viewId)) {
            event.preventDefault()
            window.history.pushState(null, '', `#${viewId}`)
            navigate(viewId)
            return
        }
    }

    const actionEl = target.closest?.('[data-action]')
    if (!actionEl) return
    const action = actionEl.dataset.action
    const testimonios = getTestimoniosState()

    switch (action) {
        case 'toggle-menu':
            state.menuOpen = !state.menuOpen
            updateNavbar()
            break
        case 'close-menu':
            if (state.menuOpen) {
                state.menuOpen = false
                updateNavbar()
            }
            break
        case 'toggle-dark':
            state.darkMode = !state.darkMode
            document.documentElement.classList.toggle('dark', state.darkMode)
            try {
                window.localStorage.setItem('darkMode', String(state.darkMode))
            } catch (error) {
                console.warn('No se pudo guardar la preferencia de tema:', error)
            }
            updateNavbar()
            break
        case 'hero-prev': heroPrev(); break
        case 'hero-next': heroNext(); break
        case 'hero-dot': heroDot(Number(actionEl.dataset.index)); break
        case 'carousel-prev': carouselPrev(); break
        case 'carousel-next': carouselNext(); break
        case 'carousel-dot': carouselDot(Number(actionEl.dataset.index)); break
        case 'play-video': {
            const video = (Array.isArray(state.data.videos) ? state.data.videos : Object.values(state.data.videos || {}))[Number(actionEl.dataset.index)]
            const videoId = typeof video?.id === 'string' && /^[\w-]{11}$/.test(video.id) ? video.id : null
            if (videoId) {
                actionEl.outerHTML = `
                    <iframe
                        src="https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1"
                        title="Video"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        loading="lazy"
                    ></iframe>
                `
            } else if (video?.url) {
                window.open(video.url, '_blank', 'noopener,noreferrer')
            }
            break
        }
        case 'lab-open':
            Laboratorios.open(Number(actionEl.dataset.index))
            break
        case 'lab-close':
            Laboratorios.close()
            break
        case 'faq-toggle':
            faqToggle(Number(actionEl.dataset.index))
            break
        case 'open-inscripcion':
            openInscripcionModal()
            break
        case 'testimonios-login':
            if (state.activeView === 'testimonios') handleTestimoniosLogin()
            break
        case 'testimonios-logout':
            if (state.activeView === 'testimonios') {
                handleTestimoniosLogout().then(() => renderMain())
            }
            break
        case 'testimonios-toggle-form':
            if (state.activeView === 'testimonios') {
                testimonios.showForm = !testimonios.showForm
                renderMain()
            }
            break
        case 'login-switch':
            loginSwitch()
            break
        case 'plan-reset':
            planReset()
            break
        case 'plan-clear-search':
            planClearSearch()
            break
        default:
            break
    }
})

// Lightbox de laboratorios: clic en el fondo y teclado
document.addEventListener('click', (e) => {
    if (e.target?.classList?.contains('lightbox')) Laboratorios.close()
})
document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && e.target?.classList?.contains('lab-card')) {
        Laboratorios.open(Number(e.target.dataset.index))
    }
})

// Cerrar superposiciones y menú
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        if (state.menuOpen) {
            state.menuOpen = false
            updateNavbar()
        }
        closeLoginModal()
        closeInscripcionModal()
        Laboratorios.close()
    }
})
document.addEventListener('click', (e) => {
    if (!state.menuOpen) return
    if (!e.target.closest?.('[data-nav-container]')) {
        state.menuOpen = false
        updateNavbar()
        e.stopPropagation()
    }
})

// Envío de formularios
document.addEventListener('submit', async (e) => {
    if (e.target.id === 'review-form') {
        e.preventDefault()
        const testimonios = getTestimoniosState()
        const form = e.target
        testimonios.newReview = {
            nombre: form.querySelector('#review-nombre').value,
            rol: form.querySelector('#review-rol').value,
            texto: form.querySelector('#review-texto').value
        }
        await submitTestimonios(state.user)
        renderMain()
    } else if (e.target.id === 'contact-form') {
        e.preventDefault()
        await submitContacto()
        renderMain()
    }
})

window.addEventListener('popstate', () => navigate(getViewFromHash()))
window.addEventListener('hashchange', () => navigate(getViewFromHash()))
window.addEventListener('scroll', updateScrollState, { passive: true })
window.addEventListener('resize', updateScrollState)

/* ── Arranque ───────────────────────────────────────────── */

document.documentElement.classList.toggle('dark', state.darkMode)

createTestimoniosState()
createContactoState()
updateNavbar()
renderMain()
updateScrollState()
Hero.onChange = () => renderMain()

// Datos en tiempo real desde Firebase
try {
    onValue(
        carreraRef,
        (snapshot) => {
            if (!snapshot.exists()) {
                state.data = normalizeCareerData()
                state.connectionState = 'warning'
            } else {
                state.data = normalizeCareerData(snapshot.val())
                state.connectionState = 'connected'
            }
            updateNavbar()
            renderMain()
            updateScrollState()
        },
        (error) => {
            console.error('Error al conectar con Firebase:', error)
            state.data = normalizeCareerData()
            state.connectionState = 'warning'
            updateNavbar()
            renderMain()
            updateScrollState()
        }
    )
} catch (error) {
    console.error('No se pudo iniciar la conexión con Firebase:', error)
    state.connectionState = 'warning'
}

// Sesión de Firebase Auth
onAuthStateChanged(
    auth,
    (user) => {
        state.user = user
        if (state.activeView === 'testimonios') renderMain()
    },
    (error) => {
        console.error('Error al verificar la sesión:', error)
        const testimonios = getTestimoniosState()
        testimonios.submitError = true
        testimonios.submitStatus = 'No se pudo verificar la sesión. Inténtalo nuevamente.'
        if (state.activeView === 'testimonios') renderMain()
    }
)
