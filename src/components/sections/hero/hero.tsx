'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import Link from 'next/link'
import { ChevronLeft, ChevronRight, ChevronDown } from 'lucide-react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import type { HeroSlide } from '@/lib/types'

interface HeroProps {
  slides: HeroSlide[]
  slogan?: string
  descripcion?: string
  inscripcionHref?: string
}

export function Hero({ slides, slogan, descripcion, inscripcionHref }: HeroProps) {
  const [index, setIndex] = useState(0)
  const [fade, setFade] = useState(false)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const heroRef = useRef<HTMLElement>(null)

  const slideItems: HeroSlide[] = Array.isArray(slides) ? slides : Object.values(slides || {})
  const hasSlides = slideItems.length > 0
  const currentSlide: HeroSlide = hasSlides ? slideItems[index] : { titulo: '', descripcion: '', imagen: '' }

  const go = useCallback((newIndex: number) => {
    const len = slideItems.length
    if (!len) return
    setFade(true)
    setTimeout(() => {
      setIndex(((newIndex % len) + len) % len)
      setFade(false)
    }, 300)
  }, [slideItems.length])

  const goPrev = useCallback(() => go(index - 1), [go, index])
  const goNext = useCallback(() => go(index + 1), [go, index])

  // Auto-play effect
  useEffect(() => {
    if (!hasSlides || slideItems.length < 2) return

    const stopAuto = () => {
      if (timerRef.current) {
        clearInterval(timerRef.current)
        timerRef.current = null
      }
    }

    const startAuto = () => {
      if (timerRef.current) return
      timerRef.current = setInterval(() => {
        if (document.hidden) return
        go(index + 1)
      }, 5000)
    }

    const onVisibility = () => {
      if (document.hidden) stopAuto()
      else startAuto()
    }

    const onPointerEnter = () => stopAuto()
    const onPointerLeave = () => startAuto()

    if (heroRef.current) {
      heroRef.current.addEventListener('pointerenter', onPointerEnter)
      heroRef.current.addEventListener('pointerleave', onPointerLeave)
    }
    document.addEventListener('visibilitychange', onVisibility)

    if (!window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) startAuto()

    return () => {
      stopAuto()
      document.removeEventListener('visibilitychange', onVisibility)
      if (heroRef.current) {
        heroRef.current.removeEventListener('pointerenter', onPointerEnter)
        heroRef.current.removeEventListener('pointerleave', onPointerLeave)
      }
    }
  }, [hasSlides, slideItems.length, go, index])

  const getSlideStyle = (slide: HeroSlide) => {
    if (slide.imagen) {
      return { backgroundImage: `url("${slide.imagen}")` }
    }
    return { background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.75), rgba(4, 120, 87, 0.55))' }
  }

  return (
    <section
      id="inicio"
      ref={heroRef}
      className="relative min-h-[90vh] min-h-[90svh] flex items-center overflow-hidden"
      aria-label="Carrusel principal"
    >
      {/* Background Carousel */}
      <div
        className="absolute inset-0"
        aria-hidden="true"
      >
        <div
          className="hero-carousel absolute inset-0 flex h-full transition-transform duration-700 ease-out"
          style={{
            transform: hasSlides ? `translateX(-${index * 100}%)` : 'none',
          }}
          role="region"
          aria-label="Imágenes de fondo del carrusel"
        >
          {hasSlides && slideItems.map((slide, i) => (
            <div
              key={i}
              className="hero-slide flex-0-0-auto w-full h-full"
              style={getSlideStyle(slide)}
              aria-hidden={i !== index}
            >
              {slide.imagen && (
                <Image
                  src={slide.imagen}
                  alt=""
                  fill
                  priority={i === 0}
                  className="object-cover"
                  sizes="100vw"
                  aria-hidden="true"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-b from-neutral-900/60 via-neutral-900/30 to-neutral-900/60" />
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Arrows */}
      {hasSlides && (
        <>
          <button
            className={cn(
              'absolute left-4 top-1/2 -translate-y-1/2 z-20 flex h-14 w-14 items-center justify-center rounded-full bg-white/10 backdrop-blur-md text-white',
              'hover:bg-white/20 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500',
              'md:left-8'
            )}
            onClick={goPrev}
            disabled={!hasSlides}
            aria-label="Diapositiva anterior"
          >
            <ChevronLeft className="h-7 w-7" aria-hidden="true" />
          </button>
          <button
            className={cn(
              'absolute right-4 top-1/2 -translate-y-1/2 z-20 flex h-14 w-14 items-center justify-center rounded-full bg-white/10 backdrop-blur-md text-white',
              'hover:bg-white/20 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500',
              'md:right-8'
            )}
            onClick={goNext}
            disabled={!hasSlides}
            aria-label="Siguiente diapositiva"
          >
            <ChevronRight className="h-7 w-7" aria-hidden="true" />
          </button>
        </>
      )}

      {/* Dots Navigation */}
      {hasSlides && (
        <div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-20"
          role="tablist"
          aria-label="Navegación de diapositivas"
        >
          {slideItems.map((_, i) => (
            <button
              key={i}
              className={cn(
                'h-2.5 w-2.5 rounded-full transition-all duration-300',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-900',
                i === index
                  ? 'bg-white w-8 scale-110'
                  : 'bg-white/50 hover:bg-white/75'
              )}
              onClick={() => go(i)}
              role="tab"
              aria-selected={i === index}
              aria-label={`Diapositiva ${i + 1}`}
            />
          ))}
        </div>
      )}

      {/* Content */}
      <div className="relative z-10 w-full px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <div
            className={cn(
              'transition-opacity duration-300',
              fade && 'opacity-0'
            )}
          >
            <span className="inline-flex items-center gap-2 rounded-full bg-primary-500/10 text-primary-400 px-4 py-1.5 text-sm font-medium mb-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-500" />
              </span>
              Plan 2026 · 5 Años · 10 Semestres
            </span>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight text-white mb-6 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-100">
              {currentSlide.titulo || slogan || 'Ingeniería Agrícola'}
            </h1>
            
            <p className="text-lg sm:text-xl text-neutral-200/90 max-w-2xl mx-auto mb-10 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-200">
              {currentSlide.descripcion || descripcion || 'Diseña soluciones sostenibles para el campo combinando ingeniería, tecnología y ciencias agrícolas.'}
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-300">
              <Link href="/plan-estudios">
                <Button size="lg" variant="primary" className="w-full sm:w-auto gap-2">
                  Descubre tu futuro
                  <ChevronRight className="h-5 w-5" aria-hidden="true" />
                </Button>
              </Link>
              <Link href={inscripcionHref || '/contacto'}>
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto border-white/30 text-white hover:bg-white/10"
                >
                  Proceso de admisión
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce" aria-hidden="true">
        <ChevronDown className="h-6 w-6 text-white/50" />
      </div>
    </section>
  )
}