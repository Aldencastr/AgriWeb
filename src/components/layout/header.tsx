'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, Sun, Moon, Sprout } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { ScrollProgress } from '@/components/ui/scroll-progress'
import { SkipLink } from '@/components/ui/skip-link'
import { useDarkMode } from '@/hooks/useDarkMode'
import { NAV_ITEMS, ROUTES } from '@/lib/constants'

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { darkMode, toggle } = useDarkMode()
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false)
  }, [pathname])

  const getActiveRoute = (href: string) => {
    if (href === ROUTES.HOME) return pathname === ROUTES.HOME
    return pathname.startsWith(href)
  }

  return (
    <>
      <SkipLink />
      <ScrollProgress />
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-[300] transition-all duration-300',
          scrolled
            ? 'bg-surface-1/90 backdrop-blur-md shadow-sm border-b border-surface-border'
            : 'bg-transparent'
        )}
      >
        <nav
          className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
          aria-label="Navegación principal"
        >
          <div className="flex h-16 items-center justify-between gap-4">
            {/* Logo */}
            <Link
              href={ROUTES.HOME}
              className="flex items-center gap-2 text-xl font-extrabold text-neutral-900 dark:text-neutral-100 hover:opacity-80 transition-opacity"
              aria-label="Ingeniería Agrícola UNI - Inicio"
            >
              <Sprout className="h-7 w-7 text-primary-600 dark:text-primary-400" aria-hidden="true" />
              <span className="hidden sm:block">Ingeniería Agrícola</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex md:items-center md:gap-6">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'relative px-3 py-2 text-sm font-medium transition-colors',
                    'hover:text-primary-600 dark:hover:text-primary-400',
                    getActiveRoute(item.href)
                      ? 'text-primary-600 dark:text-primary-400'
                      : 'text-neutral-600 dark:text-neutral-400'
                  )}
                  aria-current={getActiveRoute(item.href) ? 'page' : undefined}
                >
                  {item.label}
                  {getActiveRoute(item.href) && (
                    <span className="absolute bottom-0 left-1/2 h-0.5 w-6 -translate-x-1/2 bg-primary-600 rounded-full" />
                  )}
                </Link>
              ))}
              <Link
                href={ROUTES.CONTACTO}
                className="ml-2 hidden sm:inline-flex"
              >
                <Button size="sm" variant="primary">
                  Contacto
                </Button>
              </Link>
            </div>

            {/* Mobile Actions */}
            <div className="flex items-center gap-2">
              {/* Theme Toggle */}
              <Button
                variant="ghost"
                size="icon"
                onClick={toggle}
                aria-label={darkMode ? 'Activar modo claro' : 'Activar modo oscuro'}
                className="md:hidden"
              >
                {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </Button>

              {/* Mobile Menu Button */}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label={mobileMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
                aria-expanded={mobileMenuOpen}
                aria-controls="mobile-navigation"
                className="md:hidden"
              >
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div
              id="mobile-navigation"
              className="md:hidden py-4 border-t border-surface-border animate-in slide-in-from-top-2 duration-200"
            >
              <div className="flex flex-col gap-2">
                {NAV_ITEMS.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      'px-3 py-2.5 rounded-lg text-base font-medium transition-colors',
                      getActiveRoute(item.href)
                        ? 'bg-primary-50 text-primary-700 dark:bg-primary-900/30 dark:text-primary-300'
                        : 'text-neutral-600 hover:bg-neutral-100 dark:text-neutral-400 dark:hover:bg-neutral-800'
                    )}
                    onClick={() => setMobileMenuOpen(false)}
                    aria-current={getActiveRoute(item.href) ? 'page' : undefined}
                  >
                    {item.label}
                  </Link>
                ))}
                <Link
                  href={ROUTES.CONTACTO}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Button className="w-full justify-center mt-2" variant="primary">
                    Contacto
                  </Button>
                </Link>
                
                {/* Theme Toggle in Mobile Menu */}
                <Button
                  variant="outline"
                  className="w-full justify-center mt-2"
                  onClick={toggle}
                >
                  {darkMode ? (
                    <>
                      <Sun className="h-4 w-4 mr-2" />
                      Modo Claro
                    </>
                  ) : (
                    <>
                      <Moon className="h-4 w-4 mr-2" />
                      Modo Oscuro
                    </>
                  )}
                </Button>
              </div>
            </div>
          )}
        </nav>
      </header>
    </>
  )
}