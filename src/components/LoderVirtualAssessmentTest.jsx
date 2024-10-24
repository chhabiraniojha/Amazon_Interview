import React from 'react';
import './Loader.css';

const LoaderVirtualAssessmentTest = () => {
  return (
    <div className="loader-container">
      <div className="loader">
        <i className="fas fa-spinner fa-spin"></i>
      </div>
      <p className="loader-text">Our AI teacher Lina is reviewing your Copy.It may take up to 2 minutes...</p>
      <p className="loader-note">
        <i className="fas fa-exclamation-triangle"></i> 
        Please do not press the back button or reload the page.
      </p>
    </div>
  );
};

export default LoaderVirtualAssessmentTest;
