import { getAuth, setPersistence, browserLocalPersistence } from "firebase/auth";
import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Styles
import "./App.css";

//toast stuff
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Account Components
import SignIn from "./account/signIn";
import SignUp from "./account/signUp";
import User from "./account/user";

// Firebase Configuration
import { app } from "./config/firebase-config";

// Contexts
import { UserContext } from "./context/userContext";
import { ReviewerContext } from "./context/reviewerContext";
import {ReviewContext} from "./context/reviewContext";

// Layout Components
import Footer from "./footer/footer";
import Header from "./header/Header";

// Home Page
import ProductsPage from "./home/ProductsPage";

// Other Pages
import ReviewPage from "./pages/ReviewPage";
import AboutPage from "./utils/AboutPage";
import PageNotFound from "./utils/NotFound";

function App() {
  const [user, setUser] = useState(null);
  const [reviewer, setReviewer] = useState(null);
  const [reviewId, setReviewId] = useState(null);

  const auth = getAuth(app);

  useEffect(() => {
    setPersistence(auth, browserLocalPersistence)
      .then(() => {})
      .catch((error) => {
        console.error("Error setting session persistence:", error);
      });
  }, [auth]);

  return (
    <Router>
      <ToastContainer />
      <UserContext.Provider value={{ user, setUser }}>
        <ReviewerContext.Provider value={{ reviewer, setReviewer }}>
          <ReviewContext.Provider value={{ reviewId, setReviewId }}>
            <Header />
            <Footer />
            <Routes>
              <Route exact path="/" element={<ProductsPage />} />
              <Route exact path="/signin" element={<SignIn />} />
              <Route exact path="/signup" element={<SignUp />} />
              <Route exact path="/user" element={<User />} />
              <Route exact path="/about" element={<AboutPage />} />
              <Route exact path="/review" element={<ReviewPage />} />
              <Route exact path="*" element={<PageNotFound />} />
            </Routes>
          </ReviewContext.Provider>
        </ReviewerContext.Provider>
      </UserContext.Provider>
    </Router>
  );
}

export default App;
