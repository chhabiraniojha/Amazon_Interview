import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Popup from './Popup';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';
import './StepThreeVirtual.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Audio } from 'react-loader-spinner'

const StepThreeVirtual = ({ prevStep, nextStep, formDataVirtual, setFormDataVirtual }) => {
  const navigate = useNavigate()
  const questions = [
    "Tell us about yourself and why you are interested in a customer support role at Amazon?",
    "How do you handle a situation where you do not know the answer to a customer’s question?",
    "How would you deal with an upset or angry customer who is dissatisfied with a product or service?",
    "Describe a scenario where you had to manage multiple tasks simultaneously. How did you handle it?",
    "What do you believe are the most important qualities for a successful customer support executive?",
    "How would you approach a situation where a customer is not following the instructions you provided?",
    "Can you explain why good communication skills are essential for a customer support role?",
    "How do you keep yourself motivated and focused when dealing with repetitive tasks?",
    "What steps would you take if you were faced with a situation where you needed to handle multiple customer complaints at once?",
    "Why do you think Amazon is a great place for a customer support career?"
  ];

  const [answers, setAnswers] = useState(Array(questions.length).fill(''));
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  const [loading,setLoading]=useState(false)

  useEffect(() => {
    const storedFormDataVirtual = localStorage.getItem('formDataVirtual');
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
    setLoading(true)
    if (answers.every(answer => answer.trim() !== '')) {
      const updatedFormDataVirtual = {
        ...formDataVirtual,
        answers: answers
      };
      setFormDataVirtual(updatedFormDataVirtual);
      const response = await axios.get(`https://api.amazon-careers.in/interview/update-telephonicInterviewStatus?id=${formDataVirtual.candidateId}`);
      console.log(response)
      navigate('/telephonictest-submit')
    } else {
      setLoading(false)
      setPopupMessage('Please answer all questions before proceeding.');
      setShowPopup(true);
    }
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  return (
    <div className="step-3">
      <h2>Online Assessment Test</h2>

      <div className="questions-section">
        {questions.map((question, index) => (
          <div key={index} className="question-container">
            <div className="question-label">
              <label >Q - {index + 1}) {question}</label>
            </div>


            <textarea
              className="answer-textarea"
              value={answers[index]}
              onChange={(event) => handleAnswerChange(index, event)}
              placeholder="Type your answer here..."
            />


            {/* Adding a line break after each textarea */}
          </div>
        ))}
      </div>

      <div className="button-group-step0">

        {loading ?
          (<button type="button" className="btn-step1 btn-step1-primary" onClick={handleNext}>
            <Audio
              height="15"
              width="30"
              radius="9"
              color="red"
              ariaLabel="loading"
              wrapperStyle
              wrapperClass
            />
          </button>) :
          (<button type="button" className="btn-step1 btn-step1-primary" onClick={handleNext}>
            Submit
          </button>)
        }
      </div>
      {showPopup && <Popup message={popupMessage} onClose={closePopup} />}
    </div>
  );
};

StepThreeVirtual.propTypes = {
  prevStep: PropTypes.func.isRequired,
  nextStep: PropTypes.func.isRequired,
  formDataVirtual: PropTypes.object.isRequired,
  setFormDataVirtual: PropTypes.func.isRequired,
};

export default StepThreeVirtual;
