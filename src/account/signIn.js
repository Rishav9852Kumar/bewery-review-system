import React, { useState, useContext, useEffect } from "react";
import { FiUnlock } from "react-icons/fi";
import { app } from "../config/firebase-config";
import {
  getAuth,
  setPersistence,
  browserLocalPersistence,
} from "firebase/auth";
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

import "firebase/auth";
import { signInWithEmailAndPassword } from "firebase/auth";
import { UserContext } from "../context/userContext";
import { ReviewerContext } from "../context/reviewerContext";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";

const SignIn = () => {
  const context = useContext(UserContext);
  const reviewerContext = useContext(ReviewerContext);
  const [email, setEmail] = useState("guest@123.gmail.com");
  const [password, setPassword] = useState("Strong@123");
  const [isLoading, setIsLoading] = useState(false);

  const fetchUserDetails = async (email) => {
    const apiUrl = "/api/user/addUser";

    try {
      const response = await fetch(apiUrl, {
        method: "GET",
      });

      if (response.ok) {
        const userDetails = await response.json();
        const userName = userDetails.UserName;
        const appUid = userDetails.UserId;

        reviewerContext.setPlayer({
          email: email,
          name: userName,
          appUid: appUid,
        });

        console.log("user logged in ... " + userDetails.UserName);

        setIsLoading(false);

        toast("Account Logged in", {
          type: "success",
        });
      } else {
        console.error("Failed to fetch user data");

        if (response.status === 404) {
          toast("Unable to register account", {
            type: "error",
          });
        } else {
          toast("Error while fetching user data", {
            type: "error",
          });
        }
      }
    } catch (error) {
      console.error(error);
      setIsLoading(false);
      toast("Error while fetching user data", {
        type: "error",
      });
    }
  };

  const handleSignin = () => {
    const auth = getAuth(app);

    setPersistence(auth, browserLocalPersistence)
      .then(() => {
        // Siging in with email and password
        signInWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            console.log(user);

            context.setUser({ email: user.email, uid: user.uid });

            // Fetching user details from the API and update context
            fetchUserDetails(user.email);
            console.log("context user= " + context.user);
            console.log("context user (for db )= " + reviewerContext.reviewer);
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
  };

  useEffect(() => {
    if (isLoading) {
      toast("Signing in...", {
        type: "info",
        autoClose: true, //  auto-close this toast
      });
    } else {
      toast.dismiss(); // Dismiss any active toasts
    }
  }, [isLoading]);
  const defaultlogin = () => {
    setEmail("guest@123.gmail.com");
    setPassword("Strong@123");
    handleSubmit();
  };

  const handleSubmit = (e) => {
    if (e) {
      e.preventDefault();
    }
    handleSignin();
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
            <Card body inverse id="signin-card">
              <Form onSubmit={handleSubmit}>
                <CardHeader id="signin-header">
                  Sign In
                  <FiUnlock
                    className="ml-auto"
                    data-toggle="tooltip"
                    data-placement="right"
                    title="To Login as Guest Click Here"
                    onClick={defaultlogin}
                    size={30}
                  />
                  Guest login
                </CardHeader>

                <CardBody id="signin-body">
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
                  <Button type="submit" block id="signin-button">
                    Sign In
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
export default SignIn;
