import React, { useState } from 'react';
import '../Rent/Rent.css';

const Rent = () => {
  const [formData, setFormData] = useState({
    bikeModel: '',
    bikeType: '',
    pricePerWeek: '',
    location: '',
    features: {
      gps: false,
      lock: false,
      helmet: false,
      lights: false,
    },
    images: [],
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      features: {
        ...prevState.features,
        [name]: checked,
      },
    }));
  };

  const handleFileUpload = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      images: Array.from(e.target.files),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Data Submitted:', formData);
    // Add logic to send data to the backend
  };

  return (
    <div className="rent-container">
      <h2>Rent My Bike</h2>
      <form onSubmit={handleSubmit}>
        {/* Bike Model */}
        <div className="form-group">
          <label htmlFor="bikeModel">Bike Model:</label>
          <input
            type="text"
            id="bikeModel"
            name="bikeModel"
            value={formData.bikeModel}
            onChange={handleInputChange}
            required
          />
        </div>

        {/* Bike Type */}
        <div className="form-group">
          <label htmlFor="bikeType">Bike Type:</label>
          <select
            id="bikeType"
            name="bikeType"
            value={formData.bikeType}
            onChange={handleInputChange}
            required
          >
            <option value="">Select Bike Type</option>
            <option value="electric">Electric</option>
            <option value="mountain">Mountain</option>
            <option value="road">Road</option>
          </select>
        </div>

        {/* Price Per Week */}
        <div className="form-group">
          <label htmlFor="pricePerWeek">Price Per Week (€):</label>
          <input
            type="number"
            id="pricePerWeek"
            name="pricePerWeek"
            value={formData.pricePerWeek}
            onChange={handleInputChange}
            required
          />
        </div>

        {/* Location */}
        <div className="form-group">
          <label htmlFor="location">Location (Aircode):</label>
          <input
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleInputChange}
            required
          />
        </div>

        {/* Features */}
        <div className="form-group">
          <label>Features:</label>
          <div className="checkbox-group">
            <label>
              <input
                type="checkbox"
                name="gps"
                checked={formData.features.gps}
                onChange={handleCheckboxChange}
              />
              GPS
            </label>
            <label>
              <input
                type="checkbox"
                name="lock"
                checked={formData.features.lock}
                onChange={handleCheckboxChange}
              />
              Lock
            </label>
            <label>
              <input
                type="checkbox"
                name="helmet"
                checked={formData.features.helmet}
                onChange={handleCheckboxChange}
              />
              Helmet
            </label>
            <label>
              <input
                type="checkbox"
                name="lights"
                checked={formData.features.lights}
                onChange={handleCheckboxChange}
              />
              Lights
            </label>
          </div>
        </div>

        {/* Image Upload */}
        <div className="form-group">
          <label htmlFor="images">Upload Images:</label>
          <input
            type="file"
            id="images"
            name="images"
            multiple
            accept="image/*"
            onChange={handleFileUpload}
          />
        </div>

        <button type="submit" className="submit-button">Submit</button>
      </form>
    </div>
  );
};

export default Rent;
