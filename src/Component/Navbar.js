import { Link } from "react-router-dom";
import "./Navbar.css";
import React from "react";

function Navbar({ authenticated }) {
  return (
    <nav className="navbar navbar-expand-lg ">
      <div className="container">
        <Link className="navbar-brand" to="/" >
          <img src="C:\wamp64\www\my-taskmanager\src\Component\image.jpg" alt="Logo "/>Day-o
        </Link>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="nav__links navbar-nav ml-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/about">
                About
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/contact">
                Contact
              </Link>
            </li>
            <li className="nav-item">
              {authenticated ? (
                <Link className="nav-link" to="/dashboard">
                 <button> Logout </button>
                </Link>
              ) : (
                <Link className="nav-login" to="/login">
                 <button> Login </button>
                </Link>
              )}
            </li>
            <li className="nav-item">
              {authenticated ? (
                <Link className="nav-login" to="/logout">
                 <button> Logout </button>
                  
                </Link>
              ) : (
                <Link className="nav-login" to="/signup">
                 <button> Sign Up </button>
                </Link>
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;