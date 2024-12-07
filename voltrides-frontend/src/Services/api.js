import axios from 'axios';

// Axios instance for base URL
const api = axios.create({
  baseURL: 'http://localhost:8080', // Backend URL
  headers: {
    "Content-Type": "application/json", // Set content type
  },
  withCredentials: true, // Include credentials if required
});

export default api;

/**
 * Login a user
 * @param {Object} userData - The user data for login
 */
export const loginUser = async (userData) => {
  try {
    const response = await api.post('/api/auth/login', userData);
    return response.data; // Return backend response (e.g., "Login successful.")
  } catch (error) {
    if (error.response) {
      return error.response.data; // Return backend error message
    }
    throw error; // Re-throw unexpected errors
  }
};

/**
 * Sign up a new user
 * @param {Object} userData - The user data for signup
 */
export const signUpUser = async (userData) => {
  try {
    const response = await api.post('/api/auth/register', userData);
    return response.data; // Return the response message
  } catch (error) {
    if (error.response) {
      return error.response.data; // Return backend error message
    }
    throw error; // Re-throw unexpected errors
  }
};

/**
 * Submit bike data to the backend
 * @param {Object} bikeData - The data of the bike to be submitted
 */
export const submitBikeData = async (bikeData) => {
  try {
    const response = await api.post("/api/bikes", bikeData);
    return response.data; // Return the response data
  } catch (error) {
    console.error("Error submitting bike data:", error);
    throw error; // Re-throw the error to handle it in the calling component
  }
};

/**
 * Fetch all bikes from the backend
 */
export const getAllBikes = async () => {
  try {
    const response = await api.get("/api/bikes");
    return response.data; // Return all bikes
  } catch (error) {
    console.error("Error fetching all bikes:", error);
    throw error;
  }
};

// Example implementation of getNewModels
export const getNewModels = async () => {
  try {
    const response = await api.get('/api/models'); // Use the Axios instance
    return response.data; // Return the models data
  } catch (error) {
    console.error("Error in getNewModels:", error);
    throw error; // Re-throw the error for handling in the component
  }
};

