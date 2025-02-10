import React, { useState } from "react";
import { Container, Form, Button, Alert, Spinner } from "react-bootstrap";
import { useParams } from "react-router-dom";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const AddVocab = () => {
  const { id } = useParams(); // ดึง challenge ID จาก URL
  const [english, setEnglish] = useState("");
  const [thai, setThai] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    setError(null);

    try {
      const response = await axios.post(`${API_URL}/api/challenge/vocab/${id}`, {
        english,
        thai,
      },
      {withCredentials: true,});

      setMessage("Vocab added successfully!");
      setEnglish("");
      setThai("");
    } catch (err) {
      setError("Failed to add vocab. Please try again. Maybe you should logout and try again.");
      console.error("Error adding vocab:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <h2 className="my-4">Add Vocab</h2>
      
      {message && <Alert variant="success">{message}</Alert>}
      {error && <Alert variant="danger">{error}</Alert>}

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>English Word</Form.Label>
          <Form.Control
            type="text"
            value={english}
            onChange={(e) => setEnglish(e.target.value)}
            placeholder="Enter English word"
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Thai Word</Form.Label>
          <Form.Control
            type="text"
            value={thai}
            onChange={(e) => setThai(e.target.value)}
            placeholder="Enter Thai word"
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit" disabled={loading}>
          {loading ? <Spinner size="sm" animation="border" /> : "Add Vocab"}
        </Button>
      </Form>
    </Container>
  );
};

export default AddVocab;
