import React, { useState } from "react";
import {
  getExhibitionsFromLocalStorage,
  setExhibitionsToLocalStorage,
} from "../utils/exhibitionStorage";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

type Exhibition = {
  name: string;
  path: string;
};

export default function Exhibitions() {
  const [exhibitions, setExhibitions] = useState<Exhibition[]>(
    getExhibitionsFromLocalStorage()
  );

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
      <div>
        {exhibitions.map((exhibition, index) => {
          return <div key={index}>{exhibition.name}</div>;
        })}
        <Button onClick={handleShow} variant="primary">
          New Exhibition
        </Button>{" "}
      </div>

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
}
