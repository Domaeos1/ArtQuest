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
  description: string;
  url: string;
}

const ArtList = () => {
  const [artData, setArtData] = useState<Artwork[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const fetchArtData = async (page: number, searchTerm: string) => {
    setIsLoading(true);
    try {
      const response = await fetchClevelandApiData(page, searchTerm);
      const data = response.data.data;
      setArtData((prevData) => (page === 1 ? data : [...prevData, ...data]));
    } catch (error) {
      console.error("Error fetching artwork data", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchArtData(currentPage, searchTerm);
  }, [currentPage]);

  const handleLoadMore = () => setCurrentPage((prevPage) => prevPage + 1);

  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchTerm) {
      setCurrentPage(1);

      fetchArtData(1, searchTerm);
    }
  };
  return (
    <Container className="mt-4">
      <h1 style={{ textAlign: "center", marginBottom: "20px" }}>
        Cleveland Museum of Art
      </h1>
      <Form onSubmit={(e) => handleSearch(e)}>
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
            <Button type="submit">Submit</Button>
          </Col>
        </Row>
      </Form>
      {artData.length === 0 && !isLoading && (
        <h5 className="text-center">
          No artwork was found for the search term "{searchTerm}"
        </h5>
      )}
      <Row className="mt-4">
        {artData.map((artwork: Artwork, index) => (
          <Col key={index} sm={12} md={6} lg={6} className="mb-4">
            <Card>
              <Card.Img
                variant="top"
                src={artwork.images.web.url}
                alt={artwork.title}
                style={{ maxHeight: "500px", objectFit: "cover" }}
              />
              <Card.Body>
                <Link className="text-decoration-none" to={artwork.url}>
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
                  {/* <p className="mt-2">{artwork.description}</p> */}
                  <Card.Text
                    className="mt-2"
                    dangerouslySetInnerHTML={{ __html: artwork.description }}
                  />
                </Card.Text>
                <Row>
                  <Col>
                    <Button variant="secondary">Add to Collection</Button>{" "}
                    <Button variant="secondary">Add to Exhibition</Button>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      {isLoading && <h3>Loading data...</h3>}
      {artData.length > 0 && (
        <Row className="justify-content-center m-4">
          <Button
            disabled={isLoading}
            className="w-25"
            variant="primary"
            onClick={handleLoadMore}
          >
            Load More
          </Button>
        </Row>
      )}
    </Container>
  );
};

export default ArtList;
