'use client'

import { useState, useEffect, useCallback } from 'react'
import { onAuthStateChange, signOutUser, type User } from '@/lib/firebase/auth'

interface UseAuthReturn {
  user: User | null
  loading: boolean
  signOut: () => Promise<void>
}

export function useAuth(): UseAuthReturn {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChange((firebaseUser) => {
      setUser(firebaseUser)
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  const signOut = useCallback(async () => {
    await signOutUser()
    setUser(null)
  }, [])

  return { user, loading, signOut }
}

// Hook for auth-required components
export function useRequireAuth(): UseAuthReturn & { authenticated: boolean } {
  const auth = useAuth()
  return {
    ...auth,
    authenticated: !auth.loading && !!auth.user,
  }
}