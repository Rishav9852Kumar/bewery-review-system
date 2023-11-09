import React, { useContext, useState, useEffect } from "react";
import {
  Container,
  Card,
  CardBody,
  CardTitle,
  Table,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Button,
} from "reactstrap";
import { useNavigate } from "react-router-dom";
import { ReviewerContext } from "../context/reviewerContext";
import { UserContext } from "../context/userContext";
import axios from "axios";
import "./user.css"; // Import the CSS file

const User = () => {
  const reviewerContext = useContext(ReviewerContext);
  const authContext = useContext(UserContext);
  const [reviews, setReviews] = useState([]);
  const [openDropdowns, setOpenDropdowns] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch reviews for the logged-in user
    const fetchReviews = async () => {
      try {
        const response = await axios.get(
          `YOUR_API_ENDPOINT/reviews?appUid=${reviewerContext.reviewer.appUid}`
        );
        setReviews(response.data);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    fetchReviews();
  }, [authContext.user, reviewerContext.reviewer, navigate]);

  const toggleDropdown = (breweryId, isOpen) => {
    setOpenDropdowns({
      ...openDropdowns,
      [breweryId]: isOpen,
    });
  };

  const handleSeeBrewery = (breweryName) => {
    // Handle the action for seeing brewery details
    console.log(`See details for ${breweryName}`);
  };

  const handleVisitBrewery = (breweryId) => {
    // Handle the action for visiting brewery website
    console.log(`Visit website for brewery ID: ${breweryId}`);
  };

  const handleAddNewReview = () => {
    // Handle the action for adding a new review
    console.log("Add new review");
  };

  // Check if the reviewer is logged in
  if (!authContext.user?.uid) {
    navigate("/signin"); // Redirect to sign-in if not logged in
  }

  const name = "guest";
  const email = authContext.user.email;
  const gameUid = "user not logged in";

  return (
    <Container fluid className="user-container">
      <div className="user-details">
        <h1 className="user-heading">Hello, {name}</h1>
        <p className="user-info">Email: {email}</p>
        <p className="user-info">User GameID: {gameUid}</p>
      </div>

      <Card className="user-card">
        <CardBody>
          <CardTitle className="user-card-title">Reviews List</CardTitle>
          <Table bordered responsive>
            <thead>
              <tr>
                <th>Name of Brewery</th>
                <th>Location</th>
                <th>Stars</th>
                <th>Comments</th>
                <th>Brewery Link</th>
              </tr>
            </thead>
            <tbody>
              {reviews.map((review, index) => (
                <tr key={index}>
                  <td>{review.BreweryName}</td>
                  <td>{review.BreweryLocation}</td>
                  <td>{review.Stars}</td>
                  <td>{review.Comments}</td>
                  <td>{review.Link}</td>
                  <td>
                    <Dropdown
                      isOpen={openDropdowns[review.BreweryId] || false}
                      toggle={() =>
                        toggleDropdown(
                          review.BreweryId,
                          !openDropdowns[review.BreweryId]
                        )
                      }
                    >
                      <DropdownToggle caret>Actions</DropdownToggle>
                      <DropdownMenu>
                        <DropdownItem
                          onClick={() => handleSeeBrewery(review.BreweryName)}
                        >
                          See Brewery Details
                        </DropdownItem>
                        <DropdownItem
                          onClick={() => handleVisitBrewery(review.BreweryId)}
                        >
                          See Brewery Website
                        </DropdownItem>
                      </DropdownMenu>
                    </Dropdown>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Button
            color="primary"
            className="add-subject-button"
            onClick={handleAddNewReview}
          >
            Add new Review
          </Button>
        </CardBody>
      </Card>
    </Container>
  );
};

export default User;
