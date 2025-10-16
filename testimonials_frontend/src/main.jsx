import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import SignUp from "./features/SignUp.jsx";
import Login from "./features/Login.jsx";
import Reviews from "./features/Reviews.jsx";

const router = createBrowserRouter([
  { path: "/", 
    element: <App />,
    children:[
       { path: "/signup, 
    element: <SignUp></SignUp>
   },
      { index:true, 
    element: <Login></Login>
   },
   { path: "/review", 
    element: <Reviews></Reviews>
   },
    ]
   },
  
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);


