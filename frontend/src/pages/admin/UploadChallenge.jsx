import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Container, Card, Form, Button, Spinner, Alert } from "react-bootstrap";

const API_URL = import.meta.env.VITE_API_URL;

const UploadChallenge = () => {
  const [name, setName] = useState("");
  const [content, setContent] = useState("");
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  
  const user = useSelector((state) => state.user);
  const navigate = useNavigate(); // ✅ Use navigate for redirect

  // ✅ Redirect if the user is not an admin
  useEffect(() => {
    if (!user.isAdmin) {
      navigate("/"); // Redirect to home if not an admin
    }
  }, [user, navigate]);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !content || !file) {
      setMessage("❌ Please fill in all fields.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("content", content);
      formData.append("file", file);

      const res = await axios.post(`${API_URL}/api/challenge/upload`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });

      setMessage("✅ Challenge uploaded successfully!");
      setName("");
      setContent("");
      setFile(null);
    } catch (error) {
      console.error("Error uploading challenge:", error);
      setMessage("❌ Upload failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="d-flex justify-content-center mt-5">
      <Card style={{ width: "40rem" }} className="shadow-lg">
        <Card.Body>
          <h2 className="text-center mb-4">📌 Upload Challenge</h2>
          {message && (
            <Alert variant={message.includes("successfully") ? "success" : "danger"}>
              {message}
            </Alert>
          )}
          <Form onSubmit={handleSubmit} encType="multipart/form-data">
            <Form.Group className="mb-3">
              <Form.Label>📍 Challenge Name:</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter challenge name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>📜 Description:</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter challenge description"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>📸 Upload Image:</Form.Label>
              <Form.Control type="file" accept="image/*" onChange={handleFileChange} required />
            </Form.Group>

            <Button variant="primary" type="submit" disabled={loading} className="w-100">
              {loading ? (
                <>
                  <Spinner animation="border" size="sm" /> Uploading...
                </>
              ) : (
                "📤 Upload"
              )}
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default UploadChallenge;
