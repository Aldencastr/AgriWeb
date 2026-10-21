import { getFirebaseStorage } from './config'
import { ref, uploadBytes, getDownloadURL, deleteObject, listAll, type UploadResult } from 'firebase/storage'

export const storage = getFirebaseStorage()

export async function uploadFile(
  path: string,
  file: File,
  options?: { contentType?: string; onProgress?: (progress: number) => void }
): Promise<string> {
  const storageRef = ref(storage, path)
  const snapshot = await uploadBytes(storageRef, file, {
    contentType: options?.contentType ?? file.type,
  })
  if (options?.onProgress) {
    // Note: uploadBytes doesn't provide progress, use uploadBytesResumable for progress
    options.onProgress(100)
  }
  return getDownloadURL(snapshot.ref)
}

export async function uploadFileWithProgress(
  path: string,
  file: File,
  onProgress: (progress: number) => void
): Promise<string> {
  const { uploadBytesResumable } = await import('firebase/storage')
  const storageRef = ref(storage, path)
  const uploadTask = uploadBytesResumable(storageRef, file, { contentType: file.type })

  return new Promise((resolve, reject) => {
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        onProgress(progress)
      },
      (error) => reject(error),
      async () => {
        const url = await getDownloadURL(uploadTask.snapshot.ref)
        resolve(url)
      }
    )
  })
}

export async function deleteFile(path: string): Promise<void> {
  const storageRef = ref(storage, path)
  await deleteObject(storageRef)
}

export async function listFiles(folderPath: string): Promise<string[]> {
  const folderRef = ref(storage, folderPath)
  const result = await listAll(folderRef)
  const urls = await Promise.all(result.items.map((item) => getDownloadURL(item)))
  return urls
}

export function getFileRef(path: string) {
  return ref(storage, path)
}

export async function getFileUrl(path: string): Promise<string> {
  const storageRef = ref(storage, path)
  return getDownloadURL(storageRef)
}