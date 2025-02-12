import { useEffect, useState } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";

function GameCard({ name, content, img, challengeID }) {
  const [hasPlayed, setHasPlayed] = useState(false);

  useEffect(() => {
    const checkIfPlayed = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/success`, {
          withCredentials: true, // ✅ ส่ง cookies หรือ token ไปกับ request
        });

        if (response.data.success && response.data.data) {
          // ✅ ตรวจสอบว่า challengeID อยู่ใน success record หรือไม่
          const played = response.data.data.some((record) =>
            record.challengeIds.includes(challengeID)
          );
          setHasPlayed(played);
        }
      } catch (error) {
        console.error("Error fetching success data:", error);
      }
    };

    checkIfPlayed();
  }, [challengeID]);

  const linkPlay = challengeID ? `/play/${challengeID}` : "#";

  return (
    <Card style={{ width: "25rem" }}>
      <Card.Body>
        <Card.Img
          variant="top"
          src={`${import.meta.env.VITE_API_URL}/uploads/${img}`}
          className="w-25 h-25 d-block mx-auto"
        />
        <Card.Title>{name}</Card.Title>
        <Card.Text>{content}</Card.Text>

        {/* ✅ แสดง Badge ถ้าเคยเล่น */}
        {hasPlayed && (
          <span className="text-success fw-bold d-block text-center mb-2">
            ✓ Played
          </span>
        )}

        <Link to={linkPlay}>
          <Button variant="primary" className="d-block mx-auto">
            Let's go
          </Button>
        </Link>
      </Card.Body>
    </Card>
  );
}

export default GameCard;
