import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Card, Form, Button, Spinner, Alert } from "react-bootstrap";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const EditChallenge = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [content, setContent] = useState("");
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch All Challenges & Find the Correct One
  useEffect(() => {
    axios.get(`${API_URL}/api/challenge`, { withCredentials: true })
      .then(response => {
        const foundChallenge = response.data.find(challenge => challenge._id === id);
        if (foundChallenge) {
          setName(foundChallenge.name);
          setContent(foundChallenge.content);
        } else {
          setMessage("❌ Challenge not found.");
        }
      })
      .catch(error => {
        console.error("❌ Error fetching challenge:", error);
        setMessage("❌ Failed to load challenge data.");
      });
  }, [id]);

  // Handle File Selection
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  // Handle Update Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("content", content);
      if (file) {
        formData.append("file", file); // ✅ Include file if selected
      }

      await axios.patch(`${API_URL}/api/challenge/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });

      setMessage("✅ Challenge updated successfully!");
      navigate("/admin"); // ✅ Redirect after update

    } catch (error) {
      console.error("❌ Error updating challenge:", error);
      setMessage("❌ Update failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="d-flex justify-content-center mt-5">
      <Card style={{ width: "40rem" }} className="shadow-lg">
        <Card.Body>
          <h2 className="text-center mb-4">✏️ Edit Challenge</h2>
          
          {message && (
            <Alert variant={message.includes("successfully") ? "success" : "danger"}>
              {message}
            </Alert>
          )}

          <Form onSubmit={handleSubmit} encType="multipart/form-data">
            <Form.Group className="mb-3">
              <Form.Label>📍 Challenge Name</Form.Label>
              <Form.Control 
                type="text" 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                required 
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>📜 Description</Form.Label>
              <Form.Control 
                as="textarea" 
                rows={3} 
                value={content} 
                onChange={(e) => setContent(e.target.value)} 
                required 
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>📸 Update Image (optional)</Form.Label>
              <Form.Control type="file" accept="image/*" onChange={handleFileChange} />
            </Form.Group>

            <Button type="submit" variant="primary" className="w-100" disabled={loading}>
              {loading ? (
                <>
                  <Spinner animation="border" size="sm" /> Saving...
                </>
              ) : (
                "✅ Save Changes"
              )}
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default EditChallenge;
