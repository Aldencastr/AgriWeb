import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import '@/styles/globals.css'
import { Layout } from '@/components/layout/layout'
import { TooltipProvider } from '@/components/ui/tooltip'
import { ToastProvider, ToastViewport } from '@/components/ui/toast'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
  preload: true,
})

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://agriweb.example.com'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Ingeniería Agrícola | Universidad Nacional de Ingeniería',
    template: '%s | Ingeniería Agrícola UNI',
  },
  description: 'Cultivamos innovación para alimentar el futuro. Conoce la carrera de Ingeniería Agrícola en la UNI: plan de estudios, laboratorios, proyectos y admisión.',
  keywords: ['Ingeniería Agrícola', 'UNI', 'Universidad Nacional de Ingeniería', 'Plan de Estudios 2026', 'Admisión', 'Riego', 'Maquinaria', 'Agricultura de Precisión'],
  authors: [{ name: 'Facultad de Ingeniería Agrícola UNI' }],
  creator: 'Ingeniería Agrícola UNI',
  publisher: 'Universidad Nacional de Ingeniería',
  robots: 'index, follow',
  openGraph: {
    type: 'website',
    locale: 'es_NI',
    url: siteUrl,
    siteName: 'Ingeniería Agrícola UNI',
    title: 'Ingeniería Agrícola | Universidad Nacional de Ingeniería',
    description: 'Conoce el plan de estudios, laboratorios, proyectos y oportunidades de admisión de Ingeniería Agrícola en la UNI.',
    images: [
      {
        url: '/images/og-default.svg',
        width: 1200,
        height: 630,
        alt: 'Ingeniería Agrícola UNI - Innovación para el agro',
        type: 'image/svg+xml',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ingeniería Agrícola | Universidad Nacional de Ingeniería',
    description: 'Conoce el plan de estudios, laboratorios, proyectos y oportunidades de admisión de Ingeniería Agrícola en la UNI.',
    images: ['/images/og-default.svg'],
  },
  icons: {
    icon: '/images/favicon.ico',
    shortcut: '/images/favicon-16x16.png',
    apple: '/images/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#0d8a5e' },
    { media: '(prefers-color-scheme: dark)', color: '#022c22' },
  ],
  colorScheme: 'light dark',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://images.unsplash.com" />
      </head>
      <body className={`${inter.variable} font-sans antialiased`}>
        <TooltipProvider>
          <ToastProvider>
            <Layout connectionState="warning">
              {children}
            </Layout>
            <ToastViewport />
          </ToastProvider>
        </TooltipProvider>
      </body>
    </html>
  )
}