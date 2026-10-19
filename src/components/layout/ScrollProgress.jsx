import { useState, useEffect } from 'react'

function ScrollProgress() {
    const [progress, setProgress] = useState(0)

    useEffect(() => {
        const update = () => {
            const max = document.documentElement.scrollHeight - window.innerHeight
            const p = max > 0 ? (window.scrollY / max) * 100 : 0
            setProgress(p)
        }
        window.addEventListener('scroll', update, { passive: true })
        window.addEventListener('resize', update)
        update()
        return () => {
            window.removeEventListener('scroll', update)
            window.removeEventListener('resize', update)
        }
    }, [])

    return <div className="scroll-progress" style={{ width: `${progress}%` }} aria-hidden="true" />
}

export default ScrollProgress