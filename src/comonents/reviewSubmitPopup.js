// ReviewSubmitPopUp.js

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";
import StarRating from "./StarRating"; // Create or import a StarRating component

import "./ReviewSubmitPopUp.css";

const ReviewSubmitPopUp = ({ breweryName, onSubmit, isOpen, toggle }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    comment: "",
    stars: 1,
  });

  const [formErrors, setFormErrors] = useState({
    comment: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    setFormErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = {};

    // Validate comment
    if (!formData.comment.trim()) {
      valid = false;
      newErrors.comment = "Comment is required.";
    }

    setFormErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      // Assuming you have an API endpoint for submitting reviews
      try {
        // Perform API call to submit the review data
        await onSubmit(formData);

        // Show success toast
        alert("Review added successfully!");

        // Navigate to the home page
        navigate("/");
      } catch (error) {
        // Show error toast
        alert("Error adding review. Please try again.");
        console.error("Error adding review:", error);
      }
    }
  };

  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>Review for {breweryName}</ModalHeader>
      <ModalBody>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="comment">Comment:</label>
            <textarea
              id="comment"
              name="comment"
              value={formData.comment}
              onChange={handleChange}
              className={`form-control ${
                formErrors.comment ? "is-invalid" : ""
              }`}
              required
            />
            <div className="invalid-feedback">{formErrors.comment}</div>
          </div>

          <div className="form-group">
            <label htmlFor="stars">Stars:</label>
            <StarRating
              id="stars"
              name="stars"
              value={formData.stars}
              onChange={(value) =>
                setFormData((prevData) => ({ ...prevData, stars: value }))
              }
              maxStars={5}
            />
          </div>

          <ModalFooter>
            <Button color="primary" type="submit">
              Submit Review
            </Button>{" "}
            <Button color="secondary" onClick={toggle}>
              Cancel
            </Button>
          </ModalFooter>
        </form>
      </ModalBody>
    </Modal>
  );
};

export default ReviewSubmitPopUp;
