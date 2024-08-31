import React from 'react';
import './ErrorModal.css'; // Import the CSS file

const ErrorModal = ({ message, onClose }) => {
  if (!message) return null; // Don't render the modal if there's no message

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2 className='errorTitle'>Error</h2>
        <p>{message}</p>
        <button onClick={onClose} className='btnContent'>Close</button>
      </div>
    </div>
  );
};

export default ErrorModal;
