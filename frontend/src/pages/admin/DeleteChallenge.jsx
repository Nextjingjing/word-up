import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const DeleteChallenge = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios.delete(`${API_URL}/api/challenge/${id}`, {
      withCredentials: true, // ✅ Ensure authentication
    })
    .then(() => navigate("/admin"))
    .catch(error => console.error("Error deleting challenge:", error));
  }, [id, navigate]);

  return null; // No UI needed, just auto-delete and redirect
};

export default DeleteChallenge;
