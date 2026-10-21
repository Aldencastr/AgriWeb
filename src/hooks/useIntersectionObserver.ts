'use client'

import { useEffect, useRef, useState, useCallback } from 'react'

interface UseIntersectionObserverOptions extends IntersectionObserverInit {
  triggerOnce?: boolean
  skip?: boolean
}

interface UseIntersectionObserverReturn {
  ref: (node: Element | null) => void
  isIntersecting: boolean
  entry: IntersectionObserverEntry | null
}

export function useIntersectionObserver(
  options: UseIntersectionObserverOptions = {}
): UseIntersectionObserverReturn {
  const { triggerOnce = false, skip = false, ...observerOptions } = options
  const [isIntersecting, setIsIntersecting] = useState(false)
  const [entry, setEntry] = useState<IntersectionObserverEntry | null>(null)
  const elementRef = useRef<Element | null>(null)
  const observerRef = useRef<IntersectionObserver | null>(null)
  const triggeredRef = useRef(false)

  const setRef = useCallback((node: Element | null) => {
    if (observerRef.current) {
      observerRef.current.disconnect()
    }
    
    elementRef.current = node
    
    if (node && !skip) {
      observerRef.current = new IntersectionObserver((entries) => {
        const latestEntry = entries[0]
        setEntry(latestEntry)
        setIsIntersecting(latestEntry.isIntersecting)
        
        if (triggerOnce && latestEntry.isIntersecting && !triggeredRef.current) {
          triggeredRef.current = true
          observerRef.current?.disconnect()
        }
      }, observerOptions)
      
      observerRef.current.observe(node)
    }
  }, [triggerOnce, skip, observerOptions])

  useEffect(() => {
    return () => {
      observerRef.current?.disconnect()
    }
  }, [])

  return { ref: setRef, isIntersecting, entry }
}

// Hook for reveal animations
export function useReveal(options: UseIntersectionObserverOptions = {}) {
  const { ref, isIntersecting } = useIntersectionObserver({
    triggerOnce: true,
    rootMargin: '-50px 0px -10% 0px',
    ...options,
  })
  
  return { ref, isVisible: isIntersecting }
}

// Hook for lazy loading images
export function useLazyImage(src: string, placeholder?: string) {
  const [imageSrc, setImageSrc] = useState(placeholder || '')
  const [isLoaded, setIsLoaded] = useState(false)
  const [error, setError] = useState(false)
  const { ref, isIntersecting } = useIntersectionObserver({
    triggerOnce: true,
    rootMargin: '100px',
  })

  useEffect(() => {
    if (isIntersecting && src) {
      const img = new Image()
      img.src = src
      img.onload = () => {
        setImageSrc(src)
        setIsLoaded(true)
      }
      img.onerror = () => {
        setError(true)
        if (placeholder) setImageSrc(placeholder)
      }
    }
  }, [isIntersecting, src, placeholder])

  return { ref, src: imageSrc, isLoaded, error }
}

// Hook for infinite scroll
export function useInfiniteScroll(
  callback: () => Promise<void>,
  options: UseIntersectionObserverOptions = {}
) {
  const { ref, isIntersecting } = useIntersectionObserver({
    triggerOnce: false,
    rootMargin: '200px',
    ...options,
  })
  
  const loadingRef = useRef(false)
  
  useEffect(() => {
    if (isIntersecting && !loadingRef.current) {
      loadingRef.current = true
      callback().finally(() => {
        loadingRef.current = false
      })
    }
  }, [isIntersecting, callback])
  
  return ref
}