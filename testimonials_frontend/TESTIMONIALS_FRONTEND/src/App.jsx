import React from "react";
import Navbar from "./features/Navbar";
import { Outlet } from "react-router";

function App() {
  
  return (
    <>
      <Navbar />
      <Outlet></Outlet>
      
      
    </>
  );
}

export default App;

