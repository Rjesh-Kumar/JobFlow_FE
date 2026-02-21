import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

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