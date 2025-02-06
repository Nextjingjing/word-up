import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

// Logo
import logo from "../assets/logo/logo.svg";

export const NavCustom = () => {
  return (
    <Navbar expand="lg" bg="dark" variant="dark">
      <Container>
        <img
          src={logo}
          width="60"
          height="60"
          className="d-inline-block align-top rounded-circle shadow border border-primary"
          style={{margin: 5}}
        />
        <Navbar.Brand href="/">Word Up</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">

          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/home2">Home2</Nav.Link>
          </Nav>

        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
