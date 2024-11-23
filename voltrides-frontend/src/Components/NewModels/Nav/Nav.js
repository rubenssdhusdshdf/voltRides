import React, { useState } from 'react';
import './Nav.css';
import bikeIcon from '../Assets/Icons/electric-bike.svg';
import menuIcon from '../Assets/Icons/menu.svg';
import { Link } from 'react-router-dom';

const Nav = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <>
      <nav className="nav-bar">
        <div className="nav-icon">
          <img src={bikeIcon} alt="Bike" className="icon" />
        </div>
        <div className="menu-icon" onClick={handleMenuToggle}>
          <img src={menuIcon} alt="Menu" className="icon" />
        </div>
      </nav>

      {menuOpen && (
        <div className="full-screen-menu">
          <div className="menu-close" onClick={handleMenuToggle}>✖</div>
          <ul className="menu-list">
            <li><Link to="/" onClick={handleMenuToggle}>Home</Link></li>
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
