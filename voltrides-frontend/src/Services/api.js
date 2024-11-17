import axios from 'axios';

// Create an Axios instance with a base URL for all API requests
const api = axios.create({
  baseURL: 'http://localhost:8080',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Function to fetch a greeting message (if needed)
export const fetchHello = async () => {
  try {
    const response = await api.get('/hello');
    return response.data;
  } catch (error) {
    console.error('Error fetching data from /hello:', error);
    throw error.response?.data || 'Failed to fetch greeting';
  }
};

// Function to sign up a user
export const signUpUser = async (userData) => {
  try {
    const response = await api.post('/api/signup', userData);
    if (response.status === 200 || response.status === 201) {
      return response.data;
    } else {
      throw new Error('Failed to sign up user.');
    }
  } catch (error) {
    console.error('Error signing up user:', error);
    throw error.response?.data || 'An error occurred during sign-up';
  }
};

// Function to sign in a user (future implementation)
export const signInUser = async (userData) => {
  try {
    const response = await api.post('/api/signin', userData);
    return response.data;
  } catch (error) {
    console.error('Error signing in user:', error);
    throw error.response?.data || 'An error occurred during sign-in';
  }
};
