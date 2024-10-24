import React from 'react';
import './ProgressBar.css';

const ProgressBar = ({ currentStep, stepTitles }) => {
  const getStepClass = (index) => {
    if (index + 1 === currentStep) return 'step current';
    if (index + 1 < currentStep) return 'step completed';
    return 'step';
  };

  return (
    <div className="progress-bar">
      {stepTitles.map((title, index) => (
        <div key={index} className={getStepClass(index)}>
          {title}
        </div>
      ))}
    </div>
  );
};

export default ProgressBar;
