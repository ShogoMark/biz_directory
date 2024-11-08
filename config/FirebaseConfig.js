// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBLkTXIV_F8RV6Gl7CpwJ7EmJcNaZ8cph8",
  authDomain: "businessdirectory-64a6c.firebaseapp.com",
  projectId: "businessdirectory-64a6c",
  storageBucket: "whatsapp-clone-efd20.appspot.com",
  messagingSenderId: "277308132492",
  appId: "1:277308132492:web:f783016da54352b968bfa9",
  measurementId: "G-QEV70PBTN7"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
export const storage = getStorage(app);