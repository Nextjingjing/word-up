import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Form, Button, Spinner, Alert } from "react-bootstrap";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const EditChallenge = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [content, setContent] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    axios.get(`${API_URL}/api/challenge/${id}`, { withCredentials: true })
      .then(response => {
        setName(response.data.name);
        setContent(response.data.content);
      })
      .catch(error => console.error("Error fetching challenge:", error));
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.patch(`${API_URL}/api/challenge/${id}`, { name, content }, {
        withCredentials: true,
      });

      setMessage("✅ Challenge updated successfully!");
      setTimeout(() => navigate("/admin"), 1500);
    } catch (error) {
      console.error("Error updating challenge:", error);
      setMessage("❌ Update failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <h2>Edit Challenge</h2>
      {message && <Alert variant={message.includes("successfully") ? "success" : "danger"}>{message}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Challenge Name</Form.Label>
          <Form.Control type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control as="textarea" rows={3} value={content} onChange={(e) => setContent(e.target.value)} required />
        </Form.Group>
        <Button type="submit" variant="success" disabled={loading}>
          {loading ? <Spinner animation="border" size="sm" /> : "Save Changes"}
        </Button>
      </Form>
    </Container>
  );
};

export default EditChallenge;
