import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Form,
  Spinner,
  Dropdown,
} from "react-bootstrap";
import { fetchChicagoApiData } from "../utils/fetchApiData";
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
  sortable_date: Number;
}

const ChicagoArtList = () => {
  const [artData, setArtData] = useState<Artwork[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [filterTerm, setFilterTerm] = useState("");
  const [sortBy, setSortBy] = useState("");

  const fetchArtData = async (
    page: number,
    searchTerm?: string,
    filterTerm?: string,
    sortBy?: string
  ) => {
    setIsLoading(true);
    try {
      const response = await fetchChicagoApiData(
        page,
        searchTerm,
        filterTerm,
        sortBy
      );
      const data = response.data.data;

      const result = await Promise.all(
        data.map(async (artwork: Artwork) => {
          const response = await fetch(artwork.api_link);
          const result = await response.json();
          return result.data;
        })
      );

      setArtData((prevData) =>
        page === 1 ? result : [...prevData, ...result]
      );
    } catch (error) {
      console.error("Error fetching artwork data", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchArtData(currentPage, searchTerm);
  }, [currentPage]);

  const handleLoadMore = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handleSearch = () => {
    setCurrentPage(1);
    try {
      fetchArtData(currentPage, searchTerm);
    } catch (error) {
      console.error("Error fetching detailed artwork data", error);
    }
  };

  const handleFilterClick = (filter: string) => {
    setSearchTerm("");
    setCurrentPage(1);
    setFilterTerm(filter);
    fetchArtData(currentPage, "", filter);
  };

  const handleSortClick = (sort: string) => {
    setCurrentPage(1);
    setSortBy(sort);
    if (sort === "Oldest first") {
      artData.sort((a: any, b: any) => a.sortable_date - b.sortable_date);
    } else {
      artData.sort((a: any, b: any) => b.sortable_date - a.sortable_date);
      console.log(artData);
    }
  };

  const handleReset = () => {
    setCurrentPage(1);
    setSearchTerm("");
    setFilterTerm("");
    setSortBy("");
    fetchArtData(currentPage, searchTerm);
  };

  console.log(artData);

  return (
    <Container className="mt-4">
      <h1 style={{ textAlign: "center", marginBottom: "20px" }}>
        Art Institue of Chicago{" "}
      </h1>
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          handleSearch();
        }}
      >
        <Row className="justify-content-center">
          <Col xs="6" md="6">
            <Form.Control
              type="text"
              placeholder="Search artworks"
              className="mr-sm-2"
              onChange={(e) => setSearchTerm(e.target.value)}
              value={searchTerm}
            />
          </Col>
          <Col xs="auto">
            <Button type="submit">Search</Button>
          </Col>
        </Row>
      </Form>

      <div className="mt-2 d-flex gap-2 align-items-center">
        <Dropdown className="mt-2">
          <Dropdown.Toggle variant="secondary" id="dropdown-basic">
            {filterTerm || "Filter by department"}
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item onClick={() => handleFilterClick("African Art")}>
              African Art
            </Dropdown.Item>
            <Dropdown.Item onClick={() => handleFilterClick("Chinese Art")}>
              Chinese Art
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() =>
                handleFilterClick("Egyptian and Ancient Near Eastern Art")
              }
            >
              Egyptian and Ancient Near Eastern Art
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() =>
                handleFilterClick("European Painting and Sculpture")
              }
            >
              European Painting and Sculpture
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() => handleFilterClick("Decorative Art and Design")}
            >
              Decorative Art and Design
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>

        <Dropdown className="mt-2">
          <Dropdown.Toggle variant="secondary" id="dropdown-basic">
            {sortBy || "Sort by"}
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item onClick={() => handleSortClick("Oldest first")}>
              Oldest first
            </Dropdown.Item>
            <Dropdown.Item onClick={() => handleSortClick("Latest first")}>
              Latest first
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>

        <Dropdown id="dropdown-basic" className="mt-2">
          <Button onClick={handleReset} variant="danger">
            Reset
          </Button>
        </Dropdown>
      </div>

      {isLoading && (
        <div className="d-flex justify-content-center m-2">
          <Spinner animation="border" />
        </div>
      )}

      <Row className="mt-4">
        {artData.map((artwork: Artwork, index) => (
          <Col key={index} sm={6} md={6} lg={6} className="mb-4">
            <Card>
              <Card.Img
                variant="top"
                src={`https://www.artic.edu/iiif/2/${artwork.image_id}/full/843,/0/default.jpg`}
                onError={(e) =>
                  (e.currentTarget.src =
                    "https://upload.wikimedia.org/wikipedia/commons/d/d1/Image_not_available.png?20210219185637")
                }
                style={{ maxHeight: "500px", objectFit: "cover" }}
              />

              <Card.Body>
                <Link className="text-decoration-none" to={artwork.url}>
                  <Card.Title>{artwork.title}</Card.Title>
                </Link>
                <Card.Text>
                  <strong>Creation Date:</strong> {artwork.date_display} <br />
                  <strong>Department:</strong> {artwork.department_title} <br />
                  <strong>Place of origin:</strong> {artwork.place_of_origin}{" "}
                  <br />
                  {/* <strong>Technique:</strong> {artwork.technique} <br /> */}
                  <strong>Creator: </strong>
                  {artwork.artist_display}
                </Card.Text>
                <Card.Text
                  className="mt-2"
                  dangerouslySetInnerHTML={{ __html: artwork.description }}
                />
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
      {isLoading && artData.length > 0 && (
        <div className="d-flex justify-content-center m-2">
          <Spinner animation="border" />
        </div>
      )}
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
      {searchTerm && artData.length === 0 && !isLoading && (
        <h5 className="text-center">
          No artwork was found for the search term "{searchTerm}"
        </h5>
      )}
    </Container>
  );
};

export default ChicagoArtList;
