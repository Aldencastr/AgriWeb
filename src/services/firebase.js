import { initializeApp } from 'firebase/app'
import { getDatabase, onValue, ref, push } from 'firebase/database'
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth'

const firebaseConfig = {
  apiKey: 'BPjSQv5zvbuUbSmSA4ZsrLhCY34zukdpo4HT2F_NfOKUvnCAqDS7GUKMnAhee-HnVckEaLRWPS7IWmvcCR5JQDA',
  databaseURL: 'https://inge-2e200-default-rtdb.firebaseio.com/',
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
  onValue,
  ref,
  push,
  auth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
}