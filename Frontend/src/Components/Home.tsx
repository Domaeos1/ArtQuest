import { clearExhibitionsFromLocalStorage } from "../utils/exhibitionStorage";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import artInstituteOfChicagoImage from "../assets/wide_med_art-institute-of-chicago-01-2.jpg";
import metMuseumImage from "../assets/metmuseum-1200x630.webp";
import { useNavigate } from "react-router-dom";

export default function Home() {
  let navigate = useNavigate();

  function handleClick(apiName: string) {
    navigate(`/${apiName}`);
  }

  return (
    <div>
      <button
        onClick={() => clearExhibitionsFromLocalStorage()}
        className="mb-3"
      >
        Reset Local Cache
      </button>
      <Container>
        <p>
          Welcome to ArtQuest – your gateway to a world of artistic
          masterpieces! At ArtQuest, we celebrate the timeless beauty and
          cultural significance of art by showcasing a diverse collection of
          artworks and pieces from renowned museums worldwide. Whether you are
          an art enthusiast, a student, or a professional curator, ArtQuest
          offers a rich and immersive experience tailored to your interests.
        </p>
      </Container>
      <Container>
        <h2 className="text-center">Let's explore...</h2>
        <Row className="mt-4 justify-content-center">
          <Col xs={10} sm={12} md={4} className="mb-4">
            <Card className="h-100">
              <Card.Img
                variant="top"
                src={metMuseumImage}
                className="img-fluid"
                style={{ height: "200px", objectFit: "cover" }}
              />
              <Card.Body>
                <Card.Title>The Met Museum</Card.Title>
                <Card.Text>
                  The Metropolitan Museum of Art, colloquially referred to as
                  the Met, is an encyclopedic art museum in New York City. It is
                  the largest art museum in the Americas and the fourth-largest
                  in the world.{" "}
                </Card.Text>
              </Card.Body>
              <Button
                onClick={() => handleClick("metmuseum")}
                className="w-100 rounded-0"
                variant="primary"
              >
                Browse
              </Button>
            </Card>
          </Col>
          <Col xs={10} sm={12} md={4} className="mb-4">
            <Card className="h-100">
              <Card.Img
                variant="top"
                src={artInstituteOfChicagoImage}
                className="img-fluid"
                style={{ height: "200px", objectFit: "cover" }}
              />
              <Card.Body>
                <Card.Title>Art Institute of Chicago</Card.Title>
                <Card.Text>
                  The Art Institute of Chicago is an architectural artifact that
                  represents Chicago’s rich history of educating young artists
                  and serves as a reminder of the World’s Columbian Exposition
                  of 1893.
                </Card.Text>
              </Card.Body>
              <Button
                onClick={() => handleClick("chichagoart")}
                className="w-100 rounded-0"
                variant="primary"
              >
                Browse
              </Button>
            </Card>
          </Col>
          {/* Add more Col components with Cards here if needed */}
        </Row>
      </Container>
    </div>
  );
}
