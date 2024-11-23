import React from 'react';
import { Link } from 'react-router-dom';
import bikeLogo from '../Assets/Icons/electric-bike.svg';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-logo">
        <img src={bikeLogo} alt="VoltRides Logo" className="bike-logo" />
      </div>
      <div className="footer-menu">
        <ul>
          <li><Link to="/login">Login</Link></li>
          <li><Link to="/models">Bikes Available</Link></li>
          <li><Link to="/rent">Rent My Bike</Link></li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
