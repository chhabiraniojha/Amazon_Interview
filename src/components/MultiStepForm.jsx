// MultiStepForm.jsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import StepOne from './StepOne';
import StepTwo from './StepTwo';
import StepThree from './StepThree';
import StepFour from './StepFour';
import ProgressBar from './ProgressBar';
import Navbar from './Navbar';
import Footer from './Footer';
import './MultiStepForm.css';

const MultiStepForm = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState(() => {
    const storedData = localStorage.getItem('formData');
    return storedData ? JSON.parse(storedData) : {
      firstName: '',
      lastName: '',
      email: '',
      document: null,
      slot: '',
      payment: '',
    };
  });

  const handleSubmit = () => {
    // Handle form submission logic here
    // For demonstration, simply navigate to the next step after submitting
    setCurrentStep(currentStep + 1); // Move to next step
    localStorage.removeItem('formData'); // Clear formData from local storage after submission
    navigate('/')
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const nextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const updateFormData = (updatedData) => {
    setFormData({
      ...formData,
      ...updatedData,
    });
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <StepOne nextStep={nextStep} formData={formData} setFormData={updateFormData} />;
      case 2:
        return <StepTwo prevStep={prevStep} nextStep={nextStep} formData={formData} setFormData={updateFormData} />;
      case 3:
        return <StepThree prevStep={prevStep} nextStep={nextStep} formData={formData} setFormData={updateFormData} />;
      case 4:
        return <StepFour prevStep={prevStep} handleSubmit={handleSubmit} formData={formData} />;
      default:
        return null;
    }
  };

  const stepTitles = ['Personal Information', 'Document Upload', 'Slot Selection', 'Review and Book']; // Updated step titles

  return (
    <div>
      <Navbar />
      <div className="multistep-form">
      <h1 className="form-heading">Online Interview Slot Booking Form</h1>
      <ProgressBar currentStep={currentStep} stepTitles={stepTitles} />
      <div className="form-content">
        {renderStep()}
      </div>
    </div>
    <Footer />
    </div>
    
  );
};

export default MultiStepForm;
