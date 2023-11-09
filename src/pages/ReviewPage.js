import React, { useContext} from "react";
import "../utils/PageNotFound.css";
import { ReviewContext } from "../context/reviewContext";

const ReviewPage = () => {
  const reviewContext = useContext(ReviewContext);
  return (
    <div className="not-found-container">
      <h1>This is the review page </h1>
      <h2>Review Id: {reviewContext.reviewId}</h2>
    </div>
  );
};

export default ReviewPage;
