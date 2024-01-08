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
import AccessDenied from "./account/accessDenied ";

// Firebase Configuration
import { app } from "./config/firebase-config";

// Contexts
import { UserContext } from "./context/userContext";

// Layout Components
import Footer from "./footer/footer";
import Header from "./header/Header";

// Home Page
import ProductsPage from "./home/ProductsPage";

// Other Pages
import ReviewPage from "./pages/ReviewPage";
import AddProductPage from "./utils/AddProductPage";
import PageNotFound from "./utils/NotFound";

function App() {
  const [user, setUser] = useState(null);

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
        <Header />
        <Footer />
        <Routes>
          <Route exact path="/" element={<ProductsPage />} />
          <Route exact path="/signin" element={<SignIn />} />
          <Route exact path="/signup" element={<SignUp />} />
          <Route exact path="/access/denied" element={<AccessDenied />} />
          <Route exact path="/about" element={<AddProductPage />} />
          <Route exact path="/review" element={<ReviewPage />} />
          <Route exact path="*" element={<PageNotFound />} />
        </Routes>
      </UserContext.Provider>
    </Router>
  );
}

export default App;
