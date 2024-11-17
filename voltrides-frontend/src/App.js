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
      <div className="App">
        <Nav />
        <Routes>
          {/* Route for the landing page */}
          <Route
            path="/"
            element={
              <>
                <HeroLanding />
                <NewModels />
                <HowWorks />
                <Footer />
              </>
            }
          />

          {/* Route for the Login page */}
          <Route path="/login" element={<Login />} />

          {/* Route for the Bikes Available page */}
          <Route path="/bikes-available" element={<BikesAvailable />} />

          {/* Route for the Rent My Bike page */}
          <Route path="/rent-my-bike" element={<RentMyBike />} />
        </Routes>

        {/* Display a message from the backend, if available */}
        <main>
          {message && <p>{message}</p>}
        </main>
      </div>
    </Router>
  );
}

export default App;
