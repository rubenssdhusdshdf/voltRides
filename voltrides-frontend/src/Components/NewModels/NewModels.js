import React, { useEffect, useState } from 'react';
import { getNewModels } from '../../Services/api.js'; // Import the API function
import '../NewModels/NewModels.css';

const NewModels = () => {
  const [models, setModels] = useState([]); // State to store models
  const [loading, setLoading] = useState(true); // State for loading indicator
  const [error, setError] = useState(null); // State for error handling

  useEffect(() => {
    const fetchModels = async () => {
      try {
        const modelsData = await getNewModels(); // Fetch models from the backend
        setModels(modelsData); // Update state with fetched data
        setLoading(false); // Disable loading
      } catch (error) {
        console.error("Error fetching new models:", error);
        setError("Failed to fetch models. Please try again later.");
        setLoading(false); // Disable loading
      }
    };

    fetchModels(); // Fetch data on component mount
  }, []);

  if (loading) {
    return <div className="text-center">Loading models...</div>;
  }

  if (error) {
    return <div className="text-center text-danger">{error}</div>;
  }

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Best Models to Rent</h1>
      <div className="row">
        {models.map((model) => (
          <div className="col-md-4 mb-4" key={model.id}>
            <div className="card h-100">
              <div className="card-body">
                <h5 className="card-title">{model.name}</h5>
                <p className="card-text">
                  <strong>Type:</strong> {model.type}
                </p>
                <p className="card-text">
                  <strong>Price per Week:</strong> €{model.pricePerWeek}
                </p>
                <p className="card-text">
                  <strong>Location:</strong> {model.location}
                </p>
                <button className="btn btn-primary">Rent Now</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewModels;
