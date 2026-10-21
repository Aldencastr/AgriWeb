import { initializeApp, getApps, type FirebaseApp } from 'firebase/app'
import { getAuth, type Auth } from 'firebase/auth'
import { getDatabase, type Database } from 'firebase/database'
import { getStorage, type FirebaseStorage } from 'firebase/storage'
import { getAnalytics, isSupported, type Analytics } from 'firebase/analytics'

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
}

// Validate required config
const requiredKeys = ['apiKey', 'authDomain', 'projectId', 'appId'] as const
for (const key of requiredKeys) {
  if (!firebaseConfig[key]) {
    throw new Error(`Missing Firebase config: NEXT_PUBLIC_FIREBASE_${key.toUpperCase()}`)
  }
}

// Initialize Firebase (singleton pattern)
let app: FirebaseApp
let auth: Auth
let database: Database
let storage: FirebaseStorage
let analytics: Analytics | null = null

export function getFirebaseApp(): FirebaseApp {
  if (!app) {
    app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0]
  }
  return app
}

export function getFirebaseAuth(): Auth {
  if (!auth) {
    auth = getAuth(getFirebaseApp())
  }
  return auth
}

export function getFirebaseDatabase(): Database {
  if (!database) {
    database = getDatabase(getFirebaseApp())
  }
  return database
}

export function getFirebaseStorage(): FirebaseStorage {
  if (!storage) {
    storage = getStorage(getFirebaseApp())
  }
  return storage
}

export async function getFirebaseAnalytics(): Promise<Analytics | null> {
  if (analytics) return analytics
  const supported = await isSupported()
  if (supported && process.env.NEXT_PUBLIC_ENABLE_ANALYTICS === 'true') {
    analytics = getAnalytics(getFirebaseApp())
  }
  return analytics ?? null
}

// Export initialized instances for convenience
export const firebaseApp = getFirebaseApp()
export const firebaseAuth = getFirebaseAuth()
export const firebaseDatabase = getFirebaseDatabase()
export const firebaseStorage = getFirebaseStorage()

// Realtime Database references
import { ref } from 'firebase/database'

export const dbRefs = {
  carrera: ref(firebaseDatabase, 'Carreras/IngenieriaAgricola'),
  testimonios: ref(firebaseDatabase, 'Carreras/IngenieriaAgricola/testimonios'),
  noticias: ref(firebaseDatabase, 'Carreras/IngenieriaAgricola/noticias'),
  proyectos: ref(firebaseDatabase, 'Carreras/IngenieriaAgricola/proyectos'),
  ingenieros: ref(firebaseDatabase, 'Carreras/IngenieriaAgricola/ingenieros'),
  sitio: ref(firebaseDatabase, 'Carreras/IngenieriaAgricola/sitio'),
} as const

export type DbRefKey = keyof typeof dbRefs