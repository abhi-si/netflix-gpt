import { useNavigate } from "react-router-dom";
import { auth } from "../utils/firebase";
import { signOut } from "firebase/auth";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { LOGO } from "../utils/constant";


const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);
 
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        // An error happened.
        navigate("/error");
      });
  };

  // adding user to store
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        //sign in case
        const { uid, email, displayName, photoURL } = user;
        dispatch(
          addUser({
            uid: uid,
            email: email,
            displayName: displayName,
            photoURL: photoURL,
          })
        );
        navigate("/browse");
        //   navigate("/browse");used inside router provider
      } else {
        //  sign out case
        dispatch(removeUser());
          navigate("/");
      }
    });
    return () => unsubscribe();
  }, []);
  //  console.log(user);


  
  




  return (
    <div className="absolute w-screen px-8 py-2 bg-gradient-to-b from-black z-10 flex flex-col  md:flex-row justify-between">
      <img className="w-44 mx-auto md:mx-0" src={LOGO} alt="logo2" />

      {/* show sign out only when user is logged in */}
      {user && (
        <div className="flex p-2 ">
          {/* <img className="" alt="usericon" src={user?.photoURL} /> */}
          <button
            onClick={handleSignOut}
            className="p-2 my-2 bg-red-300 w-half font-semibold rounded-md hover:bg-opacity-80"
          >
            Sign out
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
 