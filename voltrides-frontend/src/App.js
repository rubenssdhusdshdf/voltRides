import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Nav from './Nav/Nav.js'; // Navigation bar component
import Login from './Pages/Login/Login.js' // Login page component
import BikesAvailable from './Pages/BikesAvailable/BikesAvailable.js'; // Bikes available page component
import Rent from './Pages/Rent/Rent.js'; // Rent my bike page component
import HeroLanding from './HeroLanding/HeroLanding.js'; // Hero section component
import NewModels from './NewModels/NewModels.js'; // New Models section component
import HowWorks from './HowWorks/HowWorks.js'; // How it Works section component
import Footer from './Footer/Footer.js'; // Footer component
import { fetchHello } from './Services/api.js';
import './App.css'; // Global styles

function App() {
  const [message, setMessage] = useState('');

  // Fetch data from the backend when the component mounts
  useEffect(() => {
    const getData = async () => {
      try {
        const data = await fetchHello(); // Fetch data from API
        setMessage(data); // Store response in state
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    getData(); // Invoke the function
  }, []);

  return (
    <Router>
      <div>
        {/* Navigation bar displayed on all pages */}
        <Nav />

        {/* Routes for different pages */}
        <Routes>
          <Route path="/" element={<HeroLanding />} />
          <Route path="/login" element={<Login />} />
          <Route path="/bikes-available" element={<BikesAvailable />} />
          <Route path="/rent" element={<Rent />} />
        </Routes>

        {/* Footer displayed on all pages */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;
