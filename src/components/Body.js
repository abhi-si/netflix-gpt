import { createBrowserRouter } from "react-router-dom";
import Browse from "./Browse"
import Login from "./Login"
import { RouterProvider } from "react-router-dom";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useDispatch } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice"



const Body = () => {
    const dispatch = useDispatch();
    
    
// console.log("hell")
    const appRouter = createBrowserRouter([
        {
            path: "/",
            element: <Login></Login>
        },
        {
            path: "/browse",
            element: <Browse></Browse>
        },
    ]);

// adding user to store
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
          if (user) {
            //sign in case
              const { uid,email,displayName ,photoURL} = user;
              dispatch(addUser({ uid: uid, email: email, displayName: displayName,photoURL:photoURL }))
            //   navigate("/browse");used inside router provider
          } else {
              //  sign out case
              dispatch(removeUser());
            //   navigate("/");
           
          }
        });

    },[])
    return (
        <div>
            <RouterProvider router={appRouter}/>
        </div>
    );
};
export default Body;
