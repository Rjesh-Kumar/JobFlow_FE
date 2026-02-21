import axios from 'axios';

// Smart URL detection based on environment
const getBaseURL = () => {
  // Agar production environment hai (Vercel deploy)
  if (process.env.NODE_ENV === 'production') {
    // Pehle env variable check karo, nahi toh default production URL use karo
    return process.env.REACT_APP_API_URL || "https://jobflow-be.vercel.app/api";
  }
  
  // Local development mein
  return process.env.REACT_APP_API_URL || "http://localhost:5000/api";
};

const API_URL = getBaseURL();

console.log('Current Environment:', process.env.NODE_ENV);
console.log('API URL:', API_URL);

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for debugging
api.interceptors.request.use(request => {
  console.log(`${process.env.NODE_ENV} Request:`, request.method, request.url);
  return request;
});

// Response interceptor for debugging
api.interceptors.response.use(
  response => {
    console.log('Response:', response.status);
    return response;
  },
  error => {
    console.error('API Error:', error.response || error.message);
    return Promise.reject(error);
  }
);

export const jobApi = {
  getAllJobs: (searchTerm) => 
    api.get('/jobs', { params: { search: searchTerm } }),
  
  getJobById: (id) => 
    api.get(`/jobs/${id}`),
  
  createJob: (jobData) => 
    api.post('/jobs', jobData),
  
  updateJob: (id, jobData) => 
    api.put(`/jobs/${id}`, jobData),  
  
  deleteJob: (id) => 
    api.delete(`/jobs/${id}`),
};

export default api;