// Firebase configuration and services - barrel export
export {
  getFirebaseApp,
  getFirebaseAuth,
  getFirebaseDatabase,
  getFirebaseStorage,
  getFirebaseAnalytics,
  firebaseApp,
  firebaseAuth,
  firebaseDatabase,
  firebaseStorage,
  dbRefs,
  type DbRefKey,
} from './config'

export {
  auth,
  signIn,
  signUp,
  signOutUser,
  onAuthStateChange,
  resetPassword,
  updateUserProfile,
  logEvent,
  AnalyticsEvents,
} from './auth'

export {
  database,
  fetchOnce,
  subscribe,
  writeData,
  pushData,
  updateData,
  deleteData,
  subscribeToLatestTestimonios,
  subscribeToSiteData,
  subscribeToIngenieros,
  type Testimonio,
  type Ingeniero,
  type Noticia,
  type Proyecto,
  submitTestimonio,
  fetchTestimonios,
  fetchIngenieros,
} from './database'

export {
  storage,
  uploadFile,
  uploadFileWithProgress,
  deleteFile,
  listFiles,
  getFileRef,
  getFileUrl,
} from './storage'