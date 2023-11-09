import React from "react";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  CardText,
  ListGroup,
  ListGroupItem,
} from "reactstrap";
import "./AboutPage.css";
import techImage1 from "../gallery/tech-stack-logo.png";
import techImage2 from "../gallery/tech-stack-logo.png";
import yourImage from "../gallery/my-image.png";

const AboutPage = () => {
  return (
    <Container className="about-container">
      <Row>
        <Col className="about-content">
          <Card>
            <CardBody>
              <h1 className="display-4 about-heading">
                About Our Language Learning Game
              </h1>
              <p className="lead about-description">
                Welcome to our language learning game! Our game is designed to
                help you improve your language skills while having fun.
              </p>
            </CardBody>
          </Card>
          <h2 className="about-subheading">How to Play</h2>
          <p className="about-description">
            Playing our game is easy. Just follow these steps:
          </p>
          <ListGroup className="about-list">
            <ListGroupItem>Choose a language you want to learn.</ListGroupItem>
            <ListGroupItem>
              Answer quiz questions to test your knowledge.
            </ListGroupItem>
            <ListGroupItem>
              Earn points and progress to higher levels.
            </ListGroupItem>
          </ListGroup>
          <h2 className="about-subheading">Tools and Technologies</h2>
          <p className="about-description">
            Our game is built using the following tools and technologies:
          </p>
          <Row>
            <Col xs={12} sm={6} md={6} lg={3}>
              <img src={techImage1} alt="Tech 1" className="tech-image" />
            </Col>
            <Col xs={12} sm={6} md={6} lg={3}>
              <img src={techImage2} alt="Tech 2" className="tech-image" />
            </Col>
          </Row>
        </Col>
        <Col className="about-content">
          <img src={yourImage} alt="Your" className="your-image" />
          <h2 className="about-subheading">About the Developer</h2>
          <p className="about-description">
            Hi, I'm Rishav Kumar, the developer of this game. If you have any
            questions or feedback, please feel free to contact me:
          </p>
          <Card>
            <CardBody>
              <CardTitle>Email</CardTitle>
              <CardText>rishavkumaraug20005212@gmail.com</CardText>
            </CardBody>
          </Card>
          <h2 className="about-subheading">GitHub Repositories</h2>
          <p className="about-description">
            You can find the source code for our game on GitHub:
          </p>
          <ListGroup className="about-list">
            <ListGroupItem>
              <a href="https://github.com/Rishav9852Kumar/language-learning-game-frontend">
                Front-End Repository
              </a>
            </ListGroupItem>
            <ListGroupItem>
              <a href="https://github.com/Rishav9852Kumar/language-learning-game-backend">
                Back-End Repository
              </a>
            </ListGroupItem>
            <ListGroupItem>
              <a href="https://drive.google.com/file/d/1BUg_SBSai1kVxAXy0H6Ys6P2cfXB-R7k/view?usp=drive_link">
                Documentation Repository
              </a>
            </ListGroupItem>
          </ListGroup>
        </Col>
      </Row>
    </Container>
  );
};

export default AboutPage;
