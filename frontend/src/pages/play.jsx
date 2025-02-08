import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { VocabCard } from "../components/VocabCard";

export const Play = () => {
  const { challengeId } = useParams();
  const [data, setData] = useState([]);
  const [indexVocab, setIndexVocab] = useState(0);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/challenge/${challengeId}`)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [challengeId]);

  return (
    <Container
      fluid
      className="d-flex flex-column align-items-center"
      style={{ height: "50vh", marginTop: "4rem" }}
    >
      <Card
        style={{ maxWidth: "500px", width: "100%" }}
        className="shadow p-3 mb-4 bg-white rounded text-center"
      >
        <Card.Body>
          <Card.Title className="mb-3">
            คำศัพท์ข้อที่ {indexVocab + 1} / {data.length}
          </Card.Title>
          <VocabCard
            english={data[indexVocab]?.english || ""}
            thai={data[indexVocab]?.thai || ""}
          />
        </Card.Body>
      </Card>

      <div className="d-flex gap-2 align-items-center">
        <Button
          variant="secondary"
          onClick={() => setIndexVocab((prev) => prev - 1)}
          disabled={indexVocab === 0}
        >
          Previous
        </Button>

        <Button
          variant="success"
          onClick={() => setIndexVocab((prev) => prev + 1)}
          disabled={indexVocab === data.length - 1}
        >
          Next
        </Button>
      </div>
    </Container>
  );
};
