// Popup.jsx

import React from 'react';
import PropTypes from 'prop-types';
import './Popup.css';

const Popup = ({ message, onClose }) => {
  return (
    <div className="popup-overlay">
      <div className="popup">
        <i className="fas fa-exclamation-circle popup-icon"></i>
        <p>{message}</p>
        <button onClick={onClose} className="btn-step1 btn-step1-secondary">Close</button>
      </div>
    </div>
  );
};

Popup.propTypes = {
  message: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Popup;
