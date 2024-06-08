import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { searchForPieces } from "../API/fetchArtData";
import axios from "axios";

export default function Pieces() {
  const [searchTerm, setSearchTerm] = useState("");
  const [ids, setIDs] = useState([]);
  const [pieces, setPieces] = useState([]);

  function fetchSearch() {
    if (searchTerm) {
      axios
        .get(
          `https://collectionapi.metmuseum.org/public/collection/v1/search?q=${searchTerm}`
        )
        .then((res) => {
          setIDs(() => {
            if (res.data) {
              return [...res.data.objectIDs];
            }
          });
        })
        .catch((e) => {
          console.log(e);
        })
        .finally(() => {
          console.log(ids);
        });
    }
  }

  useEffect(() => {
    if (Array.isArray(ids) && ids.length) {
      const fetchData = async () => {
        const promiseArray = ids.map((id) =>
          axios.get(
            `https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`
          )
        );

        const results = await Promise.allSettled(promiseArray);

        const fulfilledResults = results
          .filter((result) => result.status === "fulfilled")
          .map((result) => result.value.data);

        setPieces(fulfilledResults);
      };
      fetchData();
    }
  }, [ids]);

  useEffect(() => {
    console.log(pieces);
  }, [pieces]);

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    fetchSearch();
  }

  return (
    <>
      <Form onSubmit={handleSearch}>
        <Form.Control
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        ></Form.Control>
        <Button type="submit">Search</Button>
      </Form>
    </>
  );
}
