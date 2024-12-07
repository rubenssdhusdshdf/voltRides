import React from "react";
import { useNavigate } from "react-router-dom";
import HeroLanding from "../../Components/HeroLanding/HeroLanding.js"; 
import NewModels from "../../Components/NewModels/NewModels.js"; 
import HowWorks from "../../Components/HowWorks/HowWorks.js";
import Nav from "../../Components/Nav/Nav.js";
import Footer from "../../Components/Footer/Footer.js";
import "./Home.css"; 


const Home = () => {
  const navigate = useNavigate(); // Hook for navigation

  const handleSeeMore = () => {
    navigate("/bikes-available"); // Navigate to the models page
  };

  return (
    <div>
      <Nav /> 
      <HeroLanding />
      <NewModels />
      <HowWorks />
      <Footer />
    </div>
  );
};

export default Home;
