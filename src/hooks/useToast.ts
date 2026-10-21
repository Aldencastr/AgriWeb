'use client'

import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import type { Toast } from '@/lib/types'
import { generateId } from '@/lib/utils'

interface ToastState {
  toasts: Toast[]
  addToast: (toast: Omit<Toast, 'id'>) => string
  removeToast: (id: string) => void
  clearToasts: () => void
}

// Custom ID generator that works with persist
const createToastId = () => `toast-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`

export const useToastStore = create<ToastState>()(
  persist(
    (set, get) => ({
      toasts: [],
      
      addToast: (toast) => {
        const id = createToastId()
        const newToast: Toast = {
          ...toast,
          id,
          duration: toast.duration ?? 5000,
        }
        
        set((state) => ({
          toasts: [...state.toasts, newToast],
        }))
        
        // Auto-remove after duration
        if (newToast.duration && newToast.duration > 0) {
          setTimeout(() => {
            get().removeToast(id)
          }, newToast.duration)
        }
        
        return id
      },
      
      removeToast: (id) => {
        set((state) => ({
          toasts: state.toasts.filter((t) => t.id !== id),
        }))
      },
      
      clearToasts: () => {
        set({ toasts: [] })
      },
    }),
    {
      name: 'agriweb-toasts',
      storage: createJSONStorage(() => sessionStorage),
      // Don't persist toasts across sessions
      partialize: () => ({ toasts: [] }),
    }
  )
)

// Hook for components
export function useToast() {
  const { toasts, addToast, removeToast, clearToasts } = useToastStore()
  
  return {
    toasts,
    addToast,
    removeToast,
    clearToasts,
    
    // Convenience methods
    success: (title: string, message: string, options?: Partial<Toast>) =>
      addToast({ type: 'success', title, message, ...options }),
    
    error: (title: string, message: string, options?: Partial<Toast>) =>
      addToast({ type: 'error', title, message, ...options }),
    
    warning: (title: string, message: string, options?: Partial<Toast>) =>
      addToast({ type: 'warning', title, message, ...options }),
    
    info: (title: string, message: string, options?: Partial<Toast>) =>
      addToast({ type: 'info', title, message, ...options }),
  }
}