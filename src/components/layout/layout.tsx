'use client'

import { ReactNode } from 'react'
import { Header } from './header'
import { Footer } from './footer'
import { BackToTop } from '@/components/ui/back-to-top'
import { ToastProvider, ToastViewport } from '@/components/ui/toast'
import { TooltipProvider } from '@/components/ui/tooltip'

interface LayoutProps {
  children: ReactNode
  connectionState?: 'loading' | 'connected' | 'warning'
}

export function Layout({ children, connectionState = 'warning' }: LayoutProps) {
  return (
    <TooltipProvider>
      <ToastProvider>
        <div className="flex min-h-screen flex-col">
          <Header />
          <main id="main-content" className="flex-1 pt-16" tabIndex={-1}>
            {children}
          </main>
          <Footer connectionState={connectionState} />
          <BackToTop />
        </div>
        <ToastViewport />
      </ToastProvider>
    </TooltipProvider>
  )
}