import { useNavigate } from "react-router-dom";

// Import the Firebase auth instance from the local utils/firebase.js file
import { auth } from "../utils/firebase";

// Import the signOut function from Firebase authentication module
import { signOut } from "firebase/auth";

// Import the useSelector hook from react-redux to access Redux state
import { useSelector } from "react-redux";

// Import the useDispatch hook from react-redux to dispatch actions to the Redux store
import { useDispatch } from "react-redux";

// Import actions to add and remove user from the Redux store
import { addUser, removeUser } from "../utils/userSlice";

// Import the useEffect hook from React to handle side effects
import { useEffect } from "react";

// Import the onAuthStateChanged function from Firebase authentication module to listen for authentication state changes
import { onAuthStateChanged } from "firebase/auth";

// Import a constant LOGO from the local utils/constant.js file
import { LOGO } from "../utils/constant";

// Define a functional component named 'Header'
const Header = () => {
  // Initialize the dispatch function from Redux
  const dispatch = useDispatch();

  // Initialize the navigate function from react-router-dom
  const navigate = useNavigate();

  // Access the user state from the Redux store
  const user = useSelector((store) => store.user);
 
  // Define a function to handle user sign out
  const handleSignOut = () => {
    signOut(auth) // Call the signOut function from Firebase authentication
      .then(() => {
        // Navigate to the root path on successful sign out
        navigate("/");
      })
      .catch((error) => {
        // Handle errors during sign out and navigate to the error page
        navigate("/error");
      });
  };

  // Use the useEffect hook to add user to the store and listen for auth state changes
  useEffect(() => {
    // Subscribe to authentication state changes
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // If the user is signed in, dispatch an action to add user details to the Redux store
        const { uid, email, displayName, photoURL } = user;
        dispatch(
          addUser({
            uid: uid,
            email: email,
            displayName: displayName,
            photoURL: photoURL,
          })
        );
        // Navigate to the browse page on sign in
        navigate("/browse");
      } else {
        // If the user is signed out, dispatch an action to remove user from the Redux store
        dispatch(removeUser());
        // Navigate to the root path on sign out
        navigate("/");
      }
    });
    // Cleanup subscription on component unmount
    return () => unsubscribe();
  }, [dispatch, navigate]);

  // Return JSX that defines the UI structure for the 'Header' component
  return (
    <div className="absolute w-screen px-8 py-2 bg-gradient-to-b from-black z-10 flex flex-col md:flex-row justify-between">
      {/* Display the logo image */}
      <img className="w-44 mx-auto md:mx-0" src={LOGO} alt="logo2" />

      {/* Show the sign-out button only when the user is logged in */}
      {user && (
        <div className="py-2 px-2 text-white font-bold rounded-lg min-w-fit duration-150 flex items-center gap-4">
          {/* Sign out button with styling */}
          <img
            className="md:h-10 h-6  object-cover rounded-full "
            src={user?.photoURL}
            alt="user icon"
          />
          <button
            onClick={handleSignOut}
            className="p-2 my-2 bg-red-500 w-half font-semibold rounded-md hover:bg-opacity-80"
          >
            Sign out
          </button>
        </div>
      )}
    </div>
  );
};

// Export the 'Header' component as the default export of this module
export default Header;
