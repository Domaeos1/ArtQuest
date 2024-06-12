import { Container, Form, Row, Col, Button } from "react-bootstrap";

import { useEffect, useState } from "react";
import {
  fetchMetMuseumArt,
  fetchMetMuseumArtById,
} from "../utils/fetchApiData";

export default function ArtList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchOption, setSearchOption] = useState("Artist");
  const [ids, setIDs] = useState([]);
  const [artData, setArtData] = useState({});

  const handleSearch = (e, searchTerm, searchOption) => {
    e.preventDefault();
    // Handle the search based on searchTerm and searchOption
    console.log(`Searching for ${searchTerm} by ${searchOption}`);
  };
  useEffect(() => {
    const fetchData = async () => {
      const getIds = await fetchMetMuseumArt();
      console.log("====================================");
      console.log(getIds);
      console.log("====================================");
      const promiseArray = getIds.objectIDs
        .slice(0, 10)
        .map(async (id: string) => {
          try {
            const artObject = await fetchMetMuseumArtById(id);
            console.log("Fetched art object:", artObject);
            return artObject;
          } catch (error) {
            console.error(error);
            return null; // Return null for failed fetches
          }
        });
      const results = await Promise.all(promiseArray);
      console.log("====================================");
      console.log(results);
      console.log("====================================");
    };
    fetchData();
  }, []);

  useEffect(() => {
    // console.log(ids);
  }, []);

  return (
    <Container className="mt-4">
      <Form onSubmit={(e) => handleSearch(e, searchTerm, searchOption)}>
        <Row>
          <Col xs="auto" className="w-50">
            <Form.Control
              type="text"
              placeholder="Search"
              className="mr-sm-2"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </Col>
          <Col xs="auto" className="w-25">
            <Form.Select
              value={searchOption}
              onChange={(e) => setSearchOption(e.target.value)}
            >
              <option value="Artist">Artist</option>
              <option value="Title">Title</option>
              <option value="Location">Location</option>
            </Form.Select>
          </Col>
          <Col xs="auto">
            <Button type="submit">Submit</Button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
}
