import React from 'react';
import './Footer.css';
import electricBikeLogo from '../Assets/Icons/electric-bike.svg';

const Footer = () => {
  return (
    <footer className="footer">
      {/* Logo Section */}
      <div className="footer-logo">
        <img src={electricBikeLogo} alt="VoltRides Logo" className="bike-logo" />
      </div>

      {/* Navigation Links */}
      <div className="footer-menu">
        <ul>
          <li><a href="#login">Login</a></li>
          <li><a href="#bikes">Bikes Available</a></li>
          <li><a href="#rent">Rent My Bike</a></li>
        </ul>
      </div>

      {/* Social Media Icons */}
      <div className="footer-social">
        <span className="social-icon">F</span> {/* Placeholder for Facebook */}
        <span className="social-icon">I</span> {/* Placeholder for Instagram */}
        <span className="social-icon">Y</span> {/* Placeholder for YouTube */}
        <span className="social-icon">L</span> {/* Placeholder for LinkedIn */}
      </div>
    </footer>
  );
};

export default Footer;
