// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBFYZtn0i1govxzcckhJL3vMow7e8WOYvI",
  authDomain: "trip-planner-bf632.firebaseapp.com",
  projectId: "trip-planner-bf632",
  storageBucket: "trip-planner-bf632.firebasestorage.app",
  messagingSenderId: "721418560428",
  appId: "1:721418560428:web:aaacb9b3e519aa45f0d009",
  measurementId: "G-TQP9SE8Y79"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);