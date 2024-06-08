import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

const NavBar: React.FC = () => {
  return (
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
            <Nav.Link href="/exhibitions">Exhibitions</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
