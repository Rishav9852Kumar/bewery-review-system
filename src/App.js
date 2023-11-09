import "react-toastify/dist/ReactToastify.css";
import {
  getAuth,
  setPersistence,
  browserLocalPersistence,
} from "firebase/auth";
import { useEffect, useState } from "react";

//style
import "./App.css";
//account
import SignIn from "./account/signIn.js";
import SignUp from "./account/signUp.js";
import User from "./account/user.js";
//config
import { app } from "./config/firebase-config.js";
//context
import { UserContext } from "./context/userContext.js";
import { ReviewerContext } from "./context/reviewerContext.js";
//layout
import Footer from "./footer/footer.js";
import Header from "./header/Header.js";
//home
import HomePage from "./home/HomePage.js";
//pages
import ReviewPage from "./pages/ReviewPage.js";
//utils
import PageNotFound from "./utils/NotFound.js";
//about
import AboutPage from "./utils/AboutPage.js";


function App() {
  const [user, setUser] = useState(null);
  const [reviewer, setReviewer] = useState(null);
  
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
          <Header />
          <Routes>
            <Route exact path="/" element={<HomePage />} />
            <Route exact path="/signin" element={<SignIn />} />
            <Route exact path="/signup" element={<SignUp />} />
            <Route exact path="/user" element={<User />} />
            <Route exact path="/about" element={<AboutPage />} />
            <Route exact path="/review" element={<ReviewPage />} />
            <Route exact path="*" element={<PageNotFound />} />
          </Routes>
          <Footer />
        </ReviewerContext.Provider>
      </UserContext.Provider>
    </Router>
  );
}

export default App;
