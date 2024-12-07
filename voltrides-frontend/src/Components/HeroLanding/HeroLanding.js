import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import "./HeroLanding.css"; // Import your CSS file

const HeroLanding = () => {
  const navigate = useNavigate(); // Hook for navigation

  const handleSeeBikes = () => {
    navigate("/bikes-available");
  };

  return (
    <div className="hero">
      {/* Overlay */}
      <div className="hero-overlay"></div>

      {/* Content */}
      <div className="hero-content">
        <h1>Rent Your Electric Bike Today</h1>
        <p>
          Explore the city effortlessly and boost your delivery game with our
          affordable electric bike rentals.
        </p>
        <button className="cta-button" onClick={handleSeeBikes}>
          See Bikes
        </button>
      </div>
    </div>
  );
};

export default HeroLanding;
