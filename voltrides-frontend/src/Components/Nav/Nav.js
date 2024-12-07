import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Import Link from React Router
import './Nav.css';
import bikeIcon from '../../Assets/Icons/electric-bike.svg';
import menuIcon from '../../Assets/Icons/menu.svg';

const Nav = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const userLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    setIsLoggedIn(userLoggedIn);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('username');
    setIsLoggedIn(false);
    window.location.href = '/';
  };

  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="nav-bar">
      <div className="nav-icon">
        {/* Wrap the logo with a Link component */}
        <Link to="/">
          <img src={bikeIcon} alt="Bike" className="icon" />
        </Link>
      </div>
      {isMobile ? (
        <div className="menu-icon" onClick={handleMenuToggle}>
          <img src={menuIcon} alt="Menu" className="icon" />
        </div>
      ) : (
        <ul className="desktop-menu">
          <li><Link to="/bikes-available">Bikes Available</Link></li>
          <li><Link to="/rent">Rent My Bike</Link></li>
          {isLoggedIn ? (
            <>
              <li><Link to="/profile">My Profile</Link></li>
              <li><button onClick={handleLogout} className="logout-button">Logout</button></li>
            </>
          ) : (
            <li><Link to="/login">Login</Link></li>
          )}
        </ul>
      )}

      {menuOpen && (
        <div className="full-screen-menu">
          <div className="menu-close" onClick={handleMenuToggle}>✖</div>
          <ul className="menu-list">
            <li><Link to="/bikes-available" onClick={handleMenuToggle}>Bikes Available</Link></li>
            <li><Link to="/rent" onClick={handleMenuToggle}>Rent My Bike</Link></li>
            {isLoggedIn ? (
              <>
                <li><Link to="/profile" onClick={handleMenuToggle}>My Profile</Link></li>
                <li><button onClick={handleLogout} className="logout-button">Logout</button></li>
              </>
            ) : (
              <li><Link to="/login" onClick={handleMenuToggle}>Login</Link></li>
            )}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Nav;
