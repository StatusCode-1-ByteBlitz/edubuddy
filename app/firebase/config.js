// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC9G2hb20bFwGuDZ6etuV8vAStKmS0RErk",
  authDomain: "doubtstack-745ef.firebaseapp.com",
  projectId: "doubtstack-745ef",
  storageBucket: "doubtstack-745ef.appspot.com",
  messagingSenderId: "941773614237",
  appId: "1:941773614237:web:cefc4cb19e717ecb9eb874"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const db = getFirestore(app);
export {db, app, auth};