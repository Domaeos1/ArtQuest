import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavLink } from "react-router-dom";

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
            <Nav.Link as={NavLink} to="/">
              Home
            </Nav.Link>
            <Nav.Link as={NavLink} to="/collections">
              Collections
            </Nav.Link>
            <Nav.Link as={NavLink} to="/exhibitions">
              Exhibitions
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
