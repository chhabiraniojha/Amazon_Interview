import React from 'react';
import { Link } from 'react-router-dom';
import './StepFailure.css'; // Import StepFailure.css for styling
import Navbar from './Navbar';
import Footer from './Footer';
const VirtualAsscessmentTestResult = () => {
  return (
    <div>
    <Navbar />
      <div className="step-failure">
        <div className="icon">
          <i className="fas fa-times-circle"></i>
        </div>
        <h2>Failed</h2>
        <p>Sorry ! You are Faild</p>
        <p>Better Luck Next Time</p>
        <p>Refund for the amount that you have paid has been  already initiated and it will be credited to the source account within 15 working days. </p>
        <Link to="/book-telephonic-slot" className="btn">Retry Booking</Link>
      </div>
      <Footer />
    </div>

  );
};

export default VirtualAsscessmentTestResult;

