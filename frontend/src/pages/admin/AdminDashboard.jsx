import React, { useEffect, useState } from "react";
import { Container, Table, Button, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const AdminDashboard = () => {
  const [challenges, setChallenges] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`${API_URL}/api/challenge`)
      .then((response) => {
        setChallenges(response.data);
        setLoading(false);
      })
      .catch((error) => console.error("Error fetching challenges:", error));
  }, []);

  return (
    <Container>
      <h2 className="my-4">Admin Dashboard</h2>
      <Link to="/admin/upload">
        <Button variant="primary" className="mb-3">+ Upload Challenge</Button>
      </Link>

      {loading ? (
        <Spinner animation="border" />
      ) : (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Challenge Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {challenges.map((challenge, index) => (
              <tr key={challenge._id}>
                <td>{index + 1}</td>
                <td>{challenge.name}</td>
                <td>
                  <Link to={`/admin/edit/${challenge._id}`}>
                    <Button variant="warning" className="me-2">Edit</Button>
                  </Link>
                  <Link to={`/admin/delete/${challenge._id}`}>
                    <Button variant="danger">Delete</Button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
};

export default AdminDashboard;
