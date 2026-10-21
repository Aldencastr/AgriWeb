'use client'

import { useState, useEffect, useCallback } from 'react'
import { STORAGE_KEYS } from '@/lib/constants'

export function useDarkMode(): { darkMode: boolean; toggle: () => void; setValue: (value: boolean) => void } {
  const [darkMode, setDarkMode] = useState(false)
  const [mounted, setMounted] = useState(false)

  // Initialize from localStorage or system preference
  useEffect(() => {
    setMounted(true)
    const saved = localStorage.getItem(STORAGE_KEYS.DARK_MODE)
    if (saved !== null) {
      setDarkMode(JSON.parse(saved))
    } else {
      // Check system preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      setDarkMode(prefersDark)
    }
  }, [])

  // Apply to document
  useEffect(() => {
    if (!mounted) return
    
    const root = document.documentElement
    if (darkMode) {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }
    localStorage.setItem(STORAGE_KEYS.DARK_MODE, JSON.stringify(darkMode))
  }, [darkMode, mounted])

  // Listen for system preference changes
  useEffect(() => {
    if (!mounted) return
    
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const handleChange = (e: MediaQueryListEvent) => {
      // Only auto-switch if user hasn't explicitly set a preference
      const saved = localStorage.getItem(STORAGE_KEYS.DARK_MODE)
      if (saved === null) {
        setDarkMode(e.matches)
      }
    }
    
    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [mounted])

  const toggle = useCallback(() => {
    setDarkMode(prev => !prev)
  }, [])

  const setValue = useCallback((value: boolean) => {
    setDarkMode(value)
  }, [])

  return { darkMode, toggle, setValue }
}