import React, { useEffect, useState } from 'react';
import Nav from './Nav/Nav.js'; // Navigation bar component
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
    <div className="App">
      
      <Nav />
      <HeroLanding />
      <NewModels />
      <HowWorks />
      <Footer />

      {/* Debug Message */}
      <main>
        <p>{message ? message : 'Loading...'}</p>
      </main>
    </div>
  );
}

export default App;
