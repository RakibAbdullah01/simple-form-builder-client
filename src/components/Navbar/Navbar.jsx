import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.scss";
const Navbar = () => {
  return (
    <nav>
      <div className="navbar">
        <div className="navbar-left">
          <Link to="/">Form Builder</Link>
        </div>
        <div className="navbar-right">
          <Link to="/">Home</Link>
          <Link to="/form">Generate Form</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
