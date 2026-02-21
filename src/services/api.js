import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor for debugging
api.interceptors.request.use(request => {
  console.log('Starting Request:', request.url);
  return request;
});

api.interceptors.response.use(
  response => response,
  error => {
    console.error('API Error:', error.response || error);
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