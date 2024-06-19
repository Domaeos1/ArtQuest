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
import {
  getCollectionsFromLocalStorage,
  setCollectionsToLocalStorage,
} from "../utils/collectionsStorage";

interface Artwork {
  id: number;
  title: string;
  date_start: number;
  image_id: string;
  date_display: string;
  department_title: string;
  place_of_origin: string;
  artist_display: string;
  api_link: string;
  description: string;
}

const ChicagoArtList = () => {
  const [artData, setArtData] = useState<Artwork[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [filterTerm, setFilterTerm] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [addedArtworks, setAddedArtworks] = useState(
    getCollectionsFromLocalStorage()
  );

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
    fetchArtData(currentPage, searchTerm, filterTerm, sortBy);
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

  const handleFilterClick = async (filter: string) => {
    setSearchTerm("");
    setFilterTerm(filter);
    setSortBy("");
    setIsLoading(true);
    const response = await fetchChicagoApiData(1, "", filter);
    const data = response.data.data.filter(
      (artwork: Artwork) => artwork.department_title === filter
    );
    setArtData(data);
    setIsLoading(false);
    console.log(artData);
  };

  const handleSortClick = (sort: string) => {
    setCurrentPage(1);
    setSortBy(sort);

    setArtData((prevData) => {
      const sortedData = [...prevData]; // Create a copy of the previous data
      if (sort === "Oldest first") {
        sortedData.sort((a, b) => a.date_start - b.date_start);
      } else {
        sortedData.sort((a, b) => b.date_start - a.date_start);
      }
      return sortedData;
    });
  };

  const handleReset = () => {
    setCurrentPage(1);
    setSearchTerm("");
    setFilterTerm("");
    setSortBy("");
    fetchArtData(currentPage, searchTerm);
  };

  const handleAddToCollection = (artwork: Artwork) => {
    const newArtwork = {
      id: artwork.id,
      title: artwork.title,
      description: artwork.description,
      artist: artwork.artist_display,
      origin: artwork.place_of_origin,
      department: artwork.department_title,
      url: artwork.api_link,
      image_src: `https://www.artic.edu/iiif/2/${artwork.image_id}/full/843,/0/default.jpg`,
      created_at: artwork.date_display,
    };
    const currentCollections = getCollectionsFromLocalStorage();

    if (!currentCollections.some((item) => item.id === artwork.id)) {
      const updatedCollections = [...currentCollections, newArtwork];
      setCollectionsToLocalStorage(updatedCollections);
      setAddedArtworks(updatedCollections);
    }
  };

  return (
    <Container className="mt-4">
      <h1 style={{ textAlign: "center", marginBottom: "20px" }}>
        Art Institute of Chicago{" "}
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
          <Dropdown.Toggle
            variant={filterTerm ? "success" : "secondary"}
            id="dropdown-basic"
          >
            {filterTerm || "Filter by department"}
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item
              onClick={() => handleFilterClick("Prints and Drawings")}
            >
              Prints and Drawings
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() =>
                handleFilterClick("Painting and Sculpture of Europe")
              }
            >
              Painting and Sculpture of Europe
            </Dropdown.Item>
            <Dropdown.Item onClick={() => handleFilterClick("Arts of Asia")}>
              Arts of Asia
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() => handleFilterClick("Photography and Media")}
            >
              Photography and Media
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>

        <Dropdown className="mt-2">
          <Dropdown.Toggle
            variant={sortBy ? "success" : "secondary"}
            id="dropdown-basic"
          >
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
                <Link
                  className="text-decoration-none"
                  to={`https://www.artic.edu/artworks/${artwork.id}`}
                >
                  <Card.Title>{artwork.title}</Card.Title>
                </Link>
                <Card.Text>
                  <strong>Creation Date:</strong> {artwork.date_display} <br />
                  <strong>Department:</strong> {artwork.department_title} <br />
                  <strong>Place of origin:</strong> {artwork.place_of_origin}{" "}
                  <br />
                  <strong>Creator: </strong>
                  {artwork.artist_display}
                </Card.Text>
                <Card.Text
                  className="mt-2"
                  dangerouslySetInnerHTML={{ __html: artwork.description }}
                />
                <Col className="d-flex gap-2">
                  <Button
                    onClick={() => handleAddToCollection(artwork)}
                    variant={
                      addedArtworks.some((item) => item.id === artwork.id)
                        ? "success"
                        : "secondary"
                    }
                  >
                    {addedArtworks.some((item) => item.id === artwork.id)
                      ? "Added to Collections"
                      : "Add to Collection"}
                  </Button>
                  <Button variant="secondary">Add to Exhibition</Button>
                </Col>
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

