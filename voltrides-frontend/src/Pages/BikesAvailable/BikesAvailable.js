import React, { useEffect, useState } from "react";
import { getAllBikes } from "../../Services/api.js"; // Import the API function
import "../BikesAvailable/BikesAvailable.css";

const BikesAvailable = () => {
  const [bikes, setBikes] = useState([]); // State to store bikes data
  const [loading, setLoading] = useState(true); // State for loading indicator
  const [error, setError] = useState(null); // State for handling errors

  useEffect(() => {
    const fetchBikes = async () => {
      try {
        const bikesData = await getAllBikes(); // Fetch bikes data from API
        console.log("Fetched bikes:", bikesData); // Log fetched data for debugging
        setBikes(bikesData); // Update bikes state with fetched data
        setLoading(false); // Disable loading
      } catch (error) {
        console.error("Error fetching bikes:", error); // Log error
        setError("Failed to fetch bikes. Please try again later.");
        setLoading(false); // Disable loading even on error
      }
    };

    fetchBikes(); // Call the function to fetch bikes on component mount
  }, []);

  // Render loading state
  if (loading) {
    return <div className="text-center">Loading bikes...</div>;
  }

  // Render error state
  if (error) {
    return <div className="text-center text-danger">{error}</div>;
  }

  // Render bikes as cards
  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Bikes Available</h1>
      <div className="row">
        {bikes.map((bike) => (
          <div className="col-md-4 mb-4" key={bike.id}>
            <div className="card h-100">
              <div className="card-body">
                <h5 className="card-title">{bike.name}</h5>
                <p className="card-text">
                  <strong>Type:</strong> {bike.type}
                </p>
                <p className="card-text">
                  <strong>Price per Week:</strong> €{bike.pricePerWeek}
                </p>
                <p className="card-text">
                  <strong>Years of Use:</strong> {bike.yearsOfUse}
                </p>
                <p className="card-text">
                  <strong>Location:</strong> {bike.location}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BikesAvailable;
