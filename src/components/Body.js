import { createBrowserRouter } from "react-router-dom";
import Browse from "./Browse"
import Login from "./Login"
import { RouterProvider } from "react-router-dom";


const Body = () => {
console.log("hell")
    const appRouter = createBrowserRouter([
        {
            path: "/",
            element: <Login></Login>
        },
        {
            path: "/bowse",
            element: <Browse></Browse>
        },
    ]);
    return (
        <div>
            <RouterProvider router={appRouter}/>
        </div>
    );
};
export default Body;
