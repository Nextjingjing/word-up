import Stack from "react-bootstrap/Stack";
import { Container, Row, Col } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import axios from "axios";

// import component
import GameCard from "../components/GameCard";

function Home() {

  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/challenge`)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <Container className="p-4">
      <Row>
        {data.map((item, index) => (
          <Col key={index} md={4} className="mb-3">
            <GameCard name={item.name} content={item.content} img={item.img} challengeID={item._id}/>
          </Col>  
        ))}
      </Row>
    </Container>
  );
}

export default Home;
