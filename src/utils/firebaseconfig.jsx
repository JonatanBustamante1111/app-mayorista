// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDftvRqoK-qb8H5N7uXn7l2_ufUA4mccfQ",
  authDomain: "app-mayorista-9cd45.firebaseapp.com",
  projectId: "app-mayorista-9cd45",
  messagingSenderId: "438306126681",
  appId: "1:438306126681:web:a5d96cce7fbc8f51062a48",
  measurementId: "G-9NYZRVW2BK",
  storageBucket:'gs://app-mayorista-9cd45.appspot.com'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
export const storage = getStorage(app);
//const analytics = getAnalytics(app);