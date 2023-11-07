// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {  getAuth} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCAI-lmWAkhuPltRhvchBRVEZhq893mhqs",
  authDomain: "netflix-gptai.firebaseapp.com",
  projectId: "netflix-gptai",
  storageBucket: "netflix-gptai.appspot.com",
  messagingSenderId: "176575330073",
  appId: "1:176575330073:web:15c99def1c022a8dbaf788",
  measurementId: "G-K0CWJM7EJ5",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();
