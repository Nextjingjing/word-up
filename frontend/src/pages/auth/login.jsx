import React, { useState } from "react";
import { useNavigate } from "react-router-dom";   
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import axios from "axios";
import { setUser } from "../../features/userSlice";
import { useSelector, useDispatch } from "react-redux";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/user/login`,
        { email, password },
        { 
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      dispatch(setUser({ 
        id: response.data.user.id, 
        username: response.data.user.username, 
        email: response.data.user.email,
        isAdmin: response.data.user.isAdmin,
      }))

      navigate("/");
    } catch (error) {
      console.error("Login Failed:", error.response?.data || error.message);
      setError(error.response?.data?.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="d-flex flex-column align-items-center justify-content-center" style={{ height: "50vh", marginTop: "2rem" }}>
      <h1 className="mb-4">Login</h1>
      <Form className="w-50" onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control 
            type="email" 
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required 
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control 
            type="password" 
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required 
          />
        </Form.Group>

        {error && <p className="text-danger text-center">{error}</p>}

        <div className="d-flex justify-content-center mb-3">
          <Button variant="primary" type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Submit"}
          </Button>
        </div>
        
        <p className="text-center">
          Don't have an account? <span className="text-primary" style={{cursor: "pointer"}} onClick={() => navigate("/register")}>Register here</span>
        </p>
      </Form>
    </Container>
  );
};