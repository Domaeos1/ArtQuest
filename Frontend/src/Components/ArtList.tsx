import { Container, Form, Row, Col, Button, Card } from "react-bootstrap";

import { useEffect, useState } from "react";
import { fetchClevelandApiData } from "../utils/fetchApiData";

export default function ArtList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchOption, setSearchOption] = useState("Artist");
  const [artData, setArtData] = useState([]);

  const handleSearch = (e, searchTerm, searchOption) => {
    e.preventDefault();
    // Handle the search based on searchTerm and searchOption
    console.log(`Searching for ${searchTerm} by ${searchOption}`);
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchClevelandApiData();
        setArtData(response.data.data);
      } catch (error) {
        console.error("Error fetching artwork data", error);
      }
    };

    fetchData();
  }, []);

  interface Artwork {
    title: string;
    creation_date: string;
    department: string;
    culture: string;
    technique: string;
    creators: [];
    images: {};
  }

  return (
    <>
      <Container className="mt-4">
        <h1 style={{ textAlign: "center", marginBottom: "20px" }}>
          The Cleveland Museum of Art
        </h1>

        <Form onSubmit={(e) => handleSearch(e, searchTerm, searchOption)}>
          <Row className="justify-content-center">
            <Col xs="6" md="6">
              <Form.Control
                type="text"
                placeholder="Search"
                className="mr-sm-2"
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </Col>
            <Col xs="auto">
              <Form.Select
                value={searchOption}
                onChange={(e) => setSearchOption(e.target.value)}
              >
                <option value="Title">Title</option>
                <option value="Artist">Artist</option>
                <option value="Location">Location</option>
              </Form.Select>
            </Col>
            <Col xs="auto">
              <Button type="submit">Submit</Button>
            </Col>
          </Row>
        </Form>

        <Row className="mt-4">
          {artData.map((artwork: Artwork, index) => (
            <Col key={index} sm={12} md={6} lg={4} className="mb-4">
              <Card>
                <Card.Img
                  variant="top"
                  src={artwork.images.web.url}
                  alt={artwork.title}
                />
                <Card.Body>
                  <Card.Title>{artwork.title}</Card.Title>
                  <Card.Text>
                    <strong>Creation Date:</strong> {artwork.creation_date}{" "}
                    <br />
                    <strong>Department:</strong> {artwork.department} <br />
                    <strong>Culture:</strong> {artwork.culture} <br />
                    <strong>Technique:</strong> {artwork.technique} <br />
                    <strong>Creators:</strong>{" "}
                    {artwork.creators
                      .map((creator) => creator.description)
                      .join(", ")}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
}
