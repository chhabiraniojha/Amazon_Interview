import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './StepFour.css';
import moment from 'moment';
import axios from 'axios';
import Popup from './Popup';
import Loader1 from './Loader1';

const StepFour = ({ prevStep, formData }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  const navigate = useNavigate();

  const { firstName, lastName, email, phone, slotDate, slotTime, selectedVacancy, language } = formData;
  const candidateDetails = {
    name: `${firstName} ${lastName}`,
    email,
    phone,
    slotDate,
    slotTime,
    selectedVacancy,
    language:"hindi"
  }

  // Format slot date
  const formattedSlotDate = slotDate ? moment(slotDate).format('MMMM Do, YYYY') : '';

  // Format slot time with AM/PM
  const formattedSlotTime = slotTime ? moment(slotTime, 'HH:mm').format('hh:mm A') : '';
  const name = `${firstName} ${lastName}`;

  const handlePayment = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post(`https://api.amazon-careers.in/api/payment/telephonic`, candidateDetails);
      console.log(response)
      if (response.status === 200 && response.data.statusCode==1) {
        setIsLoading(false);
        navigate("/success")
        // window.location.href = response.data;
        // window.open(response.data,'_blank');
        // openInNewTab(response.data)
        
      }else{
        setIsLoading(false)
        setPopupMessage("mail id already exits,try with different mail id");
        setShowPopup(true)
        console.log('user already exists')
      }
    } catch (error) {
      setIsLoading(false);
      setPopupMessage("Internal server error,contact with admin");
      setShowPopup(true)
    }
  };

  const openInNewTab = (url) => {
    const newWindow = window.open(url, '_blank', 'noopener,noreferrer');
    if (newWindow) {
      newWindow.opener = null; // Enhance security by setting opener to null
    }
  };
  const closePopup = () => {
    setShowPopup(false);
    window.location.reload(false)
  };

  return (
    <div className="step">
      {isLoading && <Loader1 />}
      {/* <div className="refresh-warning">
        <p><strong>Please refresh the page once before making the payment to ensure all data is up-to-date.</strong></p>
      </div> */}
      <h2>Review and Book Slot</h2>
      <div className="review-section">
        <h3>Review Your Details</h3>
        <div className="detail">
          <span className="detail-label">Name:</span>
          <span className="detail-value">{firstName} {lastName}</span>
        </div>
        <div className="detail">
          <span className="detail-label">Email:</span>
          <span className="detail-value">{email}</span>
        </div>
        <div className="detail">
          <span className="detail-label">Phone No:</span>
          <span className="detail-value">{phone}</span>
        </div>
        <div className="detail">
          <span className="detail-label">Interview For:</span>
          <span className="detail-value">{selectedVacancy}</span>
        </div>
        <div className="detail">
          <span className="detail-label">Interview Date:</span>
          <span className="detail-value">{formattedSlotDate}</span>
        </div>
        <div className="detail">
          <span className="detail-label">Interview Time:</span>
          <span className="detail-value">Between {slotTime}</span>
        </div>
        <div className="detail">
          <span className="detail-label">Interviewer Name:</span>
          <span className="detail-value">Auto assign</span>
        </div>
        {/* <div className="detail">
          <span className="detail-label">Interview Language:</span>
          <span className="detail-value">{language}</span>
        </div> */}
      </div>
      {/* <div className="payment-info">
        <h3>Payment Information</h3>
        <p>
        <p>
        To ensure a smooth and efficient interview process, we have implemented a token amount system of <strong>₹99</strong> rupees for booking interview slots. This measure has been introduced due to a high number of candidates booking interview slots and subsequently not attending, which results in a significant loss of time and resources for our HR team.
        </p>
        <br/><br/><b><h2>Why a Token Amount?</h2></b><br/>
          <h3>Commitment:</h3> The token amount serves as a commitment fee to secure your interview slot and confirms your genuine interest in the position.
          Efficiency: It helps us manage our resources effectively and ensures that our HR team can focus on candidates who are committed to attending the interview.<br/><br/>
          <h3>Important Details:</h3>
          <b>Refundable:</b> The token amount is fully refundable after the interview, regardless of whether you pass or fail. Our goal is to ensure commitment, not to profit from the process.<br/><br/>
          <b>Fairness:</b> This system ensures that every candidate receives equal attention and opportunity during the interview process.<br/><br/>
          <p>
          We understand that this may be an additional step, but it is necessary to maintain the integrity and efficiency of our recruitment process. Your cooperation and understanding are greatly appreciated.
          </p>
        </p>
      </div> */}
      <div className="step-two-button-group">
        <button type="button" className="btn-step1 btn-step1-primary" onClick={prevStep}>
          Previous
        </button>
        <button type="button" className="btn-step1 btn-step1-primary" onClick={handlePayment}>
          Book Slot
        </button>
      </div>
      {showPopup && <Popup message={popupMessage} onClose={closePopup} />}
    </div>
  );
};

export default StepFour;
