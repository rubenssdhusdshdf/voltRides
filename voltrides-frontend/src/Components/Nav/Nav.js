import React, { useState, useEffect } from 'react';
import './Nav.css'; // Import the CSS file for styling
import bikeIcon from '../../Assets/Icons/electric-bike.svg'; // Your bike logo path
import menuIcon from '../../Assets/Icons/menu.svg'; // Your menu icon path

const Nav = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Handle window resize to check if it's mobile view
  const handleResize = () => {
    setIsMobile(window.innerWidth < 768);
  };

  // Simulating logged-in state from localStorage (or you can use context/state)
  useEffect(() => {
    const userLoggedIn = localStorage.getItem('isLoggedIn'); // Example check
    setIsLoggedIn(!!userLoggedIn); // Convert to boolean
  }, []);

  // Add event listener on component mount and remove on unmount
  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <>
      {/* Navbar */}
      <nav className="nav-bar">
        {/* Bike Icon */}
        <div className="nav-icon">
          <img src={bikeIcon} alt="Bike" className="icon" />
        </div>

        {/* Conditional rendering: mobile or desktop menu */}
        {isMobile ? (
          // Hamburger Menu Icon for mobile
          <div className="menu-icon" onClick={handleMenuToggle}>
            <img src={menuIcon} alt="Menu" className="icon" />
          </div>
        ) : (
          // Horizontal menu for desktop
          <ul className="desktop-menu">
            <li><a href="/bikes-available">Bikes Available</a></li>
            <li><a href="/rent-my-bike">Rent My Bike</a></li>
            {/* Conditional Login/MyProfile link */}
            {isLoggedIn ? (
              <li><a href="/profile">My Profile</a></li>
            ) : (
              <li><a href="/login">Login</a></li>
            )}
          </ul>
        )}
      </nav>

      {/* Full-Screen Mobile Menu */}
      {menuOpen && isMobile && (
        <div className="full-screen-menu">
          <div className="menu-close" onClick={handleMenuToggle}>✖</div>
          <ul className="menu-list">
            <li><a href="/bikes-available">Bikes Available</a></li>
            <li><a href="/rent-my-bike">Rent My Bike</a></li>
            {/* Conditional Login/MyProfile link */}
            {isLoggedIn ? (
              <li><a href="/profile">My Profile</a></li>
            ) : (
              <li><a href="/login">Login</a></li>
            )}

            <li>
              {isLoggedIn ? <Link to="/profile">My Profile</Link> : <Link to="/login">Login</Link>}
            </li>

          </ul>
        </div>
      )}
    </>
  );
};

export default Nav;
