import React, { useEffect, useState } from "react";
import { getAllBikes } from "../../Services/api.js";
import Navbar from "../../Components/Nav/Nav.js";
import Footer from "../../Components/Footer/Footer";
import Filter from "../../Components/Filter/Filter";
import "../BikesAvailable/BikesAvailable.css";

const BikesAvailable = () => {
  const [bikes, setBikes] = useState([]);
  const [filteredBikes, setFilteredBikes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [bikesPerPage] = useState(10);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBikes = async () => {
      try {
        const bikesData = await getAllBikes();
        setBikes(bikesData);
        setFilteredBikes(bikesData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching bikes:", error);
        setError("Failed to fetch bikes. Please try again later.");
        setLoading(false);
      }
    };

    fetchBikes();
  }, []);

  const handleFilter = (criteria) => {
    const filtered = bikes.filter((bike) => {
      const matchesType =
        !criteria.bikeTypes.length || criteria.bikeTypes.includes(bike.type);
      const matchesPrice =
        !criteria.pricePerWeek ||
        bike.pricePerWeek <= Number(criteria.pricePerWeek);
      const matchesYears =
        !criteria.yearsOfUse || bike.yearsOfUse <= Number(criteria.yearsOfUse);

      return matchesType && matchesPrice && matchesYears;
    });

    setFilteredBikes(filtered);
    setCurrentPage(1); // Reset to the first page after filtering
  };

  const indexOfLastBike = currentPage * bikesPerPage;
  const indexOfFirstBike = indexOfLastBike - bikesPerPage;
  const currentBikes = filteredBikes.slice(indexOfFirstBike, indexOfLastBike);

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= Math.ceil(filteredBikes.length / bikesPerPage)) {
      setCurrentPage(pageNumber);
    }
  };

  if (loading) return <div className="text-center">Loading bikes...</div>;
  if (error) return <div className="text-center text-danger">{error}</div>;

  return (
    <div className="wrapper">
      <Navbar />
      <div className="container mt-5 content">
        <h1 className="text-center mb-4">Bikes Available</h1>
        <Filter onFilter={handleFilter} />
        <div className="row">
          {currentBikes.map((bike) => (
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
        {/* Pagination */}
        <div className="pagination-container">
          <div className="pagination">
            <button
              className={`page-btn ${currentPage === 1 ? "disabled" : ""}`}
              onClick={() => handlePageChange(currentPage - 1)}
            >
              &laquo;
            </button>
            {Array.from(
              { length: Math.ceil(filteredBikes.length / bikesPerPage) },
              (_, index) => (
                <button
                  key={index}
                  className={`page-btn ${
                    currentPage === index + 1 ? "active" : ""
                  }`}
                  onClick={() => handlePageChange(index + 1)}
                >
                  {index + 1}
                </button>
              )
            )}
            <button
              className={`page-btn ${
                currentPage === Math.ceil(filteredBikes.length / bikesPerPage)
                  ? "disabled"
                  : ""
              }`}
              onClick={() => handlePageChange(currentPage + 1)}
            >
              &raquo;
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default BikesAvailable;
