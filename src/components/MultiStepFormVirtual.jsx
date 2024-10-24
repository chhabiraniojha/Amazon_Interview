// MultiStepForm.jsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import StepOneVirtual from './StepOneVirtual';
import StepTwoVirtual from './StepTwoVirtual';
import StepThreeVirtual from './StepThreeVirtual';
import StepFourVirtual from './StepFourVirtual';
import ProgressBarVirtual from './ProgressBarVirtual';
import './MultiStepForm.css';
import StepZeroVirtual from './StepZeroVirtual';
import Navbar from './Navbar';
import Footer from './Footer';

const MultiStepFormVirtual = () => {
    const navigate = useNavigate();
    const [currentStep, setCurrentStep] = useState(1);
    const [formDataVirtual, setFormDataVirtual] = useState(() => {
        const storedData = localStorage.getItem('formDataVirtual');
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
        localStorage.removeItem('formDataVirtual'); // Clear formDataVirtual from local storage after submission
        navigate('/')
    };

    const prevStep = () => {
        setCurrentStep(currentStep - 1);
    };

    const nextStep = () => {
        setCurrentStep(currentStep + 1);
    };

    const updateFormDataVirtual = (updatedData) => {
        setFormDataVirtual({
            ...formDataVirtual,
            ...updatedData,
        });
    };

    const renderStep = () => {
        switch (currentStep) {
            case 1:
                return <StepZeroVirtual nextStep={nextStep} formDataVirtual={formDataVirtual} setFormDataVirtual={updateFormDataVirtual} />;
            case 2:
                return <StepThreeVirtual prevStep={prevStep} nextStep={nextStep} formDataVirtual={formDataVirtual} setFormDataVirtual={updateFormDataVirtual} />;
            default:
                return null;
        }
    };

    const stepTitles = ['Candidate Id', 'Give Test']; // Updated step titles

    return (
        <div>
        <Navbar />
            <div className="multistep-form">
                <h1 className="form-heading">Written Test</h1>
                <ProgressBarVirtual currentStep={currentStep} stepTitles={stepTitles} />
                <div className="form-content">
                    {renderStep()}
                </div>
            </div>
            <Footer/>
        </div>

    );
};

export default MultiStepFormVirtual;
