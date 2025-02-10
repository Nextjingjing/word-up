import { Container, Row, Col, Spinner } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import axios from "axios";

// import component
import GameCard from "../components/GameCard";

function Home() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/challenge`)
      .then((response) => {
        setData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  return (
    <Container className="p-4">
      <Row>
        {loading ? (
          <Spinner animation="border" role="status" className="m-auto">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        ) : (
          data.map((item) => (
            <Col key={item._id} md={4} className="mb-3">
              <GameCard
                name={item.name}
                content={item.content}
                img={item.img}
                challengeID={item._id}
              />
            </Col>
          ))
        )}
      </Row>
    </Container>
  );
}

export default Home;
