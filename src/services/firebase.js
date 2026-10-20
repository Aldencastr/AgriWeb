import { initializeApp } from 'firebase/app'
import { getDatabase, ref, push, onValue } from 'firebase/database'
import { 
  getAuth, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged 
} from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyCFz7R02iNeIPPHanIPUHFBaACns898kEY",
  authDomain: "inge-2e200.firebaseapp.com",
  databaseURL: "https://inge-2e200-default-rtdb.firebaseio.com",
  projectId: "inge-2e200",
  storageBucket: "inge-2e200.firebasestorage.app",
  messagingSenderId: "48475081198",
  appId: "1:48475081198:web:890ec295c1a5bf47d3a6ff",
  measurementId: "G-NSY84LP08N"
}

const app = initializeApp(firebaseConfig)
const db = getDatabase(app)
const auth = getAuth(app)
const carreraRef = ref(db, 'Carreras/IngenieriaAgricola')
const testimoniosRef = ref(db, 'Carreras/IngenieriaAgricola/testimonios')

export {
  carreraRef,
  testimoniosRef,
  db,
  ref,
  push,
  onValue,
  auth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
}