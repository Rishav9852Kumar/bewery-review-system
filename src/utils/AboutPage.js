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
                About the Brewery Review System
              </h1>
              <p className="lead about-description">
                Welcome to the Brewery Review System! Our platform allows users
                to explore and review various breweries, sharing their
                experiences with the community.
              </p>
            </CardBody>
          </Card>
          <h2 className="about-subheading">How it Works</h2>
          <p className="about-description">
            Using our platform is simple. Follow these steps:
          </p>
          <ListGroup className="about-list">
            <ListGroupItem>
              Explore a wide range of breweries listed on our platform.
            </ListGroupItem>
            <ListGroupItem>
              Share your brewery experiences by adding reviews.
            </ListGroupItem>
            <ListGroupItem>
              Read reviews from other users to discover new and exciting
              breweries.
            </ListGroupItem>
          </ListGroup>
          <h2 className="about-subheading">Tools and Technologies</h2>
          <p className="about-description">
            Our platform utilizes the following tools and technologies:
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
            Hi, I'm Rishav Kumar, the developer of the Brewery Review System. If
            you have any questions or feedback, feel free to contact me:
          </p>
          <Card>
            <CardBody>
              <CardTitle>Email</CardTitle>
              <CardText>rishavkumaraug20005212@gmail.com</CardText>
            </CardBody>
          </Card>
          <h2 className="about-subheading">GitHub Repositories</h2>
          <p className="about-description">
            You can find the source code for our system on GitHub:
          </p>
          <ListGroup className="about-list">
            <ListGroupItem>
              <a href="https://github.com/Rishav9852Kumar/bewery-review-system">
                Front-End Repository
              </a>
            </ListGroupItem>
            <ListGroupItem>
              <a href="https://github.com/Rishav9852Kumar/bewery-review-system">
                Back-End Repository
              </a>
            </ListGroupItem>
            <ListGroupItem>
              <a href="https://github.com/Rishav9852Kumar/bewery-review-system">
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
