import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import { useSelector, useDispatch } from "react-redux";
import { clearUser } from "../features/userSlice";
import logo from "../assets/logo/logo.svg";

export const NavCustom = () => {
  const user = useSelector((state) => state.user);
  console.log(user)
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/user/logout`, {
        method: "POST",
        credentials: "include", // Ensure cookies are sent
      });

      if (response.ok) {
        dispatch(clearUser()); // Clear user state
      } else {
        console.error("Logout failed");
      }
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <Navbar expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="/" className="d-flex align-items-center">
          <img
            src={logo}
            alt="Logo"
            width="60"
            height="60"
            className="rounded-circle shadow border border-primary me-2"
          />
          Word Up
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/about">About</Nav.Link>
          </Nav>

          <Nav className="ms-auto d-flex align-items-center">
            {user.id ? (
              <>
                <h2 className="text-light me-3">👋 {user.username}</h2>
                <Button variant="danger" onClick={handleLogout}>
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Nav.Link href="/login">
                  <Button variant="outline-light" className="me-2">
                    Login
                  </Button>
                </Nav.Link>
                <Nav.Link href="/register">
                  <Button variant="primary">Register</Button>
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
