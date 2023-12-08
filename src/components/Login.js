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

console.log("hello")
const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
 
  const dispatch = useDispatch();
  
  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);
  const [passwordType, setPasswordType] = useState("password");

  const togglePassword = () => {
    
      if (passwordType === "password") {
        setPasswordType("text");
      } else {
        setPasswordType("password");
      }
      
  };
  
  const handleButtonClick = () => {
    //validate form data
    // checkValidData(email, password);

    //   console.log(email.current.value);
    // console.log(password.current.value);
    const message = checkValidData(email.current.value, password.current.value);
    // console.log(message);
    setErrorMessage(message);
    if (message) return;

    if (!isSignInForm) {
      //sign up logic
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          const user = userCredential.user;
          // navigate("/browse")
          // not required as we are now using it in header in onauthstatechange
          
          console.log(user);
          updateProfile(user, {
            displayName: name.current.value,
            photoURL: user_avtar ,
          })
            .then(() => {
              // Profile updated!
              const { uid, email, displayName, photoURL } = auth.currentUser;
              //using auth because user dont have updated value
              dispatch(
                addUser({
                  uid: uid,
                  email: email,
                  displayName: displayName,
                  photoURL: photoURL,
                })
              );
              // navigate("/browse");
            })
            .catch((error) => {
              // An error occurred
              setErrorMessage(error.message);
            });
          console.log(user);
          // navigate("/browse");
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + " " + errorMessage);
        });
    } else {
      //sign in logic
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          const user = userCredential.user;
          console.log(user);
          // navigate("/browse");
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + " " + errorMessage);
        });
    }
  };

  const toogleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
  };

    const handleGoogle = () => {
      signInWithPopup(auth, provider)
        .then((result) => {
          // This gives you a Google Access Token. You can use it to access the Google API.
          const credential = GoogleAuthProvider.credentialFromResult(result);
          const token = credential.accessToken;
          // The signed-in user info.
          const user = result.user;
          // IdP data available using getAdditionalUserInfo(result)
          // ...
        })
        .catch((error) => {
          // Handle Errors here.
          const errorCode = error.code;
          const errorMessage = error.message;
          // The email of the user's account used.
          const email = error.customData.email;
          // The AuthCredential type that was used.
          const credential = GoogleAuthProvider.credentialFromError(error);
          // ...
        });
  };
  
  return (
    <div>
      <Header />
      <div className="absolute">
        <img className="   " src={Bg_URL} alt="logo" />
      </div>
      <form
        onSubmit={(e) => e.preventDefault()}
        className="w-full md:w-3/12 absolute p-10 bg-black my-36 mx-auto right-0 left-0 text-white rounded-lg bg-opacity-80"
      >
        <h1 className="font-bold text-3xl py-4">
          {isSignInForm ? "Sign in" : "Sign up"}
        </h1>
        {!isSignInForm && (
          <input
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
        <input type="checkbox" onClick={togglePassword}></input>
        <label>show password</label>

        <p className="text-red-500 font-bold py-2">{errorMessage} </p>
        <button
          className="p-2 my-2 bg-red-700 w-full rounded-md hover:bg-opacity-80"
          onClick={handleButtonClick}
        >
          {isSignInForm ? "Sign in" : "Sign up"}
        </button>

        <p className="p-2  my-2 cursor-pointer" onClick={toogleSignInForm}>
          {isSignInForm
            ? "New to Netflix?Sign up now"
            : "Already registered ? Sign in now"}
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
