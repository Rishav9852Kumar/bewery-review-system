import React from "react";
import "./PageNotFound.css";

const NotFound = () => {
  return (
    <div className="not-found-container">
      <div className="not-found-content">
        <h1 className="not-found-heading">404</h1>
        <p className="not-found-message">Page Not Found</p>
        <p className="not-found-description">
          The page you are looking for might have been removed or doesn't exist.
        </p>
      </div>
    </div>
  );
};

export default NotFound;
