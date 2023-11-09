import React from "react";
import { useNavigate } from "react-router-dom";
import "./ReviewSubmitPopUp.css";

const FinalScorePopup = ({ questions, answers }) => {
  const navigate = useNavigate();

  const handleReturnToHomePage = () => {
    navigate("/"); // Navigate to the home page
  };

  // Calculating scores and counts
  const totalQuestions = questions.length;
  let correctCount = 0;
  let incorrectCount = 0;
  let unansweredCount = 0;

  for (let i = 0; i < totalQuestions; i++) {
    if (answers[i] === questions[i].correctAnswer) {
      correctCount++;
    } else if (answers[i]) {
      incorrectCount++;
    } else {
      unansweredCount++;
    }
  }

  // Calculating the final score
  const score = correctCount;

  return (
    <div className="popup">
      <div className="popup-content">
        <h2>Your Final Score</h2>
        <p>Score: {score}</p>
        <p>Correct Answers: {correctCount}</p>
        <p>Incorrect Answers: {incorrectCount}</p>
        <p>Unanswered Questions: {unansweredCount}</p>
        <button onClick={handleReturnToHomePage}>Return to Home Page</button>
      </div>
    </div>
  );
};

export default FinalScorePopup;
