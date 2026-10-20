import React, { useState, useEffect, useCallback, useRef } from 'react'
import { HashRouter as Router, Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Hero from './components/sections/Hero'
import Stats from './components/sections/Stats'
import Perfil from './components/sections/Perfil'
import Carousel from './components/sections/Carousel'
import Videos from './components/sections/Videos'
import PerfilEgresado from './components/sections/PerfilEgresado'
import Laboratorios from './components/sections/Laboratorios'
import Proyectos from './components/sections/Proyectos'
import Noticias from './components/sections/Noticias'
import PlanEstudios from './components/sections/PlanEstudios'
import Testimonios from './components/sections/Testimonios'
import Admision from './components/sections/Admision'
import FAQ from './components/sections/FAQ'
import Contacto from './components/sections/Contacto'
import Ingenieros from './components/sections/Ingenieros'
import LoginModal from './components/modals/LoginModal'
import InscripcionModal from './components/modals/InscripcionModal'
import { normalizeCareerData } from './data/normalizeCareerData'
import { onAuthStateChanged, signOut as firebaseSignOut } from './services/firebase'
import { useToast } from './hooks/useToast'

// Vista de inicio que compone las secciones
function InicioView({ data, state, actions }) {
  return (
    <>
      <Hero 
        slogan={data.slogan} 
        descripcion={data.descripcion} 
        slides={data.carrusel_hero} 
        onInscripcionOpen={actions.openInscripcionModal}
      />
      <Stats />
      <Perfil items={data.perfil_valor} />
      <Carousel items={data.carrusel} />
      <Videos videos={data.videos} />
      <PerfilEgresado />
      <Laboratorios items={data.laboratorios} />
      <Proyectos items={data.proyectos} />
      <Noticias items={data.noticias} />
      <PlanEstudios />
      <Testimonios 
        items={data.testimonios} 
        user={state.firebaseUser}
        onLogin={actions.handleTestimoniosLogin}
        onLogout={actions.handleTestimoniosLogout}
        showForm={state.testimoniosShowForm}
        onToggleForm={actions.toggleTestimoniosForm}
        newReview={state.testimoniosNewReview}
        setNewReview={actions.setTestimoniosNewReview}
        submitting={state.testimoniosSubmitting}
      />
      <Contacto contacto={data.contacto} />
      <Admision />
      <FAQ />
      <Ingenieros items={data.ingenieros} />
    </>
  )
}

// Vista de sección individual (para deep linking si se necesita)
function SectionView({ section, data, state, actions }) {
  const components = {
    inicio: <InicioView data={data} state={state} actions={actions} />,
    nosotros: <Perfil items={data.perfil_valor} />,
    carrera: <Videos videos={data.videos} />,
    'plan-estudios': <PlanEstudios />,
    ingenieros: <Ingenieros items={data.ingenieros} />,
    testimonios: (
      <Testimonios 
        items={data.testimonios} 
        user={state.firebaseUser}
        onLogin={actions.handleTestimoniosLogin}
        onLogout={actions.handleTestimoniosLogout}
        showForm={state.testimoniosShowForm}
        onToggleForm={actions.toggleTestimoniosForm}
        newReview={state.testimoniosNewReview}
        setNewReview={actions.setTestimoniosNewReview}
        submitting={state.testimoniosSubmitting}
      />
    ),
    contacto: <Contacto contacto={data.contacto} />,
    admision: <Admision />,
    faq: <FAQ />,
  }
  
  return components[section] || components.inicio
}

function App() {
  // Estado global
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [firebaseUser, setFirebaseUser] = useState(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode')
    return saved ? JSON.parse(saved) : false
  })
  const [scrolled, setScrolled] = useState(false)
  
  // Estado para Testimonios
  const [testimoniosShowForm, setTestimoniosShowForm] = useState(false)
  const [testimoniosNewReview, setTestimoniosNewReview] = useState({
    nombre: '',
    rol: '',
    texto: '',
    rating: 5
  })
  const [testimoniosSubmitting, setTestimoniosSubmitting] = useState(false)
  
  // Toast
  const { toasts, addToast } = useToast()
  
  // Referencias para modales
  const loginModalRef = useRef(null)
  const inscripcionModalRef = useRef(null)
  
  const navigate = useNavigate()
  const location = useLocation()

  // Cargar datos iniciales
  useEffect(() => {
    const normalizedData = normalizeCareerData()
    setData(normalizedData)
    setLoading(false)
  }, [])

  // Dark mode effect
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
    localStorage.setItem('darkMode', JSON.stringify(darkMode))
  }, [darkMode])

  // Scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Firebase Auth listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged((user) => {
      setFirebaseUser(user)
    })
    return () => unsubscribe()
  }, [])

  // Acciones
  const toggleMenu = useCallback(() => setMenuOpen(prev => !prev), [])
  const closeMenu = useCallback(() => setMenuOpen(false), [])
  
  const toggleDarkMode = useCallback(() => setDarkMode(prev => !prev), [])
  
  const handleTestimoniosLogin = useCallback(() => {
    loginModalRef.current?.open()
  }, [])
  
  const handleTestimoniosLogout = useCallback(async () => {
    try {
      await firebaseSignOut()
      setTestimoniosShowForm(false)
      addToast({ type: 'success', title: 'Sesión cerrada', message: 'Has cerrado sesión correctamente' })
    } catch (err) {
      addToast({ type: 'error', title: 'Error', message: 'No se pudo cerrar sesión' })
    }
  }, [addToast])
  
  const toggleTestimoniosForm = useCallback(() => setTestimoniosShowForm(prev => !prev), [])
  
  const setTestimoniosNewReviewField = useCallback((field, value) => {
    setTestimoniosNewReview(prev => ({ ...prev, [field]: value }))
  }, [])
  
  const openInscripcionModal = useCallback(() => {
    inscripcionModalRef.current?.open()
  }, [])
  
  const closeInscripcionModal = useCallback(() => {
    inscripcionModalRef.current?.close()
  }, [])

  // Handlers para el formulario de testimonios
  const handleTestimoniosSubmit = useCallback(async (e) => {
    e.preventDefault()
    // La lógica está en el componente Testimonios
  }, [])

  const actions = {
    toggleMenu,
    closeMenu,
    toggleDarkMode,
    handleTestimoniosLogin,
    handleTestimoniosLogout,
    toggleTestimoniosForm,
    setTestimoniosNewReview: setTestimoniosNewReviewField,
    openInscripcionModal,
    closeInscripcionModal,
  }

  const state = {
    firebaseUser,
    menuOpen,
    darkMode,
    scrolled,
    testimoniosShowForm,
    testimoniosNewReview,
    testimoniosSubmitting,
  }

  if (loading) {
    return (
      <div style={{ 
        minHeight: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        background: '#fafdfb'
      }}>
        <div style={{ 
          width: '48px', 
          height: '48px', 
          border: '4px solid #0d8a5e', 
          borderTopColor: 'transparent',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite'
        }} />
      </div>
    )
  }

  return (
    <Router>
      <div className={`app ${darkMode ? 'dark' : ''} ${menuOpen ? 'menu-open' : ''}`}>
        {/* Scroll progress */}
        <div className="scroll-progress" style={{ width: `${Math.min(100, (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100)}%` }} />
        
        {/* Skip link */}
        <a className="skip-link" href="#main-content">Saltar al contenido principal</a>
        
        {/* Navbar */}
        <Navbar 
          nombre={data?.nombre}
          activeView={location.pathname.slice(1) || 'inicio'}
          menuOpen={menuOpen}
          darkMode={darkMode}
          onToggleMenu={toggleMenu}
          onCloseMenu={closeMenu}
          onToggleDarkMode={toggleDarkMode}
        />
        
        {/* Main content */}
        <main id="main-content" className="main-content">
          <Routes>
            <Route path="/" element={<InicioView data={data} state={state} actions={actions} />} />
            <Route path="/nosotros" element={<SectionView section="nosotros" data={data} state={state} actions={actions} />} />
            <Route path="/carrera" element={<SectionView section="carrera" data={data} state={state} actions={actions} />} />
            <Route path="/plan-estudios" element={<SectionView section="plan-estudios" data={data} state={state} actions={actions} />} />
            <Route path="/ingenieros" element={<SectionView section="ingenieros" data={data} state={state} actions={actions} />} />
            <Route path="/testimonios" element={<SectionView section="testimonios" data={data} state={state} actions={actions} />} />
            <Route path="/contacto" element={<SectionView section="contacto" data={data} state={state} actions={actions} />} />
            <Route path="/admision" element={<SectionView section="admision" data={data} state={state} actions={actions} />} />
            <Route path="/faq" element={<SectionView section="faq" data={data} state={state} actions={actions} />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        
        {/* Footer */}
        <Footer connectionState={firebaseUser ? 'connected' : 'warning'} />
        
        {/* Modales */}
        <LoginModal 
          ref={loginModalRef}
          onLoginSuccess={(user) => {
            setFirebaseUser(user)
            setTestimoniosShowForm(true)
          }}
        />
        <InscripcionModal 
          ref={inscripcionModalRef}
          onClose={closeInscripcionModal}
        />
        
        {/* Toasts */}
        <div className="toast-container">
          {toasts.map(toast => (
            <div key={toast.id} className={`toast toast-${toast.type}`}>
              <div className="toast-icon">
                {toast.type === 'success' && <i className="fa-solid fa-check-circle" />}
                {toast.type === 'error' && <i className="fa-solid fa-times-circle" />}
                {toast.type === 'warning' && <i className="fa-solid fa-exclamation-triangle" />}
                {toast.type === 'info' && <i className="fa-solid fa-info-circle" />}
              </div>
              <div className="toast-content">
                <div className="toast-title">{toast.title}</div>
                <div className="toast-message">{toast.message}</div>
              </div>
              <button className="toast-close" onClick={() => addToast({...toast, removing: true})}>
                <i className="fa-solid fa-xmark" />
              </button>
            </div>
          ))}
        </div>
        
        {/* Back to top */}
        {scrolled && (
          <button className="back-to-top show" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <i className="fa-solid fa-chevron-up" />
          </button>
        )}
      </div>
    </Router>
  )
}

export default App