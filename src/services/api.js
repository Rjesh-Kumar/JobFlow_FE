import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'https://job-flow-be.vercel.app/api';

const api = axios.create({
  baseURL: API_URL,
  // withCredentials: true,  // Comment out for now if CORS issues
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