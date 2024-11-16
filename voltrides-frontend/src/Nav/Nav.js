import React, { useState } from 'react';
import './Nav.css'; // Import the CSS file for styling
import bikeIcon from '../Assets/Icons/electric-bike.svg'; // Your bike logo path
import menuIcon from '../Assets/Icons/menu.svg'; // Your menu icon path

const Nav = () => {
  const [menuOpen, setMenuOpen] = useState(false);

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

        {/* Hamburger Menu Icon */}
        <div className="menu-icon" onClick={handleMenuToggle}>
          <img src={menuIcon} alt="Menu" className="icon" />
        </div>
      </nav>

      {/* Full-Screen Mobile Menu */}
      {menuOpen && (
        <div className="full-screen-menu">
          <div className="menu-close" onClick={handleMenuToggle}>✖</div>
          <ul className="menu-list">
            <li><a href="#login">Login</a></li>
            <li><a href="#bikes">Bikes Available</a></li>
            <li><a href="#rent">Rent My Bike</a></li>
          </ul>
        </div>
      )}
    </>
  );
};

export default Nav;
