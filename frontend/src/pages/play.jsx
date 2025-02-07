import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { VocabCard } from "../components/VocabCard";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";

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
      className="d-flex flex-column align-items-center min-vh-100"
    >
      <VocabCard
        english={data[indexVocab]?.english || ""}
        thai={data[indexVocab]?.thai || ""}
      />

      <div className="d-flex justify-content-center mt-4">
        <Button
          variant="secondary"
          className="me-2"
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
