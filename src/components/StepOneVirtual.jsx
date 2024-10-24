import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Popup from "./Popup";
import './StepOneVirtual.css';

const StepOneVirtual = ({ prevStep,nextStep, formData, setFormData }) => {
    // const { firstName, lastName, email, phone, selectedVacancy } = formData;

    const [showPopup, setShowPopup] = useState(false);
    const [popupMessage, setPopupMessage] = useState('');

    useEffect(() => {
        localStorage.setItem('formData', JSON.stringify(formData));
    }, [formData]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleNext = () => {
        if (firstName && lastName && email && phone && selectedVacancy) {
            nextStep();
        } else {
            setPopupMessage('Please fill in all fields including selecting a vacancy.');
            setShowPopup(true);
        }
    };

    const closePopup = () => {
        setShowPopup(false);
    };

    return (
        <div className="step">
            <h2>Personal Information</h2>
            <form>
                <div className="form-group">
                    <label htmlFor="firstName" className='form-label'>First Name:</label>
                    <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={firstName}
                        onChange={handleChange}
                        className="form-control"
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="lastName" className='form-label'>Last Name:</label>
                    <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={lastName}
                        onChange={handleChange}
                        className="form-control"
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email" className='form-label'>Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={email}
                        onChange={handleChange}
                        className="form-control"
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="phone" className='form-label'>Phone:</label>
                    <input
                        type="text"
                        id="phone"
                        name="phone"
                        value={phone}
                        onChange={handleChange}
                        className="form-control"
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="selectedVacancy" className='form-label'>Select Vacancy:</label>
                    <select
                        id="selectedVacancy"
                        name="selectedVacancy"
                        value={selectedVacancy}
                        onChange={handleChange}
                        className="form-control"
                        required
                    >
                        <option value="">Select a vacancy...</option>
                        <option value="Customer Support Executive">Customer Support Executive</option>
                        <option value="Data Entry Operator">Data Entry Operator</option>
                        <option value="Software Engineer">Software Engineer</option>
                        <option value="Digital Marketer">Digital Marketer</option>
                        <option value="Data Analyst">Data Analyst</option>
                        <option value="Product Manager">Product Manager</option>
                        <option value="Graphic Designer">Graphic Designer</option>
                    </select>
                </div>
                <div className=" button-group-step1">
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

StepOneVirtual.propTypes = {
    nextStep: PropTypes.func.isRequired,
    formData: PropTypes.object.isRequired,
    setFormData: PropTypes.func.isRequired,
};

export default StepOneVirtual;
