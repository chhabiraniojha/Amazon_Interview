import React, { useState, useEffect } from 'react';
import './interview.css'; // Import CSS file
import axios from 'axios';

const Interview = () => {
  // State for interviews data
  const [interviews, setInterviews] = useState([]);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [actionId, setActionId] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // State to manage loading state

  // Function to fetch interviews for today
  const fetchInterviews = async () => {
    try {
      const response = await axios.get("http://localhost:80/interview/interview-list");
      if (response.data.status === true) {
        setInterviews(response.data.candidatelistForInterviewToday);
      }
      console.log(interviews)
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching interviews:', error);
      setIsLoading(false); // Set loading state to false on error
      // Handle error state or alert user
    }
  };

  // useEffect to fetch data on component mount
  useEffect(() => {
    fetchInterviews(); // Fetch interviews when component mounts
  }, []); // Empty dependency array ensures useEffect runs only once on mount

  const handleConfirm = () => {
    // Perform action here based on actionId
    console.log(`Confirmed action for interview with ID ${actionId}`);

    // Reset state after performing action
    setActionId(null);
    setShowConfirmation(false);
  };

  const handleCancel = () => {
    // Cancel action
    setActionId(null);
    setShowConfirmation(false);
  };

  const handleSendEmail = async (interview) => {
    const candidateDetails = {
      id: interview.id,
      email: interview.email,
      name: interview.name
    };
    try {
      const response = await axios.post("http://localhost:80/interview/sendMail", candidateDetails);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
    // setActionId(interviewId);
    // setShowConfirmation(true);
  };

  const handleButtonClick = (interview) => {
    // Handle button click action here
    console.log(`Clicked button for interview with ID ${interview.id}`);
  };
  console.log(interviews)

  return (
    <div className="interview-list-container">
      <h2>Interviews Scheduled for Today</h2>

      {/* Conditional rendering based on loading state */}
      {isLoading ? (
        <p>Loading...</p>
      ) : interviews.length === 0 ? (
        <p>No interviews scheduled for today.</p>
      ) : (
        <ul className="interview-list">
          {interviews.map((interview) => (
            
            <li key={interview.id} className="interview-item">
            {!interview.action ?(
              <div className="interview-details">
                <div className="interview-detail">
                  <strong>Candidate Name:</strong> {interview.name}
                </div>
                <div className="interview-detail">
                  <strong>Mobile No:</strong> {interview.phone}
                </div>
                <div className="interview-detail">
                  <strong>Email:</strong> {interview.email}
                </div>
                <div className="interview-detail">
                  <strong>Slot Date:</strong> {interview.slotDate}
                </div>
                <div className="interview-detail">
                  <strong>Slot Time:</strong> {interview.slotTime}
                </div>
                <div className="interview-detail">
                  <strong>Applied job:</strong> {interview.selectedVacancy}
                </div>
                <div className="interview-detail">
                  <strong>Language:</strong> {interview.language}
                </div>
                <div className="interview-actions">
                  {!interview.telephonicInterviewStatus && !interview.action && (
                    <button onClick={() => handleButtonClick(interview)}>Take Interview</button>
                  )}
                  {!interview.action && interview.telephonicInterviewStatus && (
                    <button onClick={() => handleSendEmail(interview)}>Send Email</button>
                  )}
                </div>
              </div>
            ):(<div></div>)}
              
            </li>
          
          ))}
        </ul>
      )}

      {/* Confirmation Dialog */}
      {showConfirmation && (
        <div className="confirmation-dialog">
          <p>Are you sure you want to proceed?</p>
          <button onClick={handleConfirm}>Confirm</button>
          <button onClick={handleCancel}>Cancel</button>
        </div>
      )}
    </div>
  );
};

export default Interview;
