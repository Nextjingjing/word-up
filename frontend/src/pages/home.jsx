import React from "react";
import Stack from "react-bootstrap/Stack";
import { Container, Row, Col } from "react-bootstrap";

// import component
import GameCard from "../components/GameCard";

const data = [
  {
    name: "Oxford 3000 words",
    content:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley",
    img: "public/test.png"
  },
  
];

function Home() {
  return (
    <Container className="p-4">
      <Row>
        {data.map((item, index) => (
          <Col key={index} md={4} className="mb-3">
            <GameCard name={item.name} content={item.content} img={item.img} />
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default Home;
