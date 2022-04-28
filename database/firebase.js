
import { initializeApp } from "firebase/app"
import { getFirestore } from 'firebase-admin/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyBdIqSjOclL_tGXucPgmiB0TD-KEahtdrg",
  authDomain: "jaakot-a6194.firebaseapp.com",
  databaseURL: "https://jaakot-a6194-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "jaakot-a6194",
  storageBucket: "jaakot-a6194.appspot.com",
  messagingSenderId: "368888096026",
  appId: "1:368888096026:web:531c1523e793e538abb8a3",
  measurementId: "G-CJWZQWS4CE"
}

const app = initializeApp(firebaseConfig)

export const db = getFirestore(app)