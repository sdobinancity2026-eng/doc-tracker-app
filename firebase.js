import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// 1. Import Firestore functions
import { getFirestore } from "firebase/firestore"; 

const firebaseConfig = {
  apiKey: "AIzaSyD2ETaUtRLa6xtmtd-eZUfx912-faXUnQY",
  authDomain: "document-tracker-fbd94.firebaseapp.com",
  projectId: "document-tracker-fbd94",
  storageBucket: "document-tracker-fbd94.firebasestorage.app",
  messagingSenderId: "600015907918",
  appId: "1:600015907918:web:e2399c407a326473eae71f",
  measurementId: "G-PPQL5PLL3Z"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// 2. Initialize Firestore and export it
export const db = getFirestore(app);
