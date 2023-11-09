import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../context/userContext";
import { ReviewerContext } from "../context/reviewerContext";
//import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  Container,
  Card,
  CardBody,
  CardTitle,
  Table,
  Button,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import "./user.css";

const User = () => {
  const context = useContext(UserContext);
  const reviewerContext = useContext(ReviewerContext);

  const [reviews, setReviewList] = useState([]);
  const [openDropdowns, setOpenDropdowns] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      if (reviewerContext.reviewer && reviewerContext.reviewer.appUid) {
        try {
          const userReviewResponse = await fetch(
            `https://language-learning-game-backend.rishavkumaraug20005212.workers.dev/user/languages?userId=${reviewerContext.reviewer.appUid}`
          );
          const userData = await userReviewResponse.json();
          setReviewList(userData);
        } catch (error) {
          console.error("Error fetching user subjects or subject list:", error);
        }
      }
    };

    fetchData();
  }, [reviewerContext.reviewer]);

//   if (!context.user?.uid) {
//     return <Navigate to="/signin" />;
//   }
//   if (!reviewerContext.reviewer?.appUid) {
//     return <Navigate to="/" />;
//   }

  const name = reviewerContext.reviewer.name || "guest";
  const email = context.user.email;
  const gameUid = reviewerContext.reviewer.appUid || "user not logged in";

  const toggleDropdown = (subjectId, isOpen) => {
    setOpenDropdowns((prevOpenDropdowns) => ({
      ...prevOpenDropdowns,
      [subjectId]: isOpen,
    }));
  };

  const handleSeeBrewery = (subjectName) => {
    // Implement the action for "See Brewery Details"
    toast.info(`Seeing details for ${subjectName}`);
  };

  const handleVisitBrewery = (subjectId) => {
    // Implement the action for "See Brewery Website"
    toast.info(`Visiting website for Brewery ${subjectId}`);
  };

  const handleAddNewReview = () => {
    // Implement the action for "Add new Review"
    toast.success("Adding new Review");
  };

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
                <th>Location</th>
                <th>Stars</th>
                <th>Comments</th>
                <th>Brewery Link</th>
              </tr>
            </thead>
            <tbody>
              {reviews.map((review, index) => (
                <tr key={index}>
                  <td>{review.BreweryName}</td>
                  <td>{review.BreweryLocation}</td>
                  <td>{review.Stars}</td>
                  <td>{review.Comments}</td>
                  <td>{review.Link}</td>
                  <td>
                    <Dropdown
                      isOpen={openDropdowns[review.BreweryId] || false}
                      toggle={() =>
                        toggleDropdown(
                          review.BreweryId,
                          !openDropdowns[review.BreweryId]
                        )
                      }
                    >
                      <DropdownToggle caret>Actions</DropdownToggle>
                      <DropdownMenu>
                        <DropdownItem
                          onClick={() => handleSeeBrewery(review.BreweryName)}
                        >
                          See Brewery Details
                        </DropdownItem>
                        <DropdownItem
                          onClick={() => handleVisitBrewery(review.BreweryId)}
                        >
                          See Brewery Website
                        </DropdownItem>
                      </DropdownMenu>
                    </Dropdown>
                  </td>
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

export default User;
