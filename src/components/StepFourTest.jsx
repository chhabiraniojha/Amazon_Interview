import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './StepFour.css';
import moment from 'moment';
import axios from 'axios';
import Loader from './Loader';

const StepFourTest = ({ prevStep, formDataVirtual }) => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const { candidateData, slotDate, slotTime } = formDataVirtual;
  const candidateDetails={
    name:candidateData.name,
    email:candidateData.email,
    slotDate,
    slotTime,
    candidateId:candidateData.id
  }
  // Format slot date
  const formattedSlotDate = slotDate ? moment(slotDate).format('MMMM Do, YYYY') : '';
  // slotTime is already in the correct format
  const formattedSlotTime = slotTime || '';

  const handlePayment = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post(`https://api.amazon-careers.in/api-virtual/payment/virtual`,candidateDetails);
      if (response.status === 200) {
        setIsLoading(false);
        // window.location.href = response.data;
        // window.open(response.data,'_blank');
        openInNewTab(response.data)
      }
    } catch (error) {
      console.error('Payment failed', error);
      setIsLoading(false);
    }
  };
  const openInNewTab = (url) => {
    const newWindow = window.open(url, '_blank', 'noopener,noreferrer');
    if (newWindow) {
      newWindow.opener = null; // Enhance security by setting opener to null
    }
  };

  return (
    <div className="step">
      {isLoading && <Loader />}
      {/* <div className="refresh-warning">
        <p><strong>Please refresh the page once before making the payment to ensure all data is up-to-date.</strong></p>
      </div> */}
      <h2>Review and Book Slot</h2>
      <div className="review-section">
        <h3>Review Your Details</h3>
        <div className="detail">
          <span className="detail-label">Name:</span>
          <span className="detail-value">{candidateData.name}</span>
        </div>
        <div className="detail">
          <span className="detail-label">Email:</span>
          <span className="detail-value">{candidateData.email}</span>
        </div>
        <div className="detail">
          <span className="detail-label">Interview For:</span>
          <span className="detail-value">{candidateData.selectedVacancy}</span>
        </div>
        <div className="detail">
          <span className="detail-label">Interview Date:</span>
          <span className="detail-value">{formattedSlotDate}</span>
        </div>
        <div className="detail">
          <span className="detail-label">Interview Time:</span>
          <span className="detail-value">{formattedSlotTime}</span>
        </div>
        <div className="detail">
          <span className="detail-label">Interviewer Name:</span>
          <span className="detail-value">Auto assign</span>
        </div>
      </div>
      <div className="payment-info">
        <h3>Payment Information</h3>
        <p>
          To confirm your slot booking, we require a payment of <strong>₹99</strong>. This measure has been implemented due to a high number of candidates booking interview slots but not attending. Such no-shows lead to wasted time for our HR team and result in a significant loss for the company.
        </p>
        <p>
          By requiring a small payment, we aim to ensure that candidates who book slots are committed to attending the interview.
        </p>
        <p>
          The payment is fully refundable after the interview, regardless of the outcome.<br />(Pass or Fail does not matter.)
        </p>
      </div>
      <div className="button-group">
        <button type="button" className="btn-step1 btn-step1-primary" onClick={prevStep}>
          Previous
        </button>
        <button type="button" className="btn-step1 btn-step1-primary" onClick={handlePayment}>
          Pay and Book Slot
        </button>
      </div>
    </div>
  );
};

export default StepFourTest;
