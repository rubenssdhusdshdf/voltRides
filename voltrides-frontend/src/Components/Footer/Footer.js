import React from 'react';
import './Footer.css';
import electricBikeLogo from '../../Assets/Icons/electric-bike.svg';
import facebook from '../../Assets/Icons/facebook.svg';
import instagram from '../../Assets/Icons/instagram.svg';
import whatsapp from '../../Assets/Icons/whatsapp.svg';
import pinterest from '../../Assets/Icons/pinterest.svg';

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
        <img src={facebook} alt="facebook" className="facebook" />
        <img src={instagram} alt="instagram" className="instagram" />
        <img src={pinterest} alt="pinterest" className="pinterest" />
        <img src={whatsapp} alt="whatsapp" className="whatsapp" />
      </div>
    </footer>
  );
};

export default Footer;
