import React, { useState, useEffect } from 'react';
import { Container, Spinner, Alert } from 'react-bootstrap';
import { jobApi } from '../services/api';
import JobCard from '../components/JobCard';
import SearchBar from '../components/SearchBar';
import toast from 'react-hot-toast';

const HomePage = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchJobs();
  }, []);

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (searchTerm !== undefined) {
        fetchJobs(searchTerm);
      }
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [searchTerm]);

  const fetchJobs = async (search = '') => {
    try {
      setLoading(true);
      const response = await jobApi.getAllJobs(search);
      setJobs(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch jobs. Please try again later.');
      toast.error('Failed to fetch jobs');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (jobId) => {
    try {
      await jobApi.deleteJob(jobId);
      setJobs(jobs.filter(job => job._id !== jobId));
    } catch (err) {
      toast.error('Failed to delete job');
    }
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  return (
    <Container className="py-4">
      <h1 className="text-center mb-4">All Jobs</h1>
      
      <SearchBar onSearch={handleSearch} />

      {loading && (
        <div className="text-center">
          <Spinner animation="border" variant="primary" />
        </div>
      )}

      {error && <Alert variant="danger">{error}</Alert>}

      {!loading && !error && jobs.length === 0 && (
        <Alert variant="info">No jobs found.</Alert>
      )}

      {!loading && !error && jobs.map(job => (
        <JobCard key={job._id} job={job} onDelete={handleDelete} />
      ))}
    </Container>
  );
};

export default HomePage;