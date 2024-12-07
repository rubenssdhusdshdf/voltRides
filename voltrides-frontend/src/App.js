import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Page Components
import Login from './Pages/Login/Login.js';
import Home from './Pages/Home/Home.js';
import BikesAvailable from './Pages/BikesAvailable/BikesAvailable.js';
import Rent from './Pages/Rent/Rent.js';
import MyProfile from './Pages/MyProfile/MyProfile.js';

// Styles
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
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/bikes-available" element={<BikesAvailable />} />
          <Route path="/rent" element={<Rent />} />
          <Route path="/profile" element={<MyProfile />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
