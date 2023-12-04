import { useNavigate } from "react-router-dom";
import { auth } from "../utils/firebase";
import { signOut } from "firebase/auth";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { LOGO, SUPPORTED_LANGUAGE } from "../utils/constant";
import { toggleGptSearchView } from "../utils/gptSlice";
import { changeLanguage } from "../utils/ConfigSlice";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);
  const showGptSearch = useSelector((store) => store.gpt.showGptSearch);

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


  const handleGptSearchClick = () => {
    //toggle gpt 
    dispatch(toggleGptSearchView());
  }

  const handleLanguageChange = (e) => {
    dispatch(changeLanguage(e.target.value));

  }




  return (
    <div className="absolute w-screen px-8 py-2 bg-gradient-to-b from-black z-10 flex justify-between">
      <img className="w-44" src={LOGO} alt="logo2" />

      {/* show sign out only when user is logged in */}
      {user && (
        <div className="flex p-2 ">
          //!only show languagechange option inside gptsearchbar
          {showGptSearch && (<select className="p-2 m-2 bg-gray-900 text-white" onChange={handleLanguageChange}>
            {SUPPORTED_LANGUAGE.map((lang) => (<option key={lang.identifier} value={lang.identifier}>{lang.name}</option>
            ))}
          </select>)}
          <button
            onClick={handleGptSearchClick}
            className="text-white  bg-purple-600 py-2 mx-4 my-2 rounded-lg"
          >
            {showGptSearch?"Home" :"GPT Search"}
          </button>
          {/* <img className="" alt="usericon" src={user?.photoURL} /> */}
          <button onClick={handleSignOut} className="font-bold text-white">
            Sign out
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
 