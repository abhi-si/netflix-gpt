import { createBrowserRouter } from "react-router-dom";
import Browse from "./Browse"
import Login from "./Login"
import { RouterProvider } from "react-router-dom";


const Body = () => {
   
    // Defining a router configuration using 'createBrowserRouter' function
    // This sets up two routes: "/" mapped to the 'Login' component and "/browse" mapped to the 'Browse' component
    const appRouter = createBrowserRouter([
        {
            path: "/", // Root path
            element: <Login></Login> //Component to render at root path
        },
        {
            path: "/browse",
            element: <Browse></Browse>
        },
    ]);

// Return JSX that renders the RouterProvider component with the defined router
    return (
        <div>
            <RouterProvider router={appRouter}/>
        </div>
    );
};
export default Body;
