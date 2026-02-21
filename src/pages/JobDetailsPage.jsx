import React, { useState, useEffect, useCallback } from 'react';
import { Container, Card, ListGroup, Spinner, Alert, Button, Row, Col } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import { jobApi } from '../services/api';
import toast from 'react-hot-toast';

const JobDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchJobDetails = useCallback(async () => {
    try {
      setLoading(true);
      const response = await jobApi.getJobById(id);
      setJob(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch job details. Please try again later.');
      toast.error('Failed to fetch job details');
    } finally {
      setLoading(false);
    }
  }, [id]); // Added id as dependency

  useEffect(() => {
    fetchJobDetails();
  }, [fetchJobDetails]); // Added fetchJobDetails as dependency

  const handleEdit = () => {
    navigate(`/edit-job/${id}`, { state: { job } });
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this job?')) {
      try {
        await jobApi.deleteJob(id);
        toast.success('Job deleted successfully!');
        navigate('/');
      } catch (err) {
        toast.error('Failed to delete job');
      }
    }
  };

  if (loading) {
    return (
      <Container className="text-center py-5">
        <Spinner animation="border" variant="primary" />
      </Container>
    );
  }

  if (error || !job) {
    return (
      <Container className="py-5">
        <Alert variant="danger">{error || 'Job not found'}</Alert>
        <Button variant="primary" onClick={() => navigate('/')}>
          Back to Home
        </Button>
      </Container>
    );
  }

  // Safe check for qualifications
  const qualifications = job.qualifications 
    ? job.qualifications.split('\n').filter(q => q && q.trim()) 
    : [];

  return (
    <Container className="py-4">
      <Row className="mb-4">
        <Col xs={6}>
          <Button 
            variant="outline-primary" 
            onClick={() => navigate('/')}
          >
            ← Back to Jobs
          </Button>
        </Col>
        <Col xs={6} className="text-end">
          <Button 
            variant="warning" 
            onClick={handleEdit}
            className="me-2"
          >
            ✏️ Edit Job
          </Button>
          <Button 
            variant="danger" 
            onClick={handleDelete}
          >
            🗑️ Delete
          </Button>
        </Col>
      </Row>

      <Card className="shadow">
        <Card.Header as="h2" className="bg-primary text-white">
          {job.jobTitle}
        </Card.Header>
        <Card.Body>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <strong>Company Name:</strong> {job.companyName}
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>Location:</strong> {job.location}
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>Salary:</strong> ${job.salary?.toLocaleString()}
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>Job Type:</strong> {job.jobType}
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>Description:</strong>
              <p className="mt-2">{job.jobDescription}</p>
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>Qualifications:</strong>
              <ol className="mt-2">
                {qualifications.map((qual, index) => (
                  <li key={index}>{qual}</li>
                ))}
              </ol>
            </ListGroup.Item>
          </ListGroup>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default JobDetailsPage;