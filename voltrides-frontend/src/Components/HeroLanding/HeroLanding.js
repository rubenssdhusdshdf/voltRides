import React from 'react';
import '../HeroLanding/HeroLanding.css';

const HeroLanding = () => {
  return (
    <section className="hero">
      <div className="hero-content">
        <h1>Rent Your Electric Bike Today</h1>
        <p>
          Explore the city effortlessly and boost your delivery game with our affordable electric bike rentals.
        </p>
        <a href="#bikes" className="cta-button">See Bikes</a>
      </div>
    </section>
  );
};

export default HeroLanding;
