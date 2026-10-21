'use client'

import { useEffect, useState } from 'react'
import { ChevronUp } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useScroll } from '@/hooks/useScroll'

export function BackToTop({ threshold = 300 }: { threshold?: number } = {}) {
  const { scrollY } = useScroll()
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(scrollY > threshold)
  }, [scrollY, threshold])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  if (!isVisible) return null

  return (
    <button
      onClick={scrollToTop}
      className={cn(
        'fixed bottom-6 right-6 z-[200] flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-primary-600 to-primary-700 text-white shadow-lg transition-all duration-300 hover:shadow-xl hover:shadow-primary-500/40 hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2',
        'animate-in fade-in zoom-in-95'
      )}
      aria-label="Volver al inicio"
    >
      <ChevronUp className="h-6 w-6" aria-hidden="true" />
    </button>
  )
}