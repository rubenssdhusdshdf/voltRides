import React, { useState, useEffect } from 'react';
import './Nav.css'; // Import the CSS file for styling
import bikeIcon from '../../Assets/Icons/electric-bike.svg'; // Your bike logo path
import menuIcon from '../../Assets/Icons/menu.svg'; // Your menu icon path

const Nav = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check login state from localStorage
    const userLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    setIsLoggedIn(userLoggedIn);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("username");
    setIsLoggedIn(false);
    window.location.href = "/"; // Redirect to homepage
  };

  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <>
      <nav className="nav-bar">
        <div className="nav-icon">
          <img src={bikeIcon} alt="Bike" className="icon" />
        </div>
        {isMobile ? (
          <div className="menu-icon" onClick={handleMenuToggle}>
            <img src={menuIcon} alt="Menu" className="icon" />
          </div>
        ) : (
          <ul className="desktop-menu">
            <li><a href="/bikes-available">Bikes Available</a></li>
            <li><a href="/rent">Rent My Bike</a></li>
            {isLoggedIn ? (
              <>
                <li><a href="/profile">My Profile</a></li>
                <li><button onClick={handleLogout} className="logout-button">Logout</button></li>
              </>
            ) : (
              <li><a href="/login">Login</a></li>
            )}
          </ul>
        )}
      </nav>

      {menuOpen && isMobile && (
        <div className="full-screen-menu">
          <div className="menu-close" onClick={handleMenuToggle}>✖</div>
          <ul className="menu-list">
            <li><a href="/bikes-available" onClick={handleMenuToggle}>Bikes Available</a></li>
            <li><a href="/rent" onClick={handleMenuToggle}>Rent My Bike</a></li>
            {isLoggedIn ? (
              <>
                <li><a href="/profile" onClick={handleMenuToggle}>My Profile</a></li>
                <li><button onClick={handleLogout} className="logout-button">Logout</button></li>
              </>
            ) : (
              <li><a href="/login" onClick={handleMenuToggle}>Login</a></li>
            )}
          </ul>
        </div>
      )}
    </>
  );
};

export default Nav;
