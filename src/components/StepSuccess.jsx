import React from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './StepSuccess.css'; // Import StepSuccess.css for styling
import Navbar from './Navbar';
import Footer from './Footer';

const StepSuccess = () => {

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
        <h2>Slot Booked Successfully!</h2>
        <p>Your slot has been successfully booked for the interview. Thank you for choosing us!</p>
        <p>we have mailed you the confirmation status Please Check Your mail(Note:check your spam folder also if you can't see the mail in your inbox)</p>
        <Link to="/book-telephonic-slot" className="btn">Go Back to Home</Link>
      </div>
      <Footer />
    </div>

  );
};

export default StepSuccess;
