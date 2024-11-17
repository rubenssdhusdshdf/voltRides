import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Nav.css';
import bikeIcon from '../../Assets/Icons/electric-bike.svg';
import menuIcon from '../../Assets/Icons/menu.svg';

const Nav = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // Handle window resize to check if it's mobile view
  const handleResize = () => {
    setIsMobile(window.innerWidth < 768);
  };

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
          <Link to="/">
            <img src={bikeIcon} alt="Bike" className="icon" />
          </Link>
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
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/bikes-available">Bikes Available</Link></li>
            <li><Link to="/rent-my-bike">Rent My Bike</Link></li>
          </ul>
        )}
      </nav>

      {/* Full-Screen Mobile Menu */}
      {menuOpen && isMobile && (
        <div className="full-screen-menu">
          <div className="menu-close" onClick={handleMenuToggle}>✖</div>
          <ul className="menu-list">
            <li><Link to="/login" onClick={handleMenuToggle}>Login</Link></li>
            <li><Link to="/bikes-available" onClick={handleMenuToggle}>Bikes Available</Link></li>
            <li><Link to="/rent-my-bike" onClick={handleMenuToggle}>Rent My Bike</Link></li>
          </ul>
        </div>
      )}
    </>
  );
};

export default Nav;
