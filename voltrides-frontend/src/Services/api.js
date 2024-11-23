import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080', // Backend URL
});

export default api;

// Function to call the /hello endpoint
export const fetchHello = async () => {
  try {
    const response = await api.get('/hello');
    return response.data;
  } catch (error) {
    console.error("Error fetching data from /hello endpoint:", error);
    throw error;
  }
};

// Function to sign up a user
export const signUpUser = async (userData) => {
  try {
    const response = await api.post('/api/signup', userData);
    return response;
  } catch (error) {
    console.error("Error signing up user:", error);
    throw error;
  }
};
