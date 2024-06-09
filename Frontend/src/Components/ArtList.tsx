import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import { useState } from "react";

export default function ArtList() {
  const [searchTerm, setSearchTerm] = useState("");

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    // fetchSearch();
  }

  return (
    <Container className="mt-4">
      <Form onSubmit={handleSearch}>
        <Row>
          <Col xs="auto" className="w-75">
            <Form.Control
              type="text"
              placeholder="Search"
              className=" mr-sm-2"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </Col>
          <Col xs="auto">
            <Button type="submit">Submit</Button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
}
