import React, { useState } from 'react';
import './MyProfile.css';

const MyProfile = () => {
  const [showPassword, setShowPassword] = useState(false);

  // Mock data: Replace these with real user data fetched from backend or stored in localStorage
  const username = localStorage.getItem('username') || 'John Doe';
  const hashedPassword = '**********'; // Mock hashed password

  const handleLogout = () => {
    // Clear session data
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('username');
    window.location.href = '/'; // Redirect to homepage
  };

  return (
    <div className="my-profile-container">
      <h1>My Profile</h1>
      <div className="profile-info">
        <p><strong>Profile Name:</strong> {username}</p>
        <div className="password-section">
          <strong>Password:</strong>
          <span className="password">
            {showPassword ? 'mypassword123' : hashedPassword}
          </span>
          <button
            className="toggle-password"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? 'Hide' : 'Show'}
          </button>
        </div>
      </div>
      <button className="logout-button" onClick={handleLogout}>
        Log Out
      </button>
    </div>
  );
};

export default MyProfile;
