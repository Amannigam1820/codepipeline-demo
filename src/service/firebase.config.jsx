// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAZtIVrub9gwB54mwOHnDApDl3xYIz0lbM",
  authDomain: "travel-planner-bf3ae.firebaseapp.com",
  projectId: "travel-planner-bf3ae",
  storageBucket: "travel-planner-bf3ae.appspot.com",
  messagingSenderId: "65652116435",
  appId: "1:65652116435:web:f5747da068a7df7e0c7d26",
  measurementId: "G-K9CM1LY5SP"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
