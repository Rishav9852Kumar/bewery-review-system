import React, { useContext, useState, useEffect } from "react";
import { Container, Card, CardBody, CardTitle, CardSubtitle } from "reactstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ReviewContext } from "../context/reviewContext";
import "./ReviewPage.css"; 

const ReviewPage = () => {
  const reviewContext = useContext(ReviewContext);
  const navigate = useNavigate();
  const [breweryDetails, setBreweryDetails] = useState(null);
  const [reviews, setReviews] = useState([]);

  const fetchBreweryDetails = async (reviewId) => {
    try {
      const response = await axios.get(
        `https://api.openbrewerydb.org/v1/breweries/${reviewId}`
      );
      setBreweryDetails(response.data);
    } catch (error) {
      console.error("Error fetching brewery details:", error);
    }
  };

  const fetchReviews = async (reviewId) => {
    try {
      const response = await axios.get(
        `YOUR_REVIEW_API_ENDPOINT?reviewId=${reviewId}`
      );
      setReviews(response.data);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };

  useEffect(() => {
    if (!reviewContext.reviewId) {
      navigate("/");
    } else {
      fetchBreweryDetails(reviewContext.reviewId);
      fetchReviews(reviewContext.reviewId);
    }
  }, [reviewContext.reviewId, navigate]);

  return (
    <Container className="mt-4">
      {breweryDetails && (
        <Card className="mb-4 brewery-card">
          <CardBody>
            <CardTitle className="h4 mb-3 brewery-name">
              {breweryDetails.name}
            </CardTitle>
            <CardSubtitle className="mb-2">
              Brewery ID: {breweryDetails.id}
            </CardSubtitle>
            <p className="mb-1">
              <strong>Type:</strong> {breweryDetails.brewery_type}
            </p>
            <p className="mb-1">
              <strong>Address 1:</strong> {breweryDetails.address_1}
            </p>
            <p className="mb-1">
              <strong>Address 2:</strong> {breweryDetails.address_2 || "N/A"}
            </p>
            <p className="mb-1">
              <strong>Address 3:</strong> {breweryDetails.address_3 || "N/A"}
            </p>
            <p className="mb-1">
              <strong>City:</strong> {breweryDetails.city}
            </p>
            <p className="mb-1">
              <strong>State/Province:</strong> {breweryDetails.state_province}
            </p>
            <p className="mb-1">
              <strong>Postal Code:</strong> {breweryDetails.postal_code}
            </p>
            <p className="mb-1">
              <strong>Country:</strong> {breweryDetails.country}
            </p>
            <p className="mb-1">
              <strong>Longitude:</strong> {breweryDetails.longitude}
            </p>
            <p className="mb-1">
              <strong>Latitude:</strong> {breweryDetails.latitude}
            </p>
            <p className="mb-1">
              <strong>Phone:</strong> {breweryDetails.phone}
            </p>
            <p className="mb-1">
              <strong>Website:</strong>{" "}
              <a
                href={breweryDetails.website_url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {breweryDetails.website_url}
              </a>
            </p>
            <p className="mb-1">
              <strong>State:</strong> {breweryDetails.state}
            </p>
            <p className="mb-1">
              <strong>Street:</strong> {breweryDetails.street}
            </p>
          </CardBody>
        </Card>
      )}

      {reviews.length > 0 && (
        <Container>
          <h3 className="h4 mb-3">Reviews List</h3>
          {reviews.map((review) => (
            <Card key={review.DbReviewId} className="review-card mb-3">
              <CardBody>
                <CardSubtitle className="mb-2">
                  <strong>Date:</strong> {review.reviewDate}
                </CardSubtitle>
                <CardSubtitle className="mb-2">
                  <strong>Email:</strong> {review.reviewEmail}
                </CardSubtitle>
                <CardSubtitle className="mb-2">
                  <strong>Name:</strong> {review.reviewerName}
                </CardSubtitle>
                <CardSubtitle className="mb-2">
                  <strong>Stars:</strong> {review.stars}
                </CardSubtitle>
                <CardSubtitle className="mb-2">
                  <strong>Comments:</strong> {review.comments}
                </CardSubtitle>
              </CardBody>
            </Card>
          ))}
        </Container>
      )}
    </Container>
  );
};

export default ReviewPage;
