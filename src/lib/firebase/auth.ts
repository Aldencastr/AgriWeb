import {
  getFirebaseAuth,
  getFirebaseAnalytics,
} from './config'
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  sendPasswordResetEmail,
  updateProfile,
  type User,
  type UserCredential,
} from 'firebase/auth'

export type { User }

export const auth = getFirebaseAuth()

export async function signIn(email: string, password: string): Promise<UserCredential> {
  return signInWithEmailAndPassword(auth, email, password)
}

export async function signUp(email: string, password: string, displayName: string): Promise<UserCredential> {
  const credential = await createUserWithEmailAndPassword(auth, email, password)
  await updateProfile(credential.user, { displayName })
  return credential
}

export async function signOutUser(): Promise<void> {
  await signOut(auth)
}

export function onAuthStateChange(callback: (user: User | null) => void): () => void {
  return onAuthStateChanged(auth, callback)
}

export async function resetPassword(email: string): Promise<void> {
  await sendPasswordResetEmail(auth, email)
}

export async function updateUserProfile(data: { displayName?: string; photoURL?: string }): Promise<void> {
  const user = auth.currentUser
  if (!user) throw new Error('No authenticated user')
  await updateProfile(user, data)
}

// Analytics event tracking
export async function logEvent(eventName: string, params?: Record<string, string | number | boolean>): Promise<void> {
  const analytics = await getFirebaseAnalytics()
  if (analytics && typeof window !== 'undefined') {
    const { logEvent: fbLogEvent } = await import('firebase/analytics')
    fbLogEvent(analytics, eventName, params)
  }
}

// Predefined events
export const AnalyticsEvents = {
  SIMULATOR_START: 'simulator_start',
  SIMULATOR_COMPLETE: 'simulator_complete',
  LEAD_SUBMIT: 'lead_submit',
  PDF_DOWNLOAD: 'pdf_download',
  TESTIMONIAL_SUBMIT: 'testimonial_submit',
  PAGE_VIEW: 'page_view',
  CTA_CLICK: 'cta_click',
} as const