import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { setExhibitionsToLocalStorage } from "../utils/exhibitionStorage";

const NavBar: React.FC<{
  setExhibitions: (exhibitions: { name: string; path: string }[]) => void;
  exhibitions: { name: string; path: string }[];
}> = ({ setExhibitions, exhibitions }) => {
  const [show, setShow] = useState(false);
  const [exhibitionName, setExhibitionName] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleCreate = () => {
    if (exhibitionName.trim()) {
      const newExhibitionList = [
        ...exhibitions,
        {
          name: exhibitionName.trim(),
          path: `/exhibitions/${exhibitionName.trim()}`,
        },
      ];
      setExhibitions(newExhibitionList);
      setExhibitionsToLocalStorage(newExhibitionList);
      setExhibitionName("");
      handleClose();
    }
  };

  return (
    <>
      <Navbar
        sticky="top"
        bg="dark"
        data-bs-theme="dark"
        expand="md"
        className="bg-body-tertiary"
      >
        <Container>
          <Navbar.Brand href="/">ArtQuest</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="/collections">Collections</Nav.Link>
              <NavDropdown title="Exhibition" id="basic-nav-dropdown">
                {exhibitions.length === 0 ? (
                  <NavDropdown.Item>No Exhibitions</NavDropdown.Item>
                ) : (
                  exhibitions.map((exhibition, index) => (
                    <NavDropdown.Item key={index} href={exhibition.path}>
                      {exhibition.name}
                    </NavDropdown.Item>
                  ))
                )}
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={handleShow}>
                  Create new
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Modal for creating a new exhibition */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create New Exhibition</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formExhibitionName">
              <Form.Label>Exhibition Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter exhibition name"
                value={exhibitionName}
                onChange={(e) => setExhibitionName(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleCreate}>
            Create
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default NavBar;
