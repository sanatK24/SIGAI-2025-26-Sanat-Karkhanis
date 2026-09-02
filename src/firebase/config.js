// file: src/firebase/config.js
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
// IMPORTANT: Replace with your actual Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyD71xxKma112v9XYlbcrIHn-t50jZ3YbmI",
  authDomain: "sigaibackend.firebaseapp.com",
  projectId: "sigaibackend",
  storageBucket: "sigaibackend.firebasestorage.app",
  messagingSenderId: "817943217733",
  appId: "1:817943217733:web:30fc298499cbe64b54052c"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);

export { db };