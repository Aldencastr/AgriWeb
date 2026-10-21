'use client'

import { useState, useEffect, useCallback } from 'react'

function getStoredValue<T>(key: string, initialValue: T): T {
  if (typeof window === 'undefined') return initialValue
  
  try {
    const item = window.localStorage.getItem(key)
    return item ? JSON.parse(item) : initialValue
  } catch (error) {
    console.warn(`Error reading localStorage key "${key}":`, error)
    return initialValue
  }
}

export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T | ((val: T) => T)) => void, () => void] {
  const [storedValue, setStoredValue] = useState<T>(() => getStoredValue(key, initialValue))
  const [initialized, setInitialized] = useState(false)

  // Initialize on mount (avoid hydration mismatch)
  useEffect(() => {
    setStoredValue(getStoredValue(key, initialValue))
    setInitialized(true)
  }, [key, initialValue])

  const setValue = useCallback((value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value
      setStoredValue(valueToStore)
      
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(valueToStore))
      }
    } catch (error) {
      console.warn(`Error setting localStorage key "${key}":`, error)
    }
  }, [key, storedValue])

  const removeValue = useCallback(() => {
    try {
      setStoredValue(initialValue)
      if (typeof window !== 'undefined') {
        window.localStorage.removeItem(key)
      }
    } catch (error) {
      console.warn(`Error removing localStorage key "${key}":`, error)
    }
  }, [key, initialValue])

  // Return initialValue during SSR to avoid hydration mismatch
  const value = initialized ? storedValue : initialValue

  return [value, setValue, removeValue]
}

// Hook for sessionStorage
export function useSessionStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T | ((val: T) => T)) => void, () => void] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === 'undefined') return initialValue
    
    try {
      const item = window.sessionStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      console.warn(`Error reading sessionStorage key "${key}":`, error)
      return initialValue
    }
  })
  const [initialized, setInitialized] = useState(false)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const item = window.sessionStorage.getItem(key)
        setStoredValue(item ? JSON.parse(item) : initialValue)
      } catch (error) {
        console.warn(`Error reading sessionStorage key "${key}":`, error)
        setStoredValue(initialValue)
      }
    }
    setInitialized(true)
  }, [key, initialValue])

  const setValue = useCallback((value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value
      setStoredValue(valueToStore)
      
      if (typeof window !== 'undefined') {
        window.sessionStorage.setItem(key, JSON.stringify(valueToStore))
      }
    } catch (error) {
      console.warn(`Error setting sessionStorage key "${key}":`, error)
    }
  }, [key, storedValue])

  const removeValue = useCallback(() => {
    try {
      setStoredValue(initialValue)
      if (typeof window !== 'undefined') {
        window.sessionStorage.removeItem(key)
      }
    } catch (error) {
      console.warn(`Error removing sessionStorage key "${key}":`, error)
    }
  }, [key, initialValue])

  const value = initialized ? storedValue : initialValue

  return [value, setValue, removeValue]
}

// Hook for persisting object state with partial updates
export function usePersistentObject<T extends Record<string, unknown>>(
  key: string,
  initialValue: T
): [T, (updates: Partial<T>) => void, () => void] {
  const [value, setValue, remove] = useLocalStorage(key, initialValue)
  
  const update = useCallback((updates: Partial<T>) => {
    setValue(prev => ({ ...prev, ...updates }))
  }, [setValue])
  
  return [value, update, remove]
}