// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDnF4Mn_mU9B1fY4BBoU_nE7SyX4kat7oE",
  authDomain: "netflix-gpt-63a4a.firebaseapp.com",
  projectId: "netflix-gpt-63a4a",
  storageBucket: "netflix-gpt-63a4a.appspot.com",
  messagingSenderId: "766282040910",
  appId: "1:766282040910:web:9591fa2fb9f0e35f70e51f",
  measurementId: "G-05028PFNT2",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();
