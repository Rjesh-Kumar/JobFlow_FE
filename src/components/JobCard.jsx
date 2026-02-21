import React from 'react';
import { Card, Button, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const JobCard = ({ job, onDelete }) => {
  const navigate = useNavigate();

  const handleSeeDetails = () => {
    navigate(`/job/${job._id}`);
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this job posting?')) {
      await onDelete(job._id);
      toast.success('Job deleted successfully!');
    }
  };

  return (
    <Card className="mb-3 shadow-sm">
      <Card.Body>
        <Row>
          <Col md={8}>
            <Card.Title className="h5 mb-3">{job.jobTitle}</Card.Title>
            <Card.Text className="mb-2">
              <strong>Company name:</strong> {job.companyName}<br />
              <strong>Location:</strong> {job.location}<br />
              <strong>Job Type:</strong> {job.jobType}
            </Card.Text>
          </Col>
          <Col md={4} className="d-flex align-items-center justify-content-end gap-2">
            <Button 
              variant="primary" 
              size="sm" 
              onClick={handleSeeDetails}
              className="me-2"
            >
              See Details
            </Button>
            <Button 
              variant="danger" 
              size="sm" 
              onClick={handleDelete}
            >
              Delete
            </Button>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default JobCard;