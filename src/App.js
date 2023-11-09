import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Form } from "react-bootstrap";
import { FaStar } from 'react-icons/fa';
import axios from 'axios';

const HomePage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchCriteria, setSearchCriteria] = useState("name"); // Default criteria
  const [breweries, setBreweries] = useState([]);

  useEffect(() => {
    // Fetch initial random breweries
    fetchRandomBreweries();
  }, []);

  const fetchRandomBreweries = async () => {
    try {
      const response = await axios.get("https://api.openbrewerydb.org/v1/breweries/random?size=5");
      setBreweries(response.data);
    } catch (error) {
      console.error("Error fetching random breweries:", error);
    }
  };

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `https://api.openbrewerydb.org/v1/breweries/search?query=${searchTerm}&by_${searchCriteria}=true`
      );
      setBreweries(response.data);
    } catch (error) {
      console.error("Error searching breweries:", error);
    }
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
            <Form.Group controlId="searchCriteria">
              <Form.Control
                as="select"
                value={searchCriteria}
                onChange={(e) => setSearchCriteria(e.target.value)}
              >
                <option value="name">Brewery Name</option>
                <option value="address">Brewery Address</option>
                <option value="phone">Phone Number</option>
                <option value="website_url">Web Site URL</option>
                <option value="rating">Current Rating</option>
                <option value="state_city">State, City</option>
              </Form.Control>
            </Form.Group>
            <button type="button" className="btn btn-primary" onClick={handleSearch}>
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
                <Card.Subtitle className="mb-2 text-muted">{brewery.city}, {brewery.state}</Card.Subtitle>
                <Card.Text>
                  <strong>Address:</strong> {brewery.street}<br />
                  <strong>Phone:</strong> {brewery.phone}<br />
                  <strong>Website:</strong> <a href={brewery.website_url} target="_blank" rel="noopener noreferrer">{brewery.website_url}</a><br />
                  <strong>Rating:</strong> {renderStars(brewery.rating || 0)}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default HomePage;
