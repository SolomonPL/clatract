import axios from 'axios';

// Determine the base URL based on the environment
const API_URL = import.meta.env.PROD 
  ? '/api' // In production, the API is at the same domain but with /api path
  : 'http://localhost:3000/api'; // In development, use localhost with the server port

// Create an axios instance with the base URL
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Important for cookies/auth
});

// Add a request interceptor to add auth token if it exists
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api; 