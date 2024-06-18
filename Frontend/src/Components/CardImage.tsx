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

const CardImage = ({ artwork }: { artwork: Artwork }) => {
  console.log(artwork.thumbnail?.lqip);

  const [imageSrc, setImageSrc] = useState(artwork.thumbnail.lqip);
  const [imageLoaded, setImageLoaded] = useState(false);

  const highResImageSrc = `https://www.artic.edu/iiif/2/${artwork.image_id}/full/843,/0/default.jpg`;

  useEffect(() => {
    const img = new Image();
    img.src = highResImageSrc;
    img.onload = () => {
      setImageSrc(highResImageSrc);
      setImageLoaded(true);
    };
  }, [highResImageSrc]);

  return (
    <Card.Img
      variant="top"
      src={imageSrc}
      style={{ maxHeight: "500px", objectFit: "cover" }}
      className={imageLoaded ? "loaded" : "loading"}
    />
  );
};

export default CardImage;
