import React, { useState, useEffect, useContext, useCallback } from "react";
import { Container, Row, Col, Card, Form } from "react-bootstrap";
import { FaStar } from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ReviewContext } from "../context/reviewContext";

const HomePage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [breweries, setBreweries] = useState([]);
  const [perPage, setPerPage] = useState(5);
  const [filterBy, setFilterBy] = useState("name");
  const navigate = useNavigate();
  const reviewContext = useContext(ReviewContext);

  const fetchRandomBreweries = useCallback(
    async (page = 1) => {
      try {
        const response = await axios.get(
          `https://api.openbrewerydb.org/v1/breweries/random?size=${perPage}&page=${page}`
        );
        setBreweries(response.data);
      } catch (error) {
        console.error("Error fetching random breweries:", error);
      }
    },
    [perPage]
  );

  useEffect(() => {
    fetchRandomBreweries();
  }, [perPage, filterBy, fetchRandomBreweries]);

  const fetchBreweriesByFilter = async () => {
    try {
      const response = await axios.get(
        `https://api.openbrewerydb.org/v1/breweries?by_${filterBy}=${searchTerm}&per_page=${perPage}`
      );
      toast(
        "Results found for " +
          `${filterBy} : ${searchTerm} = ` +
          response.data.length,
        {
          type: "success",
        }
      );
      setBreweries(response.data);
    } catch (error) {
      console.error(`Error fetching breweries by ${filterBy}:`, error);
    }
  };

  const handleCardClick = (reviewId) => {
    // Set the reviewId in the context or perform any other action
    reviewContext.setReviewId(reviewId);
    // Navigate to the ReviewPage
    navigate("/review");
  };

  const searchBreweries = async () => {
    try {
      const response = await axios.get(
        `https://api.openbrewerydb.org/v1/breweries/search?query=${searchTerm}`
      );
      console.log(
        "searching by " +
          `https://api.openbrewerydb.org/v1/breweries/search?query=${searchTerm}`
      );
      toast(
        "Results found for " +
          `${filterBy} : ${searchTerm} = ` +
          response.data.length,
        {
          type: "success",
        }
      );
      setBreweries(response.data);
    } catch (error) {
      console.error("Error searching breweries:", error);
    }
  };

  const handlePerPageChange = (e) => {
    setPerPage(parseInt(e.target.value, 10));
  };

  const handleFilterChange = (e) => {
    setFilterBy(e.target.value);
  };

  const handleSearch = async () => {
    if (!searchTerm.trim()) {
      toast("Please enter a search term", {
        type: "error",
      });
      return;
    }
    if (
      filterBy === "name" ||
      filterBy === "state" ||
      filterBy === "type" ||
      filterBy === "city"
    ) {
      fetchBreweriesByFilter();
    } else {
      searchBreweries();
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
            <Form.Group controlId="filterBy">
              <Form.Label>Filter By:</Form.Label>
              <Form.Control
                as="select"
                onChange={handleFilterChange}
                value={filterBy}
              >
                <option value="name">Brewery Name</option>
                <option value="city">City</option>
                <option value="state">State</option>
                <option value="type">Brewery Type</option>
                <option value="tag">Tag</option>
              </Form.Control>
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
          <Col
            key={brewery.id}
            xs={12}
            md={4}
            className="mb-4"
            onClick={() => handleCardClick(brewery.id)}
            style={{ cursor: "pointer" }}
          >
            <Card className="h-100">
              {" "}
              {/* Added h-100 class to make the Card take full height */}
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
    </Container>
  );
};

export default HomePage;
