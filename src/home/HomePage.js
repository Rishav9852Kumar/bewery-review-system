import React, { useState, useContext, useEffect } from "react";
import { Container, Row, Col, Card, Dropdown } from "react-bootstrap";
import "./HomePage.css";
import easyLevelImage from "../gallery/easy.png";
import mediumLevelImage from "../gallery/medium.png";
import hardLevelImage from "../gallery/hard.png";
import { useNavigate } from "react-router-dom";
import { GameContext } from "../context/isGameOn";
import { PlayerContext } from "../context/playerContext";

const HomePage = () => {
  const [chosenLanguage, setChosenLanguage] = useState("English"); // Default language
  const [subjects, setSubjects] = useState([]); // State to store subjects
  const gameContext = useContext(GameContext);
  const playerContext = useContext(PlayerContext);

  const navigate = useNavigate();

  useEffect(() => {
    if (playerContext.player && playerContext.player.gameUid) {
      // User is logged in, fetching user-specific languages
      fetch(
        `https://language-learning-game-backend.rishavkumaraug20005212.workers.dev/user/languages?userId=${playerContext.player.gameUid}`
      )
        .then((response) => response.json())
        .then((data) => {
          const subjectNames = data.map((subject) => subject.SubjectName);

          const subjectsWithKeys = subjectNames.map((subjectName, index) => ({
            SubjectId: index + 1,
            SubjectName: subjectName,
          }));

          setSubjects(subjectsWithKeys);
        })
        .catch((error) => {
          console.error("Error fetching user-specific subjects:", error);
        });
    } else {
      // User is not logged in, fetching the default subjects
      fetch(
        "https://language-learning-game-backend.rishavkumaraug20005212.workers.dev/languages"
      )
        .then((response) => response.json())
        .then((data) => {
          console.log("Subjects:", data);
          setSubjects(data);
        })
        .catch((error) => {
          console.error("Error fetching subjects:", error);
        });
    }
  }, [playerContext.player]); // Running this effect when the player context changes

  const handlePlayNowClick = (level) => {
    gameContext.setGame({
      isGameOn: true,
      gameLanguage: chosenLanguage,
      gameLevel: level,
    });
    navigate("/game");
  };

  const handleLanguageChange = (language) => {
    setChosenLanguage(language);
  };

  const games = [
    {
      title: `Language Game 1 (${chosenLanguage})`,
      imgURL: easyLevelImage,
      level: "easy",
      description: `Learn basic vocabulary in a fun way (${chosenLanguage}).`,
    },
    {
      title: `Language Game 2 (${chosenLanguage})`,
      imgURL: mediumLevelImage,
      level: "medium",
      description: `Practice medium level questions when you want to get serious (${chosenLanguage}).`,
    },
    {
      title: `Language Game 3 (${chosenLanguage})`,
      imgURL: hardLevelImage,
      level: "hard",
      description: `Challenge yourself with advanced grammar exercises (${chosenLanguage}).`,
    },
  ];

  return (
    <div className="homepage-container">
      <Container className="homepage-container my-5">
        <h1>Welcome to Language Learning Games</h1>
        <Dropdown>
          <Dropdown.Toggle variant="primary" id="language-dropdown">
            Choose Language: {chosenLanguage}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            {subjects.map((subject) => (
              <Dropdown.Item
                key={subject.SubjectId}
                onClick={() => handleLanguageChange(subject.SubjectName)}
              >
                {subject.SubjectName}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
        <Row>
          {games.map((game, index) => (
            <Col key={index} xs={12} md={6} lg={4}>
              <Card className="game-card">
                <Card.Img variant="top" src={game.imgURL} />
                <Card.Body>
                  <Card.Title className="game-title">{game.title}</Card.Title>
                  <Card.Subtitle
                    className={`game-level game-level-${game.level.toLowerCase()}`}
                  >
                    {game.level}
                  </Card.Subtitle>
                  <Card.Text className="game-description">
                    {game.description}
                  </Card.Text>
                  <Card.Link
                    className="game-link"
                    onClick={() => handlePlayNowClick(game.level)}
                  >
                    Play Now
                  </Card.Link>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default HomePage;
