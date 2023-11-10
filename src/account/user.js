// Import statements for React and other dependencies
import React, { useContext, useState, useEffect } from "react";
import {
  Container,
  Card,
  CardBody,
  CardTitle,
  Table,
  Button,
} from "reactstrap";
import { Navigate } from "react-router-dom";
import { ReviewerContext } from "../context/reviewerContext";
import { UserContext } from "../context/userContext";
import axios from "axios";
import "./user.css"; // Import the CSS file

// Functional component definition
const User = () => {
  // useContext to access reviewer and user context
  const reviewerContext = useContext(ReviewerContext);
  const authContext = useContext(UserContext);

  // State to manage reviews and dropdown state
  const [reviews, setReviews] = useState([]);
  
  // useEffect to fetch reviews when the component mounts or reviewer changes
  useEffect(() => {
    const fetchReviews = async () => {
      if (reviewerContext.reviewer && reviewerContext.reviewer.appUid) {
        try {
          const response = await axios.get(
            `https://dark-sea-fd57.rishavkumaraug20005212.workers.dev/reviews?userEmail=${authContext.user.email}`
          );
          setReviews(response.data);
        } catch (error) {
          console.error("Error fetching reviews:", error);
        }
      }
    };

    fetchReviews();
  }, [reviewerContext.reviewer, authContext.user]);

  // If user or reviewer is not logged in, navigate to the signin page
  if (!authContext.user?.uid || !reviewerContext.reviewer?.appUid) {
    return <Navigate to="/signin" />;
  }

  // Function to handle adding a new review
  const handleAddNewReview = () => {
    console.log("Add new review");
  };

  // Extracting name, email, and gameUid from contexts
  const name = reviewerContext.reviewer.name || "User";
  const email = authContext.user.email;
  const gameUid = reviewerContext.reviewer.appUid || "user not logged in";

  // JSX structure for the component
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
                <th>Stars</th>
                <th>Comments</th>
                <th>Time</th>
              </tr>
            </thead>
            <tbody>
              {reviews.map((review, index) => (
                <tr key={index}>
                  <td>{review.BreweryName}</td>
                  <td>{review.Stars}</td>
                  <td>{review.ReviewComment}</td>
                  <td>{review.Time}</td>
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

// Export the component as the default export
export default User;
