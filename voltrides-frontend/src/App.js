import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Nav from './Components/Nav/Nav';
import HeroLanding from './Components/HeroLanding/HeroLanding';
import NewModels from './Components/NewModels/NewModels';
import HowWorks from './Components/HowWorks/HowWorks';
import Footer from './Components/Footer/Footer';
import Login from './Pages/Login/Login';
import BikesAvailable from './Pages/BikesAvailable/BikesAvailable';
import RentMyBike from './Pages/RentBike/RentBike';
import { fetchHello } from './Services/api.js';
import './App.css';

function App() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await fetchHello();
        setMessage(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    getData();
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
