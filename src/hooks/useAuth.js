import { useState, useEffect } from 'react'
import { auth, onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from '../services/firebase'

export function useAuth() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
      setLoading(false)
    })
    return unsubscribe
  }, [])

  const login = async (email, password) => {
    const result = await signInWithEmailAndPassword(auth, email, password)
    return result.user
  }

  const register = async (email, password) => {
    const result = await createUserWithEmailAndPassword(auth, email, password)
    return result.user
  }

  const logout = async () => {
    await signOut(auth)
  }

  return { user, loading, login, register, logout }
}