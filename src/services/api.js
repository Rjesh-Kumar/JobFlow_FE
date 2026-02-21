import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: false,
  timeout: 10000 // 10 seconds timeout
});

// Request interceptor
api.interceptors.request.use(
  config => {
    console.log('🚀 Request:', config.method.toUpperCase(), config.url);
    return config;
  },
  error => {
    console.error('❌ Request Error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  response => {
    console.log('✅ Response:', response.status, response.config.url);
    return response;
  },
  error => {
    if (error.code === 'ERR_NETWORK') {
      console.error('❌ Network Error - Backend not reachable');
    } else if (error.response) {
      console.error('❌ API Error:', error.response.status, error.response.data);
    } else {
      console.error('❌ Error:', error.message);
    }
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