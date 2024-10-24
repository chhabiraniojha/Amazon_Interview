import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Popup from './Popup';
import './StepTwo.css';

const StepTwoVirtual = ({ prevStep, nextStep, formData, setFormData }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');

  // Effect to update local storage with file names when form data changes
  useEffect(() => {
    const { aadhaarFront, aadhaarBack, resume } = formData;
    const updatedFormData = { aadhaarFront, aadhaarBack, resume }; // Extracting only the file names
    localStorage.setItem('formData', JSON.stringify(updatedFormData));
  }, [formData]);

  // Function to handle file change
  const handleFileChange = (e, name) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const updatedFormData = {
          ...formData,
          [name]: {
            name: file.name,
          },
        };
        setFormData(updatedFormData);
      };
      reader.readAsDataURL(file);
    }
  };

  // Function to delete a file from form data
  const handleDeleteFile = (name) => {
    setFormData({
      ...formData,
      [name]: null,
    });
  };

  // Function to handle next step button click
  const handleNext = () => {
    // Basic validation - ensure all files are uploaded
    if (formData.aadhaarFront && formData.aadhaarBack && formData.resume) {
      nextStep(); // Proceed to the next step if validation passes
    } else {
      setPopupMessage('Please upload all required documents.');
      setShowPopup(true);
    }
  };

  // Function to close the popup
  const closePopup = () => {
    setShowPopup(false);
  };

  return (
    <div className="step-two">
      <h2 className="step-two-title">Document Upload</h2>
      <p className="step-two-note">Note: Delete the uploaded file before re-uploading.</p>
      <form className="step-two-form">
        <div className="step-two-form-group">
          <label htmlFor="aadhaarFront" className="step-two-form-label">
            Aadhaar Card Front:
          </label>
          {formData.aadhaarFront ? (
            <div className="step-two-uploaded-file">
              <span className="step-two-file-name">{formData.aadhaarFront.name}</span>
              <button
                type="button"
                className="step-two-btn-delete"
                onClick={() => handleDeleteFile('aadhaarFront')}
              >
                Delete
              </button>
            </div>
          ) : (
            <>
              <input
                type="file"
                id="aadhaarFront"
                name="aadhaarFront"
                onChange={(e) => handleFileChange(e, 'aadhaarFront')}
                className="step-two-file-input"
                required
              />
            </>
          )}
        </div>
        <div className="step-two-form-group">
          <label htmlFor="aadhaarBack" className="step-two-form-label">
            Aadhaar Card Back:
          </label>
          {formData.aadhaarBack ? (
            <div className="step-two-uploaded-file">
              <span className="step-two-file-name">{formData.aadhaarBack.name}</span>
              <button
                type="button"
                className="step-two-btn-delete"
                onClick={() => handleDeleteFile('aadhaarBack')}
              >
                Delete
              </button>
            </div>
          ) : (
            <>
              <input
                type="file"
                id="aadhaarBack"
                name="aadhaarBack"
                onChange={(e) => handleFileChange(e, 'aadhaarBack')}
                className="step-two-file-input"
                required
              />
            </>
          )}
        </div>
        <div className="step-two-form-group">
          <label htmlFor="resume" className="step-two-form-label">
            Updated Resume:
          </label>
          {formData.resume ? (
            <div className="step-two-uploaded-file">
              <span className="step-two-file-name">{formData.resume.name}</span>
              <button
                type="button"
                className="step-two-btn-delete"
                onClick={() => handleDeleteFile('resume')}
              >
                Delete
              </button>
            </div>
          ) : (
            <>
              <input
                type="file"
                id="resume"
                name="resume"
                onChange={(e) => handleFileChange(e, 'resume')}
                className="step-two-file-input"
                required
              />
            </>
          )}
        </div>
        <div className="step-two-button-group">
          <button type="button" className="btn btn-secondary" onClick={prevStep}>
            Previous
          </button>
          <button type="button" className="btn btn-primary" onClick={handleNext}>
            Next
          </button>
        </div>
      </form>
      {showPopup && <Popup message={popupMessage} onClose={closePopup} />}
    </div>
  );
};

StepTwoVirtual.propTypes = {
  prevStep: PropTypes.func.isRequired,
  nextStep: PropTypes.func.isRequired,
  formData: PropTypes.object.isRequired,
  setFormData: PropTypes.func.isRequired,
};

export default StepTwoVirtual;
