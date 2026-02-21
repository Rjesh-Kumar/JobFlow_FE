import React, { useState } from 'react';
import { Container, Form, Button, Card, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { jobApi } from '../services/api';
import toast from 'react-hot-toast';

const PostJobPage = () => {
  const navigate = useNavigate();
  const [validated, setValidated] = useState(false);
  const [formData, setFormData] = useState({
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
      
      await jobApi.createJob(jobData);
      toast.success('Job posted successfully!');
      navigate('/');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to post job');
    }
  };

  return (
    <Container className="py-4">
      <Card className="shadow">
        <Card.Header as="h2" className="bg-primary text-white">
          Post a Job
        </Card.Header>
        <Card.Body>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Job Title</Form.Label>
              <Form.Control
                type="text"
                name="jobTitle"
                placeholder="e.g., Senior Software Engineer"
                value={formData.jobTitle}
                onChange={handleChange}
                required
              />
              <Form.Control.Feedback type="invalid">
                Please provide a job title.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Company Name</Form.Label>
              <Form.Control
                type="text"
                name="companyName"
                placeholder="e.g., TechCorp"
                value={formData.companyName}
                onChange={handleChange}
                required
              />
              <Form.Control.Feedback type="invalid">
                Please provide a company name.
              </Form.Control.Feedback>
            </Form.Group>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Location</Form.Label>
                  <Form.Control
                    type="text"
                    name="location"
                    placeholder="e.g., San Francisco, CA"
                    value={formData.location}
                    onChange={handleChange}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide a location.
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Salary</Form.Label>
                  <Form.Control
                    type="number"
                    name="salary"
                    placeholder="e.g., 120000"
                    value={formData.salary}
                    onChange={handleChange}
                    required
                    min="0"
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide a valid salary.
                  </Form.Control.Feedback>
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
                placeholder="Describe the job responsibilities, requirements, etc."
                value={formData.jobDescription}
                onChange={handleChange}
                required
              />
              <Form.Control.Feedback type="invalid">
                Please provide a job description.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label>Job Qualifications</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="qualifications"
                placeholder="Enter each qualification on a new line"
                value={formData.qualifications}
                onChange={handleChange}
                required
              />
              <Form.Text className="text-muted">
                Enter each qualification on a new line
              </Form.Text>
              <Form.Control.Feedback type="invalid">
                Please provide qualifications.
              </Form.Control.Feedback>
            </Form.Group>

            <div className="d-flex gap-2">
              <Button variant="primary" type="submit">
                Post Job
              </Button>
              <Button variant="secondary" type="button" onClick={() => navigate('/')}>
                Cancel
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default PostJobPage;