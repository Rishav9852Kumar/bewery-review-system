import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Form } from "react-bootstrap";
import { FaStar } from "react-icons/fa";
import axios from "axios";

const HomePage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [breweries, setBreweries] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(5);

  useEffect(() => {
    // Fetch initial random breweries
    fetchRandomBreweries();
  }, []);

  const fetchRandomBreweries = async () => {
    try {
      const response = await axios.get(
        `https://api.openbrewerydb.org/v1/breweries/random?size=${perPage}`
      );
      setBreweries(response.data);
    } catch (error) {
      console.error("Error fetching random breweries:", error);
    }
  };

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `https://api.openbrewerydb.org/v1/breweries/search?query=${searchTerm}&per_page=${perPage}`
      );
      setBreweries(response.data);
    } catch (error) {
      console.error("Error searching breweries:", error);
    }
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    fetchRandomBreweries(newPage);
  };

  const handlePerPageChange = (e) => {
    setPerPage(parseInt(e.target.value, 10));
    setCurrentPage(1);
    fetchRandomBreweries(1, parseInt(e.target.value, 10));
  };

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(<FaStar key={i} color={i <= rating ? "gold" : "gray"} />);
    }
    return stars;
  };

  return (
    <Container className="mt-4">
      <Row>
        <Col xs={12} md={6}>
          <Form>
            <Form.Group controlId="searchTerm">
              <Form.Control
                type="text"
                placeholder="Search for breweries..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="perPage">
              <Form.Label>Per Page:</Form.Label>
              <Form.Control
                as="select"
                value={perPage}
                onChange={handlePerPageChange}
              >
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="15">15</option>
              </Form.Control>
            </Form.Group>
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleSearch}
            >
              Search
            </button>
          </Form>
        </Col>
      </Row>
      <Row className="mt-4">
        {breweries.map((brewery) => (
          <Col key={brewery.id} xs={12} md={4} className="mb-4">
            <Card>
              <Card.Body>
                <Card.Title>{brewery.name}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  {brewery.city}, {brewery.state}
                </Card.Subtitle>
                <Card.Text>
                  <strong>Address:</strong> {brewery.street}
                  <br />
                  <strong>Phone:</strong> {brewery.phone}
                  <br />
                  <strong>Website:</strong>{" "}
                  <a
                    href={brewery.website_url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {brewery.website_url}
                  </a>
                  <br />
                  <strong>Rating:</strong> {renderStars(brewery.rating || 0)}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      <Row className="mt-4">
        <Col>
          <button
            type="button"
            className="btn btn-secondary mr-2"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous Page
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => handlePageChange(currentPage + 1)}
          >
            Next Page
          </button>
        </Col>
      </Row>
    </Container>
  );
};

export default HomePage;
