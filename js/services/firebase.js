import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js'
import { getDatabase, onValue, ref, push } from 'https://www.gstatic.com/firebasejs/10.14.1/firebase-database.js'
import {
    getAuth,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
    onAuthStateChanged
} from 'https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js'

const firebaseConfig = {
    apiKey: 'BPjSQv5zvbuUbSmSA4ZsrLhCY34zukdpo4HT2F_NfOKUvnCAqDS7GUKMnAhee-HnVckEaLRWPS7IWmvcCR5JQDA',
    databaseURL: 'https://inge-2e200-default-rtdb.firebaseio.com/'
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
    onAuthStateChanged
}
