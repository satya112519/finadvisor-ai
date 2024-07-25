import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5400/' // Adjust the base URL as needed
});

api.interceptors.response.use(
    response => response,
    error => {
      console.error('API Error:', error.response ? error.response.data : error.message);
      return Promise.reject(error);
    }
  );

export const validateLogin = (user_details) => api.post('/login', user_details);
export const processQuery = (query_details) => api.post('/process_query', query_details);