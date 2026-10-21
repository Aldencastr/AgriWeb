import {
  getFirebaseDatabase,
  dbRefs,
  type DbRefKey,
} from './config'
import {
  ref,
  get,
  set,
  push,
  update,
  remove,
  onValue,
  off,
  query,
  orderByChild,
  limitToLast,
  equalTo,
  startAt,
  endAt,
  type DataSnapshot,
  type DatabaseReference,
  type Query,
} from 'firebase/database'

export const database = getFirebaseDatabase()

// Generic CRUD operations
export async function fetchOnce<T>(path: DbRefKey | DatabaseReference): Promise<T | null> {
  const reference = typeof path === 'string' ? dbRefs[path] : path
  const snapshot = await get(reference)
  return snapshot.exists() ? snapshot.val() : null
}

export function subscribe<T>(
  path: DbRefKey | DatabaseReference,
  callback: (data: T | null) => void,
  queryBuilder?: (ref: DatabaseReference) => Query
): () => void {
  const reference = typeof path === 'string' ? dbRefs[path] : path
  const q = queryBuilder ? queryBuilder(reference) : reference
  const unsubscribe = onValue(q, (snapshot: DataSnapshot) => {
    callback(snapshot.exists() ? snapshot.val() : null)
  })
  return () => off(q, 'value', unsubscribe)
}

export async function writeData<T>(path: DbRefKey | DatabaseReference, data: T): Promise<void> {
  const reference = typeof path === 'string' ? dbRefs[path] : path
  await set(reference, data)
}

export async function pushData<T>(path: DbRefKey | DatabaseReference, data: T): Promise<DatabaseReference> {
  const reference = typeof path === 'string' ? dbRefs[path] : path
  return push(reference, data)
}

export async function updateData(path: DbRefKey | DatabaseReference, data: Partial<Record<string, unknown>>): Promise<void> {
  const reference = typeof path === 'string' ? dbRefs[path] : path
  await update(reference, data)
}

export async function deleteData(path: DbRefKey | DatabaseReference): Promise<void> {
  const reference = typeof path === 'string' ? dbRefs[path] : path
  await remove(reference)
}

// Specific queries
export function subscribeToLatestTestimonios(limit = 50, callback: (data: { id: string; creadoEn: number; [key: string]: unknown }[]) => void): () => void {
  return subscribe('testimonios', (data) => {
    if (!data) {
      callback([])
      return
    }
    const arr = Object.entries(data)
      .map(([id, value]) => ({ id, ...(value as Record<string, unknown>) }))
      .sort((a, b) => ((a as unknown as { creadoEn: number }).creadoEn ?? 0) - ((b as unknown as { creadoEn: number }).creadoEn ?? 0))
      .slice(0, limit)
    callback(arr as { id: string; creadoEn: number; [key: string]: unknown }[])
  }, (ref) => query(ref, orderByChild('creadoEn'), limitToLast(limit)))
}

export function subscribeToSiteData(callback: (data: Record<string, unknown> | null) => void): () => void {
  return subscribe('sitio', callback)
}

export function subscribeToIngenieros(callback: (data: Record<string, unknown>[]) => void): () => void {
  return subscribe('ingenieros', (data) => {
    if (!data) {
      callback([])
      return
    }
    const arr = Object.entries(data).map(([id, value]) => ({ id, ...(value as Record<string, unknown>) }))
    callback(arr)
  })
}

// Type-safe helpers for specific collections
export interface Testimonio {
  id?: string
  nombre: string
  rol: string
  texto: string
  imagen?: string
  uid?: string
  creadoEn: number
}

export interface Ingeniero {
  id?: string
  nombre: string
  rol: string
  imagen?: string
  biografia: string
}

export interface Noticia {
  id?: string
  titulo: string
  descripcion: string
  imagen?: string
  categoria: string
  url?: string
  creadoEn: number
}

export interface Proyecto {
  id?: string
  titulo: string
  descripcion: string
  imagen?: string
  creadoEn: number
}

export async function submitTestimonio(data: Omit<Testimonio, 'id' | 'creadoEn'>): Promise<string> {
  const newRef = await pushData('testimonios', {
    ...data,
    creadoEn: Date.now(),
  })
  return newRef.key ?? ''
}

export async function fetchTestimonios(): Promise<Testimonio[]> {
  const data = await fetchOnce<Record<string, Testimonio>>('testimonios')
  if (!data) return []
  return Object.entries(data)
    .map(([id, value]) => ({ id, ...value }))
    .sort((a, b) => b.creadoEn - a.creadoEn)
}

export async function fetchIngenieros(): Promise<Ingeniero[]> {
  const data = await fetchOnce<Record<string, Ingeniero>>('ingenieros')
  if (!data) return []
  return Object.entries(data).map(([id, value]) => ({ id, ...value }))
}