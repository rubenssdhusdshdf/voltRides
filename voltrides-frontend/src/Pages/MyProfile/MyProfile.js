import React, { useState } from 'react';
import './MyProfile.css'; 
import Nav from '../../Components/Nav/Nav.js'; 
import Footer from '../../Components/Footer/Footer.js';

const MyProfile = () => {
  const [showPassword, setShowPassword] = useState(false);

  const username = localStorage.getItem('username') || 'John Doe';
  const hashedPassword = '**********'; // Replace with actual hashed password if needed

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('username');
    window.location.href = '/'; // Redirect to homepage
  };

  return (
    <>
      <Nav /> 
    
      <div className="my-profile-container">
        <div className="profile-content">
          <h1>My Profile</h1>
          <div className="profile-info">
            <div className="profile-field">
              <strong>Profile Name:</strong>
              <span>{username}</span>
            </div>
            <div className="profile-field">
              <p><strong>Password:</strong>  </p>
              <span
                className="password clickable"
                onClick={() => setShowPassword(!showPassword)}
                title="Click to toggle visibility"
              >
                {showPassword ? 'mypassword123' : hashedPassword}
              </span>
            </div>
          </div>
          <button className="logout-button" onClick={handleLogout}>
            Log Out
          </button>
        </div>
      </div>
      
      <Footer />
    </>
  );
};

export default MyProfile;
