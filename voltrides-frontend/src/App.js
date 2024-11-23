import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Nav from './Components/Nav/Nav';
import HeroLanding from './Components/HeroLanding/HeroLanding';
import NewModels from './Components/NewModels/NewModels.js';
import HowWorks from './Components/HowWorks/HowWorks.js';
import Footer from './Components/Footer/Footer';
import Login from './Pages/Login/Login';
import BikesAvailable from './Pages/BikesAvailable/BikesAvailable';
import Rent from './Pages/Rent/Rent.js';
import { fetchHello } from './Services/api.js';
import MyProfile from './Pages/MyProfile/MyProfile.js'
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
          <Route path="/profile" element={<MyProfile />} />


        </Routes>

        {/* Footer displayed on all pages */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;
