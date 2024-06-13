import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button, Form } from "react-bootstrap";
import { fetchClevelandApiData } from "../utils/fetchApiData";
import { Link } from "react-router-dom"; // Import Link from react-router-dom

interface Artwork {
  title: string;
  creation_date: string;
  department: string;
  culture: string;
  technique: string;
  creators: { description: string }[];
  images: { web: { url: string } };
}

const ArtList = () => {
  const [artData, setArtData] = useState<Artwork[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchOption, setSearchOption] = useState("Title");

  const fetchArtData = async (page: number) => {
    try {
      const response = await fetchClevelandApiData(page);
      return response.data.data;
    } catch (error) {
      console.error("Error fetching artwork data", error);
      return [];
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchArtData(currentPage);
      setArtData((prevData) => [...prevData, ...data]); // Append new data to existing artData
    };

    fetchData();
  }, [currentPage]);

  const handleLoadMore = () => {
    setCurrentPage(currentPage + 1);
  };
  const handleSearch = (
    e: React.FormEvent<HTMLFormElement>,
    searchTerm: string,
    searchOption: string
  ) => {
    e.preventDefault();
    // Handle search logic here
    console.log(`Searching for ${searchTerm} by ${searchOption}`);
  };
  return (
    <Container className="mt-4">
      <h1 style={{ textAlign: "center", marginBottom: "20px" }}>
        Cleveland Museum of Art
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
                style={{ maxHeight: "500px", objectFit: "cover" }}
              />
              <Card.Body>
                <Link to={`/artwork/${artwork.id}`}>
                  <Card.Title>{artwork.title}</Card.Title>
                </Link>
                <Card.Text>
                  <strong>Creation Date:</strong> {artwork.creation_date} <br />
                  <strong>Department:</strong> {artwork.department} <br />
                  <strong>Culture:</strong> {artwork.culture} <br />
                  <strong>Technique:</strong> {artwork.technique} <br />
                  <strong>Creator:</strong>{" "}
                  {artwork.creators
                    .map((creator) => creator.description)
                    .join(", ")}
                </Card.Text>
                <Row>
                  <Col>
                    {/* <Button variant="primary">View Details</Button>{" "} */}
                    <Button variant="secondary">Add to Collection</Button>{" "}
                    <Button variant="secondary">Add to Exhibition</Button>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <Row className="justify-content-center m-4">
        <Button className="w-25" variant="primary" onClick={handleLoadMore}>
          Load More
        </Button>
      </Row>
    </Container>
  );
};

export default ArtList;
