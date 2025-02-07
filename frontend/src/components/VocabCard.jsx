import React, { useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import Container from "react-bootstrap/Container"; 

export const VocabCard = ({ english, thai }) => {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  return (
    <Container className="text-center my-4">
      <Carousel
        className="bg-dark text-white"
        activeIndex={index}
        onSelect={handleSelect}
        interval={null}
      >
        <Carousel.Item>
          <div className="d-flex justify-content-center align-items-center" style={{ height: "200px" }}>
            <h1>{english}</h1>
          </div>
        </Carousel.Item>
        <Carousel.Item>
          <div className="d-flex justify-content-center align-items-center" style={{ height: "200px" }}>
            <h1>{thai}</h1>
          </div>
        </Carousel.Item>
      </Carousel>
    </Container>
  );
};
