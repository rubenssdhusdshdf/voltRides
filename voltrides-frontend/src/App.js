import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Nav from './Components/Nav/Nav';
import Footer from './Components/Footer/Footer';
import Login from './Pages/Login/Login.js';
import Home from './Pages/Home/Home.js'
import HeroLanding from './Components/HeroLanding/HeroLanding.js';

import BikesAvailable from './Pages/BikesAvailable/BikesAvailable';
import Rent from './Pages/Rent/Rent.js';
import { fetchHello } from '../src/Services/api.js';

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
          <Route path="/" element={<Home />} />
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
