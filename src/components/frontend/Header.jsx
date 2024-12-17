import React from "react";
import { Link } from "react-router-dom";
import "../../App.css"; // Ensure this path is correct

const Header = () => {
  return (
    <header className="header">
      <nav className="navbar">
        <h1 className="brand">Travel App</h1>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/booking">Booking</Link></li>
          <li><Link to="/recommendations">Recommendations</Link></li>
          <li><Link to="/login">Login</Link></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
