// import React, { useState, useEffect, useContext } from "react";
// import { Container, Button, Form, FormGroup, Input, Label } from "reactstrap";
// import FinalScorePopup from "./FinalScorePopup";
// import { useNavigate } from "react-router-dom";
// import { GameContext } from "../context/isGameOn";
// import { PlayerContext } from "../context/playerContext";
// import "./ReviewPage.css";
// import { toast } from "react-toastify";

// const ReviewPage = () => {
//   const [questions, setQuestions] = useState([]);
//   const [answers, setAnswers] = useState([]);
//   const [showPopup, setShowPopup] = useState(false);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();

//   const gameContext = useContext(GameContext);
//   const isGameOn = gameContext.game.isGameOn;
//   const gameLanguage = gameContext.game.gameLanguage;
//   const gameLevel = gameContext.game.gameLevel;

//   const playerContext = useContext(PlayerContext);

//   useEffect(() => {
//     setLoading(true);

//     if (!isGameOn) {
//       navigate("/");
//     }

//     const fetchQuestions = async () => {
//       try {
//         const response = await fetch(
//           `https://language-learning-game-backend.rishavkumaraug20005212.workers.dev/game/questions?subjectLanguage=${gameLanguage}&level=${gameLevel}`
//         );

//         if (response.ok) {
//           const data = await response.json();
//           if (Array.isArray(data)) {
//             const formattedQuestions = data.map((question) => ({
//               text: question.Question,
//               options: [
//                 question.OptionA,
//                 question.OptionB,
//                 question.OptionC,
//                 question.OptionD,
//               ],
//               correctAnswer: question.CorrectAnswer,
//             }));
//             setQuestions(formattedQuestions);
//             setLoading(false);
//           } else {
//             console.error("No questions received from the API.");
//             setLoading(false);
//           }
//         } else {
//           console.error("API request failed with status: ", response.status);
//           setLoading(false);
//         }
//       } catch (error) {
//         console.error("Error fetching questions:", error);
//         setLoading(false);
//       }
//     };

//     fetchQuestions();
//   }, [gameLanguage, gameLevel, isGameOn, navigate]);

//   const handleAnswerSelection = (questionIndex, selectedOption) => {
//     const updatedAnswers = [...answers];
//     updatedAnswers[questionIndex] = selectedOption;
//     setAnswers(updatedAnswers);
//   };

//   const handleSubmit = () => {
//     setShowPopup(true);

//     if (playerContext.player?.gameUid) {
//       const userId = playerContext.player?.gameUid;
//       const score = answers.filter(
//         (answer, index) => answer === questions[index].correctAnswer
//       ).length;

//       // Making an API call to update the user's score
//       const updateScoreUrl = `https://language-learning-game-backend.rishavkumaraug20005212.workers.dev/game/userScore?userId=${userId}&language=${gameLanguage}&score=${score}`;

//       fetch(updateScoreUrl, {
//         method: "POST",
//       })
//         .then((response) => {
//           if (response.ok) {
//             toast.success("User score updated!");
//           } else {
//             toast.error("Failed to update user score.");
//             toast.error("Try Adding a language to your list in user page.");
//           }
//         })
//         .catch((error) => {
//           console.error("Error updating user score:", error);
//           toast.error("Failed to update user score.");
//         });
//     }
//   };

//   return (
//     <div className="game-page-container">
//       <Container>
//         <h2>Language Learning Game</h2>
//         <h3>Language: {gameLanguage}</h3>
//         <h3>Level: {gameLevel}</h3>
//         <Button
//           className="submit-button"
//           color="primary"
//           onClick={handleSubmit}
//         >
//           Submit
//         </Button>
//         {loading ? (
//           <p>Loading questions...</p>
//         ) : (
//           questions.map((question, index) => (
//             <div key={index} className="question-container">
//               <p className="question-text">{question.text}</p>
//               <Form>
//                 <FormGroup tag="fieldset">
//                   <ul>
//                     {question.options.map((option, optionIndex) => (
//                       <li key={optionIndex}>
//                         <FormGroup check>
//                           <Label check>
//                             <Input
//                               type="radio"
//                               name={`question-${index}`}
//                               value={option}
//                               onChange={() =>
//                                 handleAnswerSelection(index, option)
//                               }
//                             />{" "}
//                             {option}
//                           </Label>
//                         </FormGroup>
//                       </li>
//                     ))}
//                   </ul>
//                 </FormGroup>
//               </Form>
//             </div>
//           ))
//         )}
//         {showPopup && (
//           <FinalScorePopup questions={questions} answers={answers} />
//         )}
//       </Container>
//     </div>
//   );
// };

// export default ReviewPage;
