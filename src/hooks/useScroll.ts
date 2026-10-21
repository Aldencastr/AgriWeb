'use client'

import { useState, useEffect, useCallback, useRef } from 'react'

interface ScrollState {
  scrollY: number
  scrollDirection: 'up' | 'down' | null
  scrollProgress: number
  isScrolled: boolean
  isAtTop: boolean
  isAtBottom: boolean
}

export function useScroll(options?: {
  threshold?: number
  progressThreshold?: number
}): ScrollState {
  const [state, setState] = useState<ScrollState>({
    scrollY: 0,
    scrollDirection: null,
    scrollProgress: 0,
    isScrolled: false,
    isAtTop: true,
    isAtBottom: false,
  })

  const { threshold = 20, progressThreshold = 0.95 } = options ?? {}

  const lastScrollY = useRef(0)
  const ticking = useRef(false)

  const updateState = useCallback(() => {
    const scrollY = window.scrollY
    const docHeight = document.documentElement.scrollHeight - window.innerHeight
    const scrollProgress = docHeight > 0 ? Math.min(1, scrollY / docHeight) : 0
    
    setState(prev => ({
      scrollY,
      scrollDirection: scrollY > lastScrollY.current ? 'down' : scrollY < lastScrollY.current ? 'up' : prev.scrollDirection,
      scrollProgress,
      isScrolled: scrollY > threshold,
      isAtTop: scrollY <= 10,
      isAtBottom: scrollProgress >= progressThreshold,
    }))
    
    lastScrollY.current = scrollY
    ticking.current = false
  }, [threshold, progressThreshold])

  useEffect(() => {
    const handleScroll = () => {
      if (!ticking.current) {
        ticking.current = true
        requestAnimationFrame(updateState)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    // Initial calculation
    updateState()
    
    return () => window.removeEventListener('scroll', handleScroll)
  }, [updateState])

  return state
}

// Hook for scroll position persistence
export function useScrollPosition(key: string = 'scroll-position'): [number, () => void] {
  const [position, setPosition] = useState(0)
  const restored = useRef(false)

  useEffect(() => {
    if (restored.current) return
    restored.current = true
    
    const saved = sessionStorage.getItem(key)
    if (saved) {
      const pos = parseInt(saved, 10)
      if (!isNaN(pos)) {
        setPosition(pos)
        window.scrollTo(0, pos)
      }
    }
  }, [key])

  const savePosition = useCallback(() => {
    sessionStorage.setItem(key, window.scrollY.toString())
    setPosition(window.scrollY)
  }, [key])

  return [position, savePosition]
}

// Hook for smooth scroll to element
export function useSmoothScroll(): (target: string | HTMLElement, offset?: number) => void {
  const scrollTo = useCallback((target: string | HTMLElement, offset = 0) => {
    const element = typeof target === 'string' ? document.querySelector(target) : target
    if (!element) return
    
    const elementPosition = element.getBoundingClientRect().top + window.scrollY
    const targetPosition = elementPosition - offset
    
    window.scrollTo({
      top: targetPosition,
      behavior: 'smooth',
    })
  }, [])

  return scrollTo
}

// Hook for scrollspy / active section detection
export function useScrollSpy(
  sectionIds: string[],
  options?: { offset?: number; rootMargin?: string }
): string | null {
  const [activeSection, setActiveSection] = useState<string | null>(null)
  const observerRef = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    const observerOptions: IntersectionObserverInit = {
      root: null,
      rootMargin: options?.rootMargin || `-${options?.offset ?? 100}px 0px -66% 0px`,
      threshold: [0, 0.1, 0.5, 1],
    }

    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id)
        }
      })
    }, observerOptions)

    sectionIds.forEach((id) => {
      const element = document.getElementById(id)
      if (element) {
        observerRef.current?.observe(element)
      }
    })

    return () => {
      observerRef.current?.disconnect()
    }
  }, [sectionIds, options])

  return activeSection
}