// Navbar.js

import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import Logo from '../assets/amazon9.png'

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="container">
        <Link to="/" className="navbar-brand">
          <img src={Logo} alt="Flipkart" className="logo" />
        </Link>
        <div className="navbar-content">
          <p className="navbar-description">Interview Slot Booking for Amazon</p>
          <p className="navbar-subtitle">Effortlessly schedule your interview slots</p>
        </div>
        <div className="navbar-links">
          <Link to="/book-first-slot" className="register-link">Book Slot</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
