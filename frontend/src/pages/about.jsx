import React from "react";

function About() {
  return (
    <div className="d-flex justify-content-center bg-light">
      <div className="card shadow-lg p-4 text-center" style={{ maxWidth: "600px" }}>
        <div className="card-body">
          <h1 className="card-title text-primary mb-3">About Word Up</h1>
          <p className="card-text text-muted">
            Welcome to <span className="fw-bold">Word Up</span>, your ultimate platform for expanding your vocabulary and mastering new languages.
            Whether you're learning for travel, business, or personal growth, we provide the tools you need to succeed.
          </p>
          <p className="text-secondary">
            Our mission is to make learning engaging, fun, and accessible to everyone. Join us on this journey and elevate your language skills today!
          </p>
        </div>
      </div>
    </div>
  );
}

export default About;