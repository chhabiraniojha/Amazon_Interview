import React from 'react';
import './Loader.css';

const Loader1 = () => {
  return (
    <div className="loader-container">
      <div className="loader">
        <i className="fas fa-spinner fa-spin"></i>
      </div>
      <p className="loader-text">booking the slot for you please wait!...</p>
      <p className="loader-note">
        <i className="fas fa-exclamation-triangle"></i> 
        Please do not press the back button or reload the page.
      </p>
    </div>
  );
};

export default Loader1;