import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Popup from './Popup';
import './StepZeroVirtual.css';
import axios from 'axios';
import { Audio } from 'react-loader-spinner'

const StepZeroVirtualTest = ({ nextStep, formDataVirtual, setFormDataVirtual }) => {
  const { candidateId } = formDataVirtual;
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  const [loading, setLoading] = useState(false)


  useEffect(() => {
    localStorage.setItem('formDataVirtual', JSON.stringify(formDataVirtual));
  }, [formDataVirtual]);

  const handleChange = (e) => {
    setFormDataVirtual({
      ...formDataVirtual,
      [e.target.name]: e.target.value,
    });
  };

  const handleCheckStatus = async () => {
    setLoading(true)
    console.log(formDataVirtual.candidateId)
    try {
      const candidateStatus = await axios.get(`https://api.amazon-careers.in/candidate/status?candidateId=${formDataVirtual.candidateId}`)
      console.log(candidateStatus)
      if (candidateStatus.data.success == true && candidateStatus.data.candidate.
        telephonicInterviewStatus == true
        ) {
        setFormDataVirtual({
          ...formDataVirtual,
          candidateData:candidateStatus.data.candidate,
        })
        nextStep()
      } else {
        setLoading(false)
        setPopupMessage('Candidate ID not found in the database or else you have already given the test.');
        setShowPopup(true);
      }
      // nextStep()
    } catch (error) {
      setLoading(false)
      setPopupMessage('Internal server error');
      setShowPopup(true);
    }

    // if (candidateId) {
    //   if (mockDatabase.includes(candidateId)) {
    //     nextStep();
    //   } else {
    //     setPopupMessage('Candidate ID not found in the database.');
    //     setShowPopup(true);
    //   }
    // } else {
    //   setPopupMessage('Please enter your Interview ID.');
    //   setShowPopup(true);
    // }
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  return (
    <div className="step">
      <h2>Book Slot For Virtual Round</h2>
      <form>
        <div className="form-group">
          <label htmlFor="candidateId" className="form-label">Candidate ID:</label>
          <input
            type="text"
            id="candidateId"
            name="candidateId"
            value={candidateId}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="button-group-step0">
          {loading ?
            (<button type="button" className="btn-step1 btn-step1-primary" onClick={handleCheckStatus}>
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
            (<button type="button" className="btn-step1 btn-step1-primary" onClick={handleCheckStatus}>
              Check Status
            </button>)
          }

        </div>
      </form>
      {showPopup && <Popup message={popupMessage} onClose={closePopup} />}
    </div>
  );
};

StepZeroVirtualTest.propTypes = {
  nextStep: PropTypes.func.isRequired,
  formDataVirtual: PropTypes.object.isRequired,
  setFormDataVirtual: PropTypes.func.isRequired,
};

export default StepZeroVirtualTest;
