// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAK9PPUsEqs0qKMS5enempp4fjd0UK4_Ls",
  authDomain: "myreactproject-9a56a.firebaseapp.com",
  projectId: "myreactproject-9a56a",
  storageBucket: "myreactproject-9a56a.appspot.com",
  messagingSenderId: "296507794835",
  appId: "1:296507794835:web:b089c9cd30a9ac93c17466",
  measurementId: "G-1LM222W2QF",
};



// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

 const auth = getAuth();
const provider = new GoogleAuthProvider();
export { auth, provider };

