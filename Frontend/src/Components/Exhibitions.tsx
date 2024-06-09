import React, { useState } from "react";
import {
  getExhibitionsFromLocalStorage,
  setExhibitionsToLocalStorage,
} from "../utils/exhibitionStorage";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { Container, Row, Col, Card } from "react-bootstrap";

type Exhibition = {
  name: string;
  path: string;
  description: string;
};

export default function Exhibitions() {
  const [exhibitions, setExhibitions] = useState<Exhibition[]>(
    getExhibitionsFromLocalStorage()
  );

  const [show, setShow] = useState(false);
  const [exhibitionName, setExhibitionName] = useState("");
  const [exhibitionDescription, setExhibitionDescription] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleCreate = () => {
    if (exhibitionName.trim()) {
      const newExhibitionList = [
        ...exhibitions,
        {
          name: exhibitionName.trim(),
          description: exhibitionDescription.trim(),
          path: `/exhibitions/${exhibitionName.trim()}`,
        },
      ];
      setExhibitions(newExhibitionList);
      setExhibitionsToLocalStorage(newExhibitionList);
      setExhibitionName("");
      setExhibitionDescription("");
      handleClose();
    }
  };

  return (
    <>
      <Container>
        <Row className="mt-4">
          {exhibitions.map((exhibition, index) => (
            <Col key={index} xs={12} sm={6} md={4} className="mb-4">
              <Card className="rounded-0 rounded-top-2 shadow-sm">
                <Card.Body>
                  <Card.Title>{exhibition.name}</Card.Title>
                  <Card.Text>{exhibition.description}</Card.Text>
                </Card.Body>
              </Card>
              <Button className="w-75 rounded-0" variant="secondary">
                View exhibition
              </Button>
              <Button className="w-25 rounded-0" variant="danger">
                Delete
              </Button>
            </Col>
          ))}
        </Row>
        <Button onClick={handleShow} variant="primary">
          New Exhibition
        </Button>
      </Container>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create New Exhibition</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formExhibitionName">
              <Form.Label>Exhibition Name</Form.Label>
              <Form.Control
                className="mb-2"
                type="text"
                placeholder="Enter name"
                value={exhibitionName}
                onChange={(e) => setExhibitionName(e.target.value)}
              />
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                type="text"
                placeholder="Enter description"
                value={exhibitionDescription}
                onChange={(e) => setExhibitionDescription(e.target.value)}
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
}
