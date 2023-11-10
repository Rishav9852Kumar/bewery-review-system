import React, { useContext, useState, useEffect } from "react";
import {
  Container,
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
} from "reactstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ReviewContext } from "../context/reviewContext";
import "./ReviewPage.css";
import { toast } from "react-toastify";

const ReviewPage = () => {
  const reviewContext = useContext(ReviewContext);
  const navigate = useNavigate();
  const [breweryDetails, setBreweryDetails] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [isAddReviewOpen, setIsAddReviewOpen] = useState(false);
  const [comment, setComment] = useState("");
  const [stars, setStars] = useState(1);

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
        `https://dark-sea-fd57.rishavkumaraug20005212.workers.dev/reviews?breweryId=${reviewId}`
      );
      console.log("Reviews fetched successfully:", response.data.length);
      setReviews(response.data);
      if(response.data.length === 0){
        toast("No reviews found", {
          type: "info",
        });
      }
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };

  const submitReview = async () => {
    try {
      const response = await axios.post(
        "https://dark-sea-fd57.rishavkumaraug20005212.workers.dev/reviews",
        {
          reviewId: reviewContext.reviewId,
          comment,
          stars,
        }
      );
      console.log("Review submitted successfully:", response.data);
      toast("Review submitted successfully", {
        type: "success",
      });
      // Refresh reviews after submission
      fetchReviews(reviewContext.reviewId);
    } catch (error) {
      console.error("Error submitting review:", error);
    }
  };

  useEffect(() => {
    if (!reviewContext.reviewId) {
      navigate("/");
    } else {
      fetchBreweryDetails(reviewContext.reviewId);
      fetchReviews(reviewContext.reviewId);
      // Set the form to be open when the component mounts
      setIsAddReviewOpen(true);
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
            <CardSubtitle className="mb-1">
              <strong>Type:</strong> {breweryDetails.brewery_type}
            </CardSubtitle>
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

      {/* Add Review Form */}
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          submitReview();
          setIsAddReviewOpen(false);
        }}
        style={{
          display: isAddReviewOpen ? "block" : "none",
          marginTop: "20px",
        }}
      >
        <FormGroup>
          <Label for="comment">Comment:</Label>
          <Input
            type="textarea"
            name="comment"
            id="comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label for="stars">Stars:</Label>
          <Input
            type="select"
            name="stars"
            id="stars"
            value={stars}
            onChange={(e) => setStars(e.target.value)}
          >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </Input>
        </FormGroup>
        <Button color="primary" type="submit">
          Submit Review
        </Button>{" "}
      </Form>

      {reviews.length > 0 && (
        <Container>
          <h3 className="h4 mb-3">Reviews List</h3>
          {reviews.map((review) => (
            <Card key={review.ReviewId} className="review-card mb-3">
              <CardBody>
                <CardSubtitle className="mb-2">
                  <strong>Date:</strong> {review.Time}
                </CardSubtitle>
                <CardSubtitle className="mb-2">
                  <strong>Email:</strong> {review.Email}
                </CardSubtitle>
                <CardSubtitle className="mb-2">
                  <strong>Stars:</strong> {review.Stars}
                </CardSubtitle>
                <CardSubtitle className="mb-2">
                  <strong>Comments:</strong> {review.ReviewComment}
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
