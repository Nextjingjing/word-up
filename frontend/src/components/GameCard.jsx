import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";

function GameCard({ name, content, img, challengeID }) {
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
