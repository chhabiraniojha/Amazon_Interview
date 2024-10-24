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
import StepZeroVirtualTest from './StepZeroVirtualTest';
import StepThreeTest from './StepThreeTest';
import StepFourTest from './StepFourTest';

const MultiStepFormTest = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formDataVirtual, setFormDataVirtual] = useState(() => {
    const storedData = localStorage.getItem('formDataVirtual');
    return storedData ? JSON.parse(storedData) : {
      candidateId:'',  
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
    localStorage.removeItem('formDataVirtual'); // Clear formData from local storage after submission
    navigate('/')
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const nextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const updateFormData = (updatedData) => {
    setFormDataVirtual({
      ...formDataVirtual,
      ...updatedData,
    });
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <StepZeroVirtualTest nextStep={nextStep} formDataVirtual={formDataVirtual} setFormDataVirtual={updateFormData} />;
      case 2:
        return <StepThreeTest prevStep={prevStep} nextStep={nextStep} formDataVirtual={formDataVirtual} setFormDataVirtual={updateFormData} />;
      case 3:
        return <StepFourTest prevStep={prevStep} handleSubmit={handleSubmit} formDataVirtual={formDataVirtual} />;
      default:
        return null;
    }
  };

  const stepTitles = ['StatusCheck', 'Slot Selection', 'Review and Book']; // Updated step titles

  return (
    <div>
      <Navbar />
      <div className="multistep-form">
      <h1 className="form-heading">Virtual Interview Slot Booking Form</h1>
      <ProgressBar currentStep={currentStep} stepTitles={stepTitles} />
      <div className="form-content">
        {renderStep()}
      </div>
    </div>
    <Footer />
    </div>
    
  );
};

export default MultiStepFormTest;
