import React from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Test.css'; // Import StepSuccess.css for styling
import Navbar from './Navbar';
import Footer from './Footer';

const TelephonicAsscessmentTestResult = () => {

  useEffect(() => {
    clearLocalStorage(); // Call the function to clear local storage
  }, []);
  const clearLocalStorage = () => {
    localStorage.removeItem('formData');
  };
  return (
    <div>
    <Navbar />
      <div className="step-success">
        <div className="icon">
          <i className="fas fa-check-circle"></i>
        </div>
        <h2>Test Submitted Successfully!</h2>
        <p>One of our HR will check your copy and give the remark. Thank you for choosing us!</p>
        <p><b>You will receive the status soon via email.</b></p>
        <Link to="/" className="btn">Go Back to Home</Link>
      </div>
      <Footer />
    </div>

  );
};

export default TelephonicAsscessmentTestResult;
