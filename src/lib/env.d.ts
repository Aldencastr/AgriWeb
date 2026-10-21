// TypeScript declarations for environment variables

/// <reference types="next" />
/// <reference types="next/image-types/global" />

interface ImportMetaEnv {
  readonly NEXT_PUBLIC_FIREBASE_API_KEY: string
  readonly NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN: string
  readonly NEXT_PUBLIC_FIREBASE_DATABASE_URL: string
  readonly NEXT_PUBLIC_FIREBASE_PROJECT_ID: string
  readonly NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET: string
  readonly NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID: string
  readonly NEXT_PUBLIC_FIREBASE_APP_ID: string
  readonly NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID: string
  readonly NEXT_PUBLIC_SITE_URL: string
  readonly NEXT_PUBLIC_SITE_NAME: string
  readonly NEXT_PUBLIC_GA_ID?: string
  readonly NEXT_PUBLIC_PLAUSIBLE_DOMAIN?: string
  readonly NEXT_PUBLIC_EMAILJS_SERVICE_ID?: string
  readonly NEXT_PUBLIC_EMAILJS_TEMPLATE_ID?: string
  readonly NEXT_PUBLIC_EMAILJS_PUBLIC_KEY?: string
  readonly NEXT_PUBLIC_ENABLE_ANALYTICS: 'true' | 'false'
  readonly NEXT_PUBLIC_ENABLE_SIMULATORS: 'true' | 'false'
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

// Global type extensions
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_FIREBASE_API_KEY: string
      NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN: string
      NEXT_PUBLIC_FIREBASE_DATABASE_URL: string
      NEXT_PUBLIC_FIREBASE_PROJECT_ID: string
      NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET: string
      NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID: string
      NEXT_PUBLIC_FIREBASE_APP_ID: string
      NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID: string
      NEXT_PUBLIC_SITE_URL: string
      NEXT_PUBLIC_SITE_NAME: string
      NEXT_PUBLIC_GA_ID?: string
      NEXT_PUBLIC_PLAUSIBLE_DOMAIN?: string
      NEXT_PUBLIC_EMAILJS_SERVICE_ID?: string
      NEXT_PUBLIC_EMAILJS_TEMPLATE_ID?: string
      NEXT_PUBLIC_EMAILJS_PUBLIC_KEY?: string
      NEXT_PUBLIC_ENABLE_ANALYTICS: 'true' | 'false'
      NEXT_PUBLIC_ENABLE_SIMULATORS: 'true' | 'false'
    }
  }
}

export {}