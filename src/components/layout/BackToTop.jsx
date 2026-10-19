import { useState, useEffect } from 'react'

function BackToTop() {
    const [visible, setVisible] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            setVisible(window.scrollY > 400)
        }
        window.addEventListener('scroll', handleScroll, { passive: true })
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    return (
        <button
            className={`back-to-top ${visible ? 'show' : ''}`}
            onClick={scrollToTop}
            aria-label="Volver arriba"
        >
            <i className="fa-solid fa-arrow-up"></i>
        </button>
    )
}

export default BackToTop