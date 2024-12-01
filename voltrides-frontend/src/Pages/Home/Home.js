import React from "react";
import HeroLanding from "../../Components/HeroLanding/HeroLanding.js"; // Import your HeroLanding component
import NewModels from "../../Components/NewModels/NewModels.js"; // Import your NewModels component

const Home = () => {
  return (
    <div>
      {/* Hero Section */}
      <HeroLanding />

      {/* New Models Section */}
      <NewModels />
    </div>
  );
};

export default Home;
