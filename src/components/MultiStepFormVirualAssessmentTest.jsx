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
import StepZeroVirtualAssessmentTest from './StepZeroVirtalAssessmentTest';
import StepThreeVirtualAssessmentTest from './StepThreeVirtualAssessmentTest';

const MultiStepFormVirtualAssessmentTest = () => {
    const navigate = useNavigate();
    const [currentStep, setCurrentStep] = useState(1);
    const [formDataVirtualAssessmentTest, setFormDataVirtualAssessmentTest] = useState(() => {
        const storedData = localStorage.getItem('formDataVirtualAssessmentTest');
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
        localStorage.removeItem('formDataVirtualAssessmentTest'); // Clear formDataVirtual from local storage after submission
        navigate('/')
    };

    const prevStep = () => {
        setCurrentStep(currentStep - 1);
    };

    const nextStep = () => {
        setCurrentStep(currentStep + 1);
    };

    const updateFormDataVirtual = (updatedData) => {
        setFormDataVirtualAssessmentTest({
            ...formDataVirtualAssessmentTest,
            ...updatedData,
        });
    };

    const renderStep = () => {
        switch (currentStep) {
            case 1:
                return <StepZeroVirtualAssessmentTest nextStep={nextStep} formDataVirtualAssessmentTest={formDataVirtualAssessmentTest} setFormDataVirtualAssessmentTest={updateFormDataVirtual} />;
            case 2:
                return <StepThreeVirtualAssessmentTest prevStep={prevStep} nextStep={nextStep} formDataVirtualAssessmentTest={formDataVirtualAssessmentTest} setFormDataVirtualAssessmentTest={updateFormDataVirtual} />;
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

export default MultiStepFormVirtualAssessmentTest;
