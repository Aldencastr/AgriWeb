'use client'

export function SkipLink() {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-[1000] bg-primary-700 text-white px-4 py-2 rounded-lg font-medium shadow-lg transition-all"
    >
      Saltar al contenido principal
    </a>
  )
}