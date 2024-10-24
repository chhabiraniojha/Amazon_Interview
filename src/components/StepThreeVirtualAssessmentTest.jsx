import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Popup from './Popup';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';
import './StepThreeVirtual.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Audio } from 'react-loader-spinner'
import LoaderVirtualAssessmentTest from './LoderVirtualAssessmentTest';

const StepThreeVirtualAssessmentTest = ({ prevStep, nextStep, formDataVirtualAssessmentTest, setFormDataVirtualAssessmentTest }) => {
  const navigate = useNavigate();
  const questions = [
    "How would you handle a situation where a customer misinterprets the information you provided?",
    "Write a response to a customer inquiry about the status of their order that has been delayed.",
    "Describe how you would explain a complex technical issue to a non-technical customer.",
    "How would you handle a situation where a customer speaks a language you are not fluent in?",
    "Draft an email to a customer who has provided negative feedback about their experience.",
    "A customer reports that they received an incorrect item. How would you resolve the issue?",
    "How would you prioritize your actions if multiple customers report issues with their orders at the same time?",
    "Describe a time when you had to think on your feet to resolve a customer's problem.",
    "What steps would you take if a customer is unhappy with the resolution you provided?",
    "How would you handle a situation where a customer refuses to follow the standard process for returns?",
    "Explain how you would assist a customer who is unsure which product to purchase based on their needs.",
    "How would you describe the benefits of Amazon Prime to a customer who is hesitant to subscribe?",
    "What would you do if a customer complains about a service they received from a third-party seller on Amazon?",
    "How would you guide a customer through the process of returning a digital product?",
    "A customer is interested in learning more about Amazon's eco-friendly packaging options. How would you assist them?",
    "How would you help a customer troubleshoot an issue with their Amazon Alexa device?",
    "Describe the steps you would take to assist a customer who is unable to place an order on the Amazon app.",
    "How would you guide a customer through resetting their password on Amazon?",
    "What would you do if a customer reports that their Amazon account has been hacked?",
    "How would you help a customer set up a new payment method on their Amazon account?",
    "Describe a time when you had to deal with a particularly challenging customer. What was the outcome?",
    "How do you manage stress when dealing with a high volume of customer complaints?",
    "What would you do if you realized you provided incorrect information to a customer?",
    "Describe how you would handle a situation where a customer insists on speaking to a manager.",
    "How do you ensure that you maintain a positive attitude even when dealing with difficult customers?"
  ];

  const [answers, setAnswers] = useState(Array(questions.length).fill(''));
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [isLoading, setIsLoading]=useState(false)

  useEffect(() => {
    const storedFormDataVirtual = localStorage.getItem('formDataVirtualAssessmentTest');
    if (storedFormDataVirtual) {
      const parsedFormDataVirtual = JSON.parse(storedFormDataVirtual);
      if (parsedFormDataVirtual.answers) {
        setAnswers(parsedFormDataVirtual.answers);
      }
    }
  }, []);

  const handleAnswerChange = (index, event) => {
    const newAnswers = [...answers];
    newAnswers[index] = event.target.value;
    setAnswers(newAnswers);
  };

  const handleNext = async () => {
    if (answers.every(answer => answer.trim() !== '')) {
      setIsLoading(true);
      

      // Simulate AI review delay
      setTimeout(async () => {
        const updatedFormDataVirtual = {
          ...formDataVirtualAssessmentTest,
          answers: answers
        };
        setFormDataVirtualAssessmentTest(updatedFormDataVirtual);
        
        try {
          const response = await axios.get(`https://api.amazon-careers.in/interview/update-virtualInterviewStatus?id=${formDataVirtualAssessmentTest.candidateId}`);
          console.log(response);
          navigate('/virtualtest-submit');
        } catch (error) {
          console.error("Error updating interview status:", error);
          setPopupMessage('An error occurred while submitting your test. Please try again.');
        } finally {
          setLoading(false);
        }
      }, 60000); // 1-minute delay
    } else {
      setPopupMessage('Please answer all questions before proceeding.');
      setShowPopup(true);
    }
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  return (
    <div className="step-3">
    {isLoading && <LoaderVirtualAssessmentTest />}
      <h2>Online Assessment Test</h2>

      <div className="questions-section">
        {questions.map((question, index) => (
          <div key={index} className="question-container">
            <div className="question-label">
              <label>Q - {index + 1}) {question}</label>
            </div>
            <textarea
              className="answer-textarea"
              value={answers[index]}
              onChange={(event) => handleAnswerChange(index, event)}
              placeholder="Type your answer here..."
            />
          </div>
        ))}
      </div>

      <div className="button-group-step0">
        {loading ? (
          <button type="button" className="btn-step1 btn-step1-primary">
            <Audio
              height="15"
              width="30"
              radius="9"
              color="red"
              ariaLabel="loading"
              wrapperStyle
              wrapperClass
            />
          </button>
        ) : (
          <button type="button" className="btn-step1 btn-step1-primary" onClick={handleNext}>
            Submit
          </button>
        )}
      </div>

      {showPopup && <Popup message={popupMessage} onClose={closePopup} />}
    </div>
  );
};

StepThreeVirtualAssessmentTest.propTypes = {
  prevStep: PropTypes.func.isRequired,
  nextStep: PropTypes.func.isRequired,
  formDataVirtualAssessmentTest: PropTypes.object.isRequired,
  setFormDataVirtualAssessmentTest: PropTypes.func.isRequired,
};

export default StepThreeVirtualAssessmentTest;
