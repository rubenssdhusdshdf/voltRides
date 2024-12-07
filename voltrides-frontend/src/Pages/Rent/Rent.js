import React, { useState } from "react";
import "../Rent/Rent.css";
import { submitBikeData } from "../../Services/api.js"; 
import Nav from "../../Components/Nav/Nav.js";
import Footer from "../../Components/Footer/Footer.js";

const BikeForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    location: "",
    yearsOfUse: "",
    pricePerWeek: "",
  });

  const [errors, setErrors] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);

  const validateField = (name, value) => {
    switch (name) {
      case "name":
        return value.trim() === "" ? "Bike name is required" : "";
      case "type":
        return value.trim() === "" ? "Bike type is required" : "";
      case "location":
        return value.trim() === "" ? "Location is required" : "";
      case "yearsOfUse":
        return value <= 0 ? "Years of use must be greater than 0" : "";
      case "pricePerWeek":
        return value <= 0 ? "Price per week must be greater than 0" : "";
      default:
        return "";
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });

    setErrors({
      ...errors,
      [name]: validateField(name, value),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate all fields before submission
    const newErrors = {};
    Object.keys(formData).forEach((key) => {
      const error = validateField(key, formData[key]);
      if (error) {
        newErrors[key] = error;
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Submit the form data
    try {
      console.log("Submitting data:", formData);
      await submitBikeData(formData);
      console.log("Form submitted successfully!");

      // Show success modal
      setIsModalOpen(true);

      // Reset the form
      setFormData({
        name: "",
        type: "",
        location: "",
        yearsOfUse: "",
        pricePerWeek: "",
      });
    } catch (error) {
      console.error("Error submitting the form:", error);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <Nav />
      <form onSubmit={handleSubmit}>
        <h2>Rent My Bike</h2>

        <label>
          Bike Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
          {errors.name && <p className="error">{errors.name}</p>}
        </label>

        <label>
          Years of Use:
          <input
            type="number"
            name="yearsOfUse"
            value={formData.yearsOfUse}
            onChange={handleChange}
          />
          {errors.yearsOfUse && <p className="error">{errors.yearsOfUse}</p>}
        </label>

        <label>
          Price per Week (€):
          <input
            type="number"
            name="pricePerWeek"
            value={formData.pricePerWeek}
            onChange={handleChange}
          />
          {errors.pricePerWeek && <p className="error">{errors.pricePerWeek}</p>}
        </label>

        <label>
          Location (Eircode):
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
          />
          {errors.location && <p className="error">{errors.location}</p>}
        </label>

        <label>
          Bike Type:
          <select name="type" value={formData.type} onChange={handleChange}>
            <option value="">Select Type</option>
            <option value="road">Road Bike</option>
            <option value="mountain">Mountain Bike</option>
            <option value="hybrid">Hybrid</option>
            <option value="electric">Electric Bike</option>
            <option value="other">Other</option>
          </select>
          {errors.type && <p className="error">{errors.type}</p>}
        </label>

        <button type="submit">Submit</button>
      </form>

      {/* Modal */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Congratulations!</h3>
            <p>
              You have successfully published an ad. Please note that if you
              have not logged in, the ad may not be displayed yet.
            </p>
            <button onClick={closeModal}>Close</button>
          </div>
        </div>
      )}
      < Footer />
    </div>
  );
};

export default BikeForm;
