// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
// import { getAnalytics } from "firebase/analytics"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from "firebase/auth"
import { getStorage } from "firebase/storage"
import { getFirestore } from "firebase/firestore"

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAhVdHSs-8vg_6YCFY9wj9h1XN1KKahaGE",
  authDomain: "film-diary-f1456.firebaseapp.com",
  projectId: "film-diary-f1456",
  storageBucket: "film-diary-f1456.appspot.com",
  messagingSenderId: "56011819513",
  appId: "1:56011819513:web:ed00425d33e44bb7df5528",
  measurementId: "G-73HDS68Z4D",
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const storage = getStorage(app)
export const db = getFirestore(app)
// const analytics = getAnalytics(app)
