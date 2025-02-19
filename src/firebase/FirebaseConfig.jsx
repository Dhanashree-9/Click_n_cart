// Import Firebase SDKs
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Firebase configuration (No databaseURL)
const firebaseConfig = {
  apiKey: "AIzaSyCd_qP0gOD6FriVrhI1VlUH3GYJK91ff3E",
  authDomain: "mypro-ba5ca.firebaseapp.com",
  projectId: "mypro-ba5ca",
  storageBucket: "mypro-ba5ca.appspot.com",
  messagingSenderId: "427745350479",
  appId: "1:427745350479:web:7291e7ecd5d0f88f95eb3a",
  measurementId: "G-FKBJXJP7SG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const fireDB = getFirestore(app);

// Export Firebase instances
export { app, auth, fireDB, analytics };
