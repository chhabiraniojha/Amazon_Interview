import React from 'react';
import { Link } from 'react-router-dom';
import './StepFailure.css'; // Import StepFailure.css for styling
import Navbar from './Navbar';
import Footer from './Footer';
const StepFailure = () => {
  return (
    <div>
    <Navbar />
      <div className="step-failure">
        <div className="icon">
          <i className="fas fa-times-circle"></i>
        </div>
        <h2>Payment Failed</h2>
        <p>There was an issue with your payment. Please try again later.</p>
        <p>If your payment was deducted, it will be automatically refunded within 48 hours.</p>
        <Link to="/" className="btn">Retry Booking</Link>
      </div>
      <Footer />
    </div>

  );
};

export default StepFailure;

