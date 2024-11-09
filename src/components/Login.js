import { useRef, useState } from "react";
import Header from "./Header";
import { checkValidData } from "../utils/Validate";
import { auth, provider } from "../utils/firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { Bg_URL, user_avtar } from "../utils/constant";

console.log("hello");

// Define a functional component named 'Login'
const Login = () => {
  // State to toggle between sign-in and sign-up forms
  //useState takes one argument, which is the initial state value. In this case, true is passed as the initial state value, 
  //indicating that the form should initially be in sign-in mode.
  const [isSignInForm, setIsSignInForm] = useState(true);
  // State to store error messages
  const [errorMessage, setErrorMessage] = useState(null);

  // Initialize the dispatch function from Redux
  const dispatch = useDispatch();
  
  // Create references to form input fields for name, email, and password
  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);
  // State to toggle password visibility
  const [passwordType, setPasswordType] = useState("password");

  // Function to toggle password visibility
  const togglePassword = () => {
    if (passwordType === "password") {
      setPasswordType("text");
    } else {
      setPasswordType("password");
    }
  };
  
  // Function to handle form submission
  const handleButtonClick = () => {
    // Validate form data using a custom validation function
    const message = checkValidData(email.current.value, password.current.value);
    setErrorMessage(message);
    if (message) return;

    // Sign-up logic
    if (!isSignInForm) {
      createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
        .then((userCredential) => {
          const user = userCredential.user;
          // Update user profile with display name and photo URL
          updateProfile(user, {
            displayName: name.current.value,
            photoURL: user_avtar,
          })
            .then(() => {
              // Dispatch an action to add user details to the Redux store
              const { uid, email, displayName, photoURL } = auth.currentUser;
              dispatch(
                addUser({
                  uid: uid,
                  email: email,
                  displayName: displayName,
                  photoURL: photoURL,
                })
              );
            })
            .catch((error) => {
              // Handle profile update error
              setErrorMessage(error.message);
            });
        })
        .catch((error) => {
          // Handle sign-up error
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + " " + errorMessage);
        });
    } else {
      // Sign-in logic
      signInWithEmailAndPassword(auth, email.current.value, password.current.value)
        .then((userCredential) => {
          const user = userCredential.user;
          console.log(user);
        })
        .catch((error) => {
          // Handle sign-in error
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + " " + errorMessage);
        });
    }
  };

  // Function to toggle between sign-in and sign-up forms
  const toogleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
  };

  // Function to handle Google sign-in
  const handleGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        // Obtain Google Access Token and signed-in user info
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
      })
      .catch((error) => {
        // Handle Google sign-in error
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.customData.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
      });
  };
  
  // Return JSX that defines the UI structure for the 'Login' page
  return (
    <div>
      {/* Render the Header component */}
      <Header />
      <div className="absolute">
        {/* Display background image */}
        <img className=" " src={Bg_URL} alt="logo" />
      </div>
      <form
        onSubmit={(e) => e.preventDefault()} // Prevent form submission
        className="w-full md:w-3/12 absolute p-10 bg-black my-36 mx-auto right-0 left-0 text-white rounded-lg bg-opacity-80"
      >
        <h1 className="font-bold text-3xl py-4">
          {isSignInForm ? "Sign in" : "Sign up"}
        </h1>
        {!isSignInForm && (
          <input
            ref={name}
            type="text"
            placeholder="Full name"
            className="p-2 my-2 w-full bg-gray-700 rounded-lg"
          />
        )}
        <input
          ref={email}
          type="text"
          placeholder="Email address"
          className="p-2 my-2 w-full bg-gray-700 rounded-lg"
        />
        <input
          ref={password}
          type={passwordType}
          placeholder="Password"
          className="p-2 my-2 w-full bg-gray-700 rounded-lg"
        />
        <input type="checkbox" onClick={togglePassword} />
        <label>show password</label>

        <p className="text-red-500 font-bold py-2">{errorMessage} </p>
        <button
          className="p-2 my-2 bg-red-700 w-full rounded-md hover:bg-opacity-80"
          onClick={handleButtonClick}
        >
          {isSignInForm ? "Sign in" : "Sign up"}
        </button>

        <p className="p-2  my-2 cursor-pointer" onClick={toogleSignInForm}>
          {isSignInForm ? "New to Netflix? Sign up now" : "Already registered? Sign in now"}
        </p>
        <button
          onClick={handleGoogle}
          className="p-2  bg-blue-400 w-full rounded-md"
        >
          Sign in with Google
        </button>
      </form>
    </div>
  );
};

export default Login;
