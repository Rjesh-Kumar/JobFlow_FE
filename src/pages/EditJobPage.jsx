import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Card, Row, Col } from 'react-bootstrap';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { jobApi } from '../services/api';
import toast from 'react-hot-toast';

const EditJobPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [validated, setValidated] = useState(false);
  const [formData, setFormData] = useState(location.state?.job || {
    jobTitle: '',
    companyName: '',
    location: '',
    salary: '',
    jobType: 'Full-time (On-site)',
    jobDescription: '',
    qualifications: ''
  });

  const jobTypes = [
    'Full-time (On-site)',
    'Part-time (On-site)',
    'Full-time (Remote)',
    'Part-time (Remote)'
  ];

  useEffect(() => {
    if (!location.state?.job) {
      fetchJob();
    }
  }, []);

  const fetchJob = async () => {
    try {
      const response = await jobApi.getJobById(id);
      setFormData(response.data);
    } catch (err) {
      toast.error('Failed to fetch job details');
      navigate('/');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    
    if (form.checkValidity() === false) {
      e.stopPropagation();
      setValidated(true);
      return;
    }

    try {
      const jobData = {
        ...formData,
        salary: Number(formData.salary)
      };
      
      await jobApi.updateJob(id, jobData);
      toast.success('Job updated successfully!');
      navigate(`/job/${id}`);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to update job');
    }
  };

  return (
    <Container className="py-4">
      <Button 
        variant="outline-primary" 
        onClick={() => navigate(`/job/${id}`)} 
        className="mb-4"
      >
        ← Back to Job Details
      </Button>

      <Card className="shadow">
        <Card.Header as="h2" className="bg-warning text-dark">
          Edit Job
        </Card.Header>
        <Card.Body>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Job Title</Form.Label>
              <Form.Control
                type="text"
                name="jobTitle"
                value={formData.jobTitle}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Company Name</Form.Label>
              <Form.Control
                type="text"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Location</Form.Label>
                  <Form.Control
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Salary</Form.Label>
                  <Form.Control
                    type="number"
                    name="salary"
                    value={formData.salary}
                    onChange={handleChange}
                    required
                    min="0"
                  />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3">
              <Form.Label>Job Type</Form.Label>
              <Form.Select
                name="jobType"
                value={formData.jobType}
                onChange={handleChange}
                required
              >
                {jobTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Job Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                name="jobDescription"
                value={formData.jobDescription}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label>Job Qualifications</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="qualifications"
                value={formData.qualifications}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <div className="d-flex gap-2">
              <Button variant="warning" type="submit">
                Update Job
              </Button>
              <Button variant="secondary" type="button" onClick={() => navigate(`/job/${id}`)}>
                Cancel
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default EditJobPage;