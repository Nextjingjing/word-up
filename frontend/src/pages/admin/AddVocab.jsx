import React, { useState, useEffect } from "react";
import {
  Container,
  Form,
  Button,
  Alert,
  Spinner,
  ListGroup,
} from "react-bootstrap";
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
  const [vocabs, setVocabs] = useState([]); // ✅ กำหนดค่าเริ่มต้นเป็น []

  // ✅ โหลด Vocab ทั้งหมดของ Challenge
  useEffect(() => {
    const fetchVocabs = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${API_URL}/api/challenge/${id}`);
        setVocabs(response.data || []); // ✅ ใช้ response.data ตรงๆ
      } catch (err) {
        console.error("Error fetching vocabs:", err);
        setError("Failed to load vocab list.");
      } finally {
        setLoading(false);
      }
    };

    fetchVocabs(); // ✅ เรียกฟังก์ชันโหลด Vocab ที่นี่
  }, [id]); // ✅ โหลดใหม่เมื่อ id เปลี่ยน

  // ✅ ฟังก์ชันเพิ่ม Vocab
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    setError(null);

    try {
      const response = await axios.post(
        `${API_URL}/api/challenge/vocab/${id}`,
        { english, thai },
        { withCredentials: true }
      );

      setMessage("Vocab added successfully!");
      setEnglish("");
      setThai("");
      setVocabs([...vocabs, response.data]); // ✅ เพิ่ม vocab ใหม่เข้า list
      const response2 = await axios.get(`${API_URL}/api/challenge/${id}`);
      setVocabs(response2.data || []);
    } catch (err) {
      setError("Failed to add vocab. Please logout and try again.");
      console.error("Error adding vocab:", err);
    } finally {
      setLoading(false);
    }
  };

  // ✅ ฟังก์ชันลบ Vocab
  const handleDelete = async (vocabId) => {
    try {
      await axios.delete(`${API_URL}/api/challenge/vocab/${vocabId}`, {
        withCredentials: true,
      });

      // ✅ อัปเดตรายการ vocabs โดยกรอง vocab ที่ถูกลบออกไป
      setVocabs(vocabs.filter((v) => v._id !== vocabId));
    } catch (err) {
      console.error("Error deleting vocab:", err);
      setError("Failed to delete vocab.");
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

      {/* ✅ แสดงสถานะ Loading เมื่อโหลดข้อมูล */}
      {loading && <p>Loading vocabs...</p>}

      {/* ✅ แสดงรายการ Vocab */}
      <h3 className="mt-4">Vocab List</h3>
      <ListGroup>
        {vocabs.length === 0 ? (
          <p>No vocabs found.</p>
        ) : (
          vocabs.map((vocab) => (
            <ListGroup.Item
              key={vocab._id}
              className="d-flex justify-content-between align-items-center"
            >
              <span>
                <strong>{vocab.english}</strong> - {vocab.thai}
              </span>
              <Button
                variant="danger"
                size="sm"
                onClick={() => handleDelete(vocab._id)}
              >
                Delete
              </Button>
            </ListGroup.Item>
          ))
        )}
      </ListGroup>
    </Container>
  );
};

export default AddVocab;
