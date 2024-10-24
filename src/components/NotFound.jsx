// NotFound.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './NotFound.css'; // Import NotFound.css for styling

const NotFound = () => {
  return (
    <div className="not-found">
      <h1 className="not-found-title">404</h1>
      <h2 className="not-found-subtitle">Page Not Found</h2>
      <p className="not-found-text">The page you are looking for does not exist.</p>
      <Link to="/" className="btn">Go Back to Home</Link>
    </div>
  );
};

export default NotFound;
