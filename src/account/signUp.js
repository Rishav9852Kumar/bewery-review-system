import React, { useState, useContext, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { app } from "../config/firebase-config";
import {
  Container,
  Form,
  Button,
  FormGroup,
  Label,
  Col,
  Input,
  Row,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
} from "reactstrap";
import {
  getAuth,
  setPersistence,
  browserLocalPersistence,
} from "firebase/auth";
import { Link } from "react-router-dom";

import "firebase/auth";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { toast } from "react-toastify";
import { UserContext } from "../context/userContext";
import { ReviewerContext } from "../context/reviewerContext";

const SignUp = () => {
  const context = useContext(UserContext);
  const reviewerContext = useContext(ReviewerContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSignUp = () => {
    if (email === "") {
      toast("Enter a valid email", {
        type: "warning",
      });
    } else if (password === "") {
      toast("Enter a valid password", {
        type: "warning",
      });
    } else {
      const auth = getAuth(app);

      // Setting Auth state persistence to 'SESSION'
      setPersistence(auth, browserLocalPersistence)
        .then(() => {
          // Continue with sign-up
          createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
              const user = userCredential.user;
              context.setUser({ email: user.email, uid: user.uid });
              fetchUserDetails(user.email);
            })
            .catch((error) => {
              console.log(error);
              toast(error.message, {
                type: "error",
              });
            });
        })
        .catch((error) => {
          console.log(error);
          toast(error.message, {
            type: "error",
          });
        });
    }
  };
  const fetchUserDetails = async (email) => {
    setIsLoading(true);
    try {
      // Making a PUT request
      const putResponse = await fetch(
        `https://language-learning-game-backend.rishavkumaraug20005212.workers.dev/user?email=${email}`,
        {
          method: "POST",
        }
      );

      console.log("putResponse = ", putResponse);

      if (putResponse.ok) {
        const userDetails = await putResponse.json();

        if (userDetails && userDetails.UserId) {
          const userName = userDetails.UserName;
          const appUid = userDetails.UserId;

          reviewerContext.setReviewer({
            email: email,
            name: userName,
            appUid: appUid,
          });

          toast("Account Created", {
            type: "success",
          });
        } else {
          toast("Invalid user details in the response", {
            type: "error",
          });
        }
      } else if (putResponse.status === 404) {
        toast("Unable to create player account", {
          type: "error",
        });
      }
      setIsLoading(false);
    } catch (error) {
      console.error("Failed to create player account: " + error);
      setIsLoading(false);
      toast("Error while creating player account: " + error.message, {
        type: "error",
      });
    }
  };

  useEffect(() => {
    if (isLoading) {
      toast("Signing up...", {
        type: "info",
        autoClose: true, // Don't auto-close this toast
      });
    } else {
      toast.dismiss(); // Dismiss any active toasts
    }
  }, [isLoading]);
  const handleSubmit = (e) => {
    e.preventDefault();
    handleSignUp();
  };
  if (context.user?.uid) {
    return <Navigate to="/" />;
  }
  return (
    <div
      style={{
        height: "85vh",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "repeat",
      }}
    >
      <Container className="text-center">
        <Row>
          <Col lg={6} className="offset-lg-3 mt-4">
            <Card body inverse id="signup-card">
              <Form onSubmit={handleSubmit}>
                <CardHeader id="signup-header">
                  Sign Up
                  <Link to="/signin">Already have an account? Sign In</Link>
                </CardHeader>

                <CardBody id="signup-body">
                  <FormGroup row>
                    <Label for="email" sm={3}>
                      Email
                    </Label>
                    <Col sm={9}>
                      <Input
                        type="email"
                        name="email"
                        id="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Label for="password" sm={3}>
                      Password
                    </Label>
                    <Col sm={9}>
                      <Input
                        type="password"
                        name="password"
                        id="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </Col>
                  </FormGroup>
                </CardBody>
                <CardFooter>
                  <Button type="submit" block id="signup-button">
                    Sign Up
                  </Button>
                </CardFooter>
              </Form>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default SignUp;
