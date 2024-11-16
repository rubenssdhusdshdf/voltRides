// src/services/api.js
import axios from 'axios';


const api = axios.create({
  baseURL: 'http://localhost:8080', // Backend url
});


export default api;


// Function to call the /hello endpoint
export const fetchHello = async () => {
    try {
      const response = await api.get('/hello'); // This calls your backend endpoint
      return response.data; // Returns the response data
    } catch (error) {
      console.error("Error fetching data from /hello endpoint:", error);
      throw error;
    }
  };
