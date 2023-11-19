// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import {
  getAuth,
  setPersistence,
  browserSessionPersistence,
} from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
export const firebaseConfig = {
  apiKey: 'AIzaSyC7ag26jVLc3i-M1tEtlVDSACsbRRqhl9w',
  authDomain: 'my-quick-cart.firebaseapp.com',
  projectId: 'my-quick-cart',
  storageBucket: 'my-quick-cart.appspot.com',
  messagingSenderId: '25488774833',
  appId: '1:25488774833:web:8f9d4afda017accf087490',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const auth = getAuth(app)

const db = getFirestore(app)

// setPersistence(auth, browserSessionPersistence)
setPersistence(auth, {type: 'NONE'})

export { app, auth, db }
