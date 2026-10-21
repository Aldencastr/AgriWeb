'use client'

import { useScroll } from '@/hooks/useScroll'

export function ScrollProgress() {
  const { scrollProgress } = useScroll({ progressThreshold: 1 })
  const percentage = Math.round(scrollProgress * 100)

  return (
    <div
      className="fixed top-0 left-0 z-[300] h-1 bg-gradient-to-r from-primary-500 via-primary-400 to-tech-500 origin-left transition-transform duration-100"
      style={{
        transform: `scaleX(${scrollProgress})`,
        transformOrigin: 'left center',
      }}
      role="progressbar"
      aria-valuenow={percentage}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Progreso de lectura"
    />
  )
}