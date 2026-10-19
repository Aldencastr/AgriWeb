import { useState, useEffect } from 'react'
import { carreraRef, onValue } from '../services/firebase'
import { normalizeCareerData } from '../data/normalizeCareerData'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import Hero from '../components/sections/Hero'
import Stats from '../components/sections/Stats'
import Perfil from '../components/sections/Perfil'
import Carousel from '../components/sections/Carousel'
import Videos from '../components/sections/Videos'
import PerfilEgresado from '../components/sections/PerfilEgresado'
import Laboratorios from '../components/sections/Laboratorios'
import Proyectos from '../components/sections/Proyectos'
import Noticias from '../components/sections/Noticias'
import PlanEstudios from '../components/sections/PlanEstudios'
import Testimonios from '../components/sections/Testimonios'
import Admision from '../components/sections/Admision'
import FAQ from '../components/sections/FAQ'
import Contacto from '../components/sections/Contacto'

const VIEW_IDS = new Set([
    'inicio',
    'nosotros',
    'carrera',
    'plan-estudios',
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

function App() {
    const [data, setData] = useState(() => normalizeCareerData())
    const [connectionState, setConnectionState] = useState('loading')
    const [activeView, setActiveView] = useState(getViewFromHash)

    useEffect(() => {
        if (!('IntersectionObserver' in window)) {
            document.querySelectorAll('.reveal').forEach((el) => el.classList.add('revealed'))
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
        document.querySelectorAll('.reveal').forEach((el) => observer.observe(el))
        return () => observer.disconnect()
    }, [activeView, data])

    useEffect(() => {
        const handleInternalNavigation = (event) => {
            const target = event.target
            if (!(target instanceof Element)) return

            const link = target.closest('a[href^="#"]')
            if (!link) return

            const viewId = link.getAttribute('href').slice(1)
            if (!VIEW_IDS.has(viewId)) return

            event.preventDefault()
            window.history.pushState(null, '', `#${viewId}`)
            setActiveView(viewId)
            window.scrollTo({ top: 0, behavior: 'smooth' })
        }
        const handleHistoryNavigation = () => {
            setActiveView(getViewFromHash())
            window.scrollTo({ top: 0, behavior: 'smooth' })
        }

        document.addEventListener('click', handleInternalNavigation)
        window.addEventListener('popstate', handleHistoryNavigation)
        return () => {
            document.removeEventListener('click', handleInternalNavigation)
            window.removeEventListener('popstate', handleHistoryNavigation)
        }
    }, [])

    useEffect(() => {
        let unsubscribe = () => {}

        try {
            unsubscribe = onValue(
                carreraRef,
                (snapshot) => {
                    if (!snapshot.exists()) {
                        setData(normalizeCareerData())
                        setConnectionState('warning')
                        return
                    }

                    setData(normalizeCareerData(snapshot.val()))
                    setConnectionState('connected')
                },
                (error) => {
                    console.error('Error al conectar con Firebase:', error)
                    setData(normalizeCareerData())
                    setConnectionState('warning')
                }
            )
        } catch (error) {
            console.error('No se pudo iniciar la conexión con Firebase:', error)
            setData(normalizeCareerData())
            setConnectionState('warning')
        }

        return () => unsubscribe()
    }, [])

    const renderActiveView = () => {
        switch (activeView) {
            case 'nosotros':
                return <Perfil items={data.perfil_valor} />
            case 'carrera':
                return <Videos videos={data.videos} />
            case 'plan-estudios':
                return <PlanEstudios />
            case 'testimonios':
                return <Testimonios items={data.testimonios || data.resenas} />
            case 'contacto':
                return <Contacto contacto={data.contacto} />
            case 'carrusel':
                return <Carousel items={data.carrusel} />
            case 'perfil-egresado':
                return <PerfilEgresado />
            case 'laboratorios':
                return <Laboratorios items={data.laboratorios} />
            case 'proyectos':
                return <Proyectos items={data.proyectos} />
            case 'noticias':
                return <Noticias items={data.noticias} />
            case 'admision':
                return <Admision />
            case 'faq':
                return <FAQ />
            case 'inicio':
            default:
                return (
                    <>
                        <Hero
                            slogan={data.slogan}
                            descripcion={data.descripcion}
                            slides={data.carrusel_hero}
                        />
                        <Stats />
                    </>
                )
        }
    }

    return (
        <>
            <a className="skip-link" href="#inicio">Saltar al contenido principal</a>
            <Navbar nombre={data.nombre} activeView={activeView} />
            <main className="active-view" key={activeView}>
                {renderActiveView()}
            </main>
            {activeView === 'contacto' && <Footer connectionState={connectionState} />}
        </>
    )
}

export default App