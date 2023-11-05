// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estate-ef558.firebaseapp.com",
  projectId: "mern-estate-ef558",
  storageBucket: "mern-estate-ef558.appspot.com",
  messagingSenderId: "983138649502",
  appId: "1:983138649502:web:85733d583cbcb88a57c28f"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);