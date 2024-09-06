// EventModal.jsx
import React from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root'); // Ensure this is correct

const EventModal = ({ isOpen, onRequestClose, event }) => {
  if (!isOpen) return null; // Early return if modal is not open

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Event Details"
      className="modal"
      overlayClassName="modal-overlay"
    >
      <h2>{event.title}</h2>
      <p><strong>Details:</strong> {event.detail}</p>
      <p><strong>Address:</strong> {event.address}</p>
      <p><strong>Start:</strong> {new Date(event.start).toLocaleString()}</p>
      <p><strong>End:</strong> {new Date(event.end).toLocaleString()}</p>
      <button onClick={onRequestClose}>Close</button>
    </Modal>
  );
};

export default EventModal;