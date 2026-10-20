import { useState, useCallback } from 'react'

export function useToast() {
  const [toasts, setToasts] = useState([])

  const addToast = useCallback((toast) => {
    const id = Date.now() + Math.random()
    const newToast = { ...toast, id }
    
    if (toast.removing) {
      setToasts(prev => prev.filter(t => t.id !== toast.id))
      return
    }
    
    setToasts(prev => [...prev, newToast])
    
    // Auto-remove after 5 seconds
    if (!toast.persist) {
      setTimeout(() => {
        setToasts(prev => prev.filter(t => t.id !== id))
      }, 5000)
    }
  }, [])

  const removeToast = useCallback((id) => {
    setToasts(prev => prev.filter(t => t.id !== id))
  }, [])

  return { toasts, addToast, removeToast }
}