import React, { useState } from "react";
import "../../Components/Filter/Filter.css";

const Filter = ({ onFilter, maxPrice = 200, maxYears = 100 }) => {
  const [filterCriteria, setFilterCriteria] = useState({
    bikeTypes: [],
    pricePerWeek: maxPrice,
    yearsOfUse: maxYears,
  });

  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const handleCheckboxChange = (type) => {
    setFilterCriteria((prev) => {
      const isChecked = prev.bikeTypes.includes(type);
      const updatedTypes = isChecked
        ? prev.bikeTypes.filter((t) => t !== type)
        : [...prev.bikeTypes, type];

      return { ...prev, bikeTypes: updatedTypes };
    });
  };

  const handleSliderChange = (e) => {
    const { name, value } = e.target;
    setFilterCriteria((prev) => ({ ...prev, [name]: value }));
  };

  const handleApplyFilters = () => {
    onFilter(filterCriteria);
  };

  const toggleFilterPanel = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  return (
    <div className={`filter-wrapper ${isFilterOpen ? "open" : ""}`}>
      {!isFilterOpen && (
        <button className="toggle-filter-btn" onClick={toggleFilterPanel}>
          Filters
        </button>
      )}

      {isFilterOpen && (
        <div className="filter-container open">
          <div className="filter-header">
            <h3>Filter Bikes</h3>
            <button className="close-filter-btn" onClick={toggleFilterPanel}>
              ✖
            </button>
          </div>

          <div className="filter-group">
            <h4>Bike Type</h4>
            <label>
              <input
                type="checkbox"
                value="road"
                onChange={() => handleCheckboxChange("road")}
              />
              Road Bike
            </label>
            <label>
              <input
                type="checkbox"
                value="mountain"
                onChange={() => handleCheckboxChange("mountain")}
              />
              Mountain Bike
            </label>
            <label>
              <input
                type="checkbox"
                value="hybrid"
                onChange={() => handleCheckboxChange("hybrid")}
              />
              Hybrid
            </label>
            <label>
              <input
                type="checkbox"
                value="electric"
                onChange={() => handleCheckboxChange("electric")}
              />
              Electric Bike
            </label>
            <label>
              <input
                type="checkbox"
                value="other"
                onChange={() => handleCheckboxChange("other")}
              />
              Other
            </label>
          </div>

          <div className="filter-group">
            <h4>Price per Week</h4>
            <input
              type="range"
              name="pricePerWeek"
              min="0"
              max={maxPrice}
              value={filterCriteria.pricePerWeek}
              onChange={handleSliderChange}
            />
            <p>Max Price: €{filterCriteria.pricePerWeek}</p>
          </div>

          <div className="filter-group">
            <h4>Years of Use</h4>
            <input
              type="range"
              name="yearsOfUse"
              min="0"
              max={maxYears}
              value={filterCriteria.yearsOfUse}
              onChange={handleSliderChange}
            />
            <p>Max Years: {filterCriteria.yearsOfUse}</p>
          </div>

          <button className="filter-apply-btn" onClick={handleApplyFilters}>
            Apply Filters
          </button>
        </div>
      )}
    </div>
  );
};

export default Filter;
