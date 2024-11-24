import axios from 'axios';

// Axios instance for base URL
const api = axios.create({
  baseURL: 'http://localhost:8080', // Backend URL
  headers: {
    "Content-Type": "application/json", // Set content type
  },
  withCredentials: false, // Include credentials if required (e.g., cookies)
});

export default api;

// Fetch /hello endpoint
export const fetchHello = async () => {
  try {
    const response = await api.get('/hello');
    return response.data;
  } catch (error) {
    console.error("Error fetching data from /hello endpoint:", error);
    throw error;
  }
};

/**
 * Sign up a new user
 * @param {Object} userData - The user data for signup
 */
export const signUpUser = async (userData) => {
  try {
      const response = await api.post('/api/signup', userData);

      // Return the response data (message from the backend)
      return response.data; // "User registered successfully!" or "User registration failed."
  } catch (error) {
      console.error("Error signing up user:", error.response || error);
      throw error;
  }
};


/**
 * Log in a user
 * @param {Object} loginData - The user login data
 */
export const loginUser = async (loginData) => {
  try {
    const response = await api.post('/api/auth/login', loginData);
    return response.data;
  } catch (error) {
    console.error("Error logging in user:", error);
    throw error;
  }
};

/**
 * Submit bike data to the backend
 * @param {Object} bikeData - The data of the bike to be submitted
 */
export const submitBikeData = async (bikeData) => {
  try {
    const response = await api.post("/api/bikes", bikeData); // POST to /api/bikes
    return response.data; // Return the response data
  } catch (error) {
    console.error("Error submitting bike data:", error);
    throw error; // Re-throw the error to handle it in the calling component
  }
};
