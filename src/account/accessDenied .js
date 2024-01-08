import React from "react";
import { Link } from "react-router-dom";
import "./AccessDenied.css";

const AccessDenied = () => {
  return (
    <div className="access-denied-container">
      <div className="access-denied-content">
        <h1>Oops!</h1>
        <h2>Access Denied</h2>
        <p>You do not have permission to access this page.</p>
        <Link to="/signin" className="access-btn">
          Log In
        </Link>
      </div>
    </div>
  );
};

export default AccessDenied;
