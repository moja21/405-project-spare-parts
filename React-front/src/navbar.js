import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './navbar.css'
import DropdownMenu from "./DropdownMenu";
import { IoIosArrowDropdown } from "react-icons/io";
import logo from './modules/logo.png'

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("isLoggedIn") === "true" || false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("email");
    localStorage.removeItem("id");
    localStorage.removeItem("name");
  };

  const handleDropdownToggle = () => {
    setIsDropdownOpen((prevIsDropdownOpen) => !prevIsDropdownOpen);
  };

  return (
    <nav className="navbar">
      <div className="logo">
        <img src={logo} alt="Logo" />
        <h1>Spare Parts Service</h1>
      </div>
      
      <div className="links">
        <Link to="/">Home</Link>
        <Link to="/Create">Create Order</Link>
        <Link to="/Ongoing">Ongoing Orders</Link>
        <Link to="/ImageDetection">Image Detection</Link>
        <Link to="/ChatAI">ChatAI</Link>
        
        {isLoggedIn ? (
          <>
            <div id="profile" onClick={handleDropdownToggle}>
              <p>welcome {localStorage.getItem('name')}</p>
              <IoIosArrowDropdown className="profile-icon" />
            </div>
            {isDropdownOpen && <DropdownMenu handleLogout={handleLogout} />}
          </>
        ) : (
          <Link className="btn" to="/login">
            Sign in
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
