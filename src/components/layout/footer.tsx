'use client'

import Link from 'next/link'
import { Facebook, Instagram, MapPin, Mail, Phone, Music } from 'lucide-react'
import { cn } from '@/lib/utils'
import { FOOTER_QUICK_LINKS, FOOTER_RESOURCES, SOCIAL_LINKS, CAMPUS_LOCATION, MAP_URLS } from '@/lib/constants'

// Custom TikTok icon since it's not in lucide-react
function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" fill="currentColor">
      <path d="M19.6 7.2a6.7 6.7 0 0 1-4.1-1.4v8.1a5.4 5.4 0 1 1-5.4-5.4c.4 0 .8 0 1.2.1v3a2.5 2.5 0 1 0 1.7 2.4V2.5h2.9a6.7 6.7 0 0 0 3.7 4.1v.6Z" />
    </svg>
  )
}

const socialIcons = {
  facebook: Facebook,
  instagram: Instagram,
  tiktok: TikTokIcon,
}

export function Footer({ connectionState = 'warning' }: { connectionState?: 'loading' | 'connected' | 'warning' }) {
  const CONNECTION_LABELS = {
    loading: 'Conectando con Firebase…',
    connected: 'Datos actualizados en tiempo real',
    warning: 'Mostrando contenido de demostración',
  }

  const connectionLabel = CONNECTION_LABELS[connectionState]

  return (
    <footer className="bg-neutral-950 text-neutral-300" role="contentinfo">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4" aria-label="Ingeniería Agrícola UNI - Inicio">
              <Music className="h-8 w-8 text-primary-400" aria-hidden="true" />
              <span className="text-xl font-extrabold text-white">Ingeniería Agrícola</span>
            </Link>
            <p className="text-neutral-400 text-sm leading-relaxed mb-6">
              Diseñando el futuro del agro con ingeniería, tecnología y sostenibilidad.
            </p>
            <address className="not-italic text-sm text-neutral-500 space-y-2">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-primary-400 flex-shrink-0" aria-hidden="true" />
                <span>{CAMPUS_LOCATION.name}</span>
              </div>
              <a
                href={MAP_URLS.directions}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-primary-400 transition-colors inline-flex"
              >
                <MapPin className="h-4 w-4 text-primary-400 flex-shrink-0" aria-hidden="true" />
                <span>Ver en Google Maps</span>
              </a>
            </address>
          </div>

          {/* Quick Links */}
          <nav aria-label="Enlaces rápidos">
            <h3 className="text-white font-semibold mb-4">Enlaces rápidos</h3>
            <ul className="space-y-3">
              {FOOTER_QUICK_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-neutral-400 hover:text-primary-400 transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Resources */}
          <nav aria-label="Recursos">
            <h3 className="text-white font-semibold mb-4">Recursos</h3>
            <ul className="space-y-3">
              {FOOTER_RESOURCES.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-neutral-400 hover:text-primary-400 transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Social & Contact */}
          <div>
            <h3 className="text-white font-semibold mb-4">Síguenos</h3>
            <p className="text-neutral-500 text-sm mb-4">Síguenos en nuestras redes sociales oficiales</p>
            <div className="flex gap-4 mb-6">
              {SOCIAL_LINKS.map((social) => {
                const Icon = socialIcons[social.icon as keyof typeof socialIcons]
                return (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.name}
                    className={cn(
                      'flex h-10 w-10 items-center justify-center rounded-full bg-neutral-800 text-neutral-400',
                      'hover:bg-primary-600 hover:text-white transition-all duration-200'
                    )}
                  >
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </a>
                )
              })}
            </div>
            
            <div className="space-y-3 text-sm">
              <a
                href={`mailto:${'evenorcast@gmail.com'}`}
                className="flex items-center gap-2 text-neutral-400 hover:text-primary-400 transition-colors"
              >
                <Mail className="h-4 w-4 flex-shrink-0" aria-hidden="true" />
                <span>evenorcast@gmail.com</span>
              </a>
              <a
                href="tel:+50586855972"
                className="flex items-center gap-2 text-neutral-400 hover:text-primary-400 transition-colors"
              >
                <Phone className="h-4 w-4 flex-shrink-0" aria-hidden="true" />
                <span>+505 8685 5972</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-neutral-800 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-neutral-500 text-sm">
            &copy; {new Date().getFullYear()} Ingeniería Agrícola UNI. Todos los derechos reservados.
          </p>
          <p
            className={cn(
              'text-xs px-3 py-1 rounded-full',
              connectionState === 'connected' && 'bg-green-900/30 text-green-400',
              connectionState === 'loading' && 'bg-yellow-900/30 text-yellow-400',
              connectionState === 'warning' && 'bg-orange-900/30 text-orange-400'
            )}
            role="status"
            aria-live="polite"
          >
            {connectionLabel}
          </p>
        </div>
      </div>
    </footer>
  )
}