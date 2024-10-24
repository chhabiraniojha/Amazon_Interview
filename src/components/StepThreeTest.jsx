import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Popup from './Popup';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';
import './StepThree.css';

const StepThreeTest = ({ prevStep, nextStep, formDataVirtual, setFormDataVirtual }) => {
  const [selectedDate, setSelectedDate] = useState(moment().add(1, 'days').toDate()); // State to hold selected date
  const [selectedSlot, setSelectedSlot] = useState(''); // State to hold selected time slot
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');

  // Load formData from localStorage on component mount and set tomorrow's date
  useEffect(() => {
    const storedFormData = localStorage.getItem('formDataVirtual');
    if (storedFormData) {
      const parsedFormData = JSON.parse(storedFormData);
      const initialDate = parsedFormData.slotDate ? new Date(parsedFormData.slotDate) : null;
      setSelectedDate(initialDate || moment().add(2, 'days').toDate());
      setSelectedSlot(parsedFormData.slotTime || '');
    } else {
      setSelectedDate(moment().add(2, 'days').toDate());
    }
  }, []);

  const handleDateSelect = (date) => {
    setSelectedDate(date);
  };

  const handleSlotSelect = (e) => {
    setSelectedSlot(e.target.value);
  };

  const handleNext = () => {
    // Basic validation - ensure a date and slot are selected
    if (selectedDate && selectedSlot) {
      const updatedFormData = {
        ...formDataVirtual,
        slotDate: selectedDate, // Store selected date in form data
        slotTime: selectedSlot, // Store selected slot time in form data
      };
      setFormDataVirtual(updatedFormData);
      localStorage.setItem('formData', JSON.stringify(updatedFormData)); // Update local storage
      nextStep(); // Proceed to the next step
    } else {
      setPopupMessage('Please select both date and time slot for slot booking.');
      setShowPopup(true);
    }
  };

  const handleChangeDate = () => {
    setSelectedDate(null);
  };

  const generateTimeSlots = () => {
    return [
      { value: '10:00-12:00', label: '10:00 AM - 12:00 PM' },
      { value: '12:00-14:00', label: '12:00 PM - 02:00 PM' },
      { value: '14:00-16:00', label: '02:00 PM - 04:00 PM' },
      { value: '16:00-18:00', label: '04:00 PM - 06:00 PM' },
    ];
  };

  const timeSlots = generateTimeSlots();
  const closePopup = () => {
    setShowPopup(false);
  };

  const filterDate = (date) => {
    // Disable Sundays (0 represents Sunday in getDay())
    return date.getDay() !== 0;
  };

  return (
    <div className="step">
      <h2>Slot Booking</h2>
      <div className="calendar-container">
        <DatePicker
          selected={selectedDate}
          onChange={handleDateSelect}
          dateFormat="MM/dd/yyyy"
          minDate={moment().add(2, 'days').toDate()} // Disable today's date and start from tomorrow
          maxDate={moment().add(7, 'days').toDate()}
          placeholderText="Select a date"
          className="form-control" // Apply form-control class for consistent styling
        />
        {selectedDate && (
          <button type="button" className="change-date-button" onClick={handleChangeDate}>
            Change Date
          </button>
        )}
      </div>
      <div className="slot-selection">
        <label className="slot-label">Select Time Slot:</label>
        <div className="slot-options">
          <div className="slot-column">
            {timeSlots.slice(0, 2).map((slot, index) => (
              <label key={index} className="slot-option">
                <input
                  type="radio"
                  value={slot.label} // Storing the label which includes AM/PM
                  checked={selectedSlot === slot.label}
                  onChange={handleSlotSelect}
                  className="slot-radio"
                />
                {slot.label}
              </label>
            ))}
          </div>
          <div className="slot-column">
            {timeSlots.slice(2).map((slot, index) => (
              <label key={index} className="slot-option">
                <input
                  type="radio"
                  value={slot.label} // Storing the label which includes AM/PM
                  checked={selectedSlot === slot.label}
                  onChange={handleSlotSelect}
                  className="slot-radio"
                />
                {slot.label}
              </label>
            ))}
          </div>
        </div>
      </div>
      <div className="step-two-button-group">
        <button type="button" className="btn-step1 btn-step1-primary" onClick={prevStep}>
          Previous
        </button>
        <button type="button" className="btn-step1 btn-step1-primary" onClick={handleNext}>
          Next
        </button>
      </div>
      {showPopup && <Popup message={popupMessage} onClose={closePopup} />}
    </div>
  );
};

StepThreeTest.propTypes = {
  prevStep: PropTypes.func.isRequired,
  nextStep: PropTypes.func.isRequired,
  formData: PropTypes.object.isRequired,
  setFormData: PropTypes.func.isRequired,
};

export default StepThreeTest;
