import React from "react";
import { Link } from "react-router";

function Navbar() {
  return (
    <>
    <nav className="navbar navbar-expand-lg bg-light py-3 sticky-top">
  <div className="container-fluid">
    <Link className="navbar-brand" to="/signup">Testimonials</Link>
    <button
      className="navbar-toggler"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navbarNav"
      aria-controls="navbarNav"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav ms-auto gap-3">
        <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to="/signup">SignUp</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/login">Login</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/review">Review Page</Link>
        </li>
        
      </ul>
    </div>
  </div>
</nav>

    </>

   
  );
}

export default Navbar;
