import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import Modal from 'react-modal'; // Import react-modal
import '../css/UserEventsCalendar.css';

// Make sure to bind modal to the root of your app
Modal.setAppElement('#root');

const UserEventsCalendar = ({ handleDateSelect }) => {
  const [events, setEvents] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal for event details
  const [isFormModalOpen, setIsFormModalOpen] = useState(false); // Modal for the enrollment form
  const [selectedEvent, setSelectedEvent] = useState(null); // Store selected event
  const [formData, setFormData] = useState({ firstName: '', lastName: '', phone: '', email: '' });

  // Fetch events from the backend
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/events');
        const data = await response.json();

        // Map the fetched events to match FullCalendar's event format
        const formattedEvents = data.map(event => ({
          title: event.title,
          start: event.startdate,
          end: event.enddate,
          extendedProps: {
            details: event.details || 'No description available',
            address: event.address || 'No address available',
          },
        }));

        setEvents(formattedEvents);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, []);

  // Handle event click to show modal
  const handleEventClick = (clickInfo) => {
    setSelectedEvent(clickInfo.event); // Set clicked event data
    setIsModalOpen(true); // Open modal
  };

  // Handle form field changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  return (
    <div className="user-calendar-container">
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={events} // Pass the fetched events here
        selectable={true}
        selectMirror={true}
        dayMaxEvents={true}
        select={handleDateSelect}
        eventClick={handleEventClick} // Handle event click
        editable={true}
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,dayGridWeek',
        }}
      />

      {/* Modal for displaying event details */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)} // Close modal handler
        contentLabel="Event Details"
        className="custom-modal-content"
        overlayClassName="custom-modal-overlay"
      >
        {selectedEvent && (
          <div>
            <h2>{selectedEvent.title}</h2>
            <p>
              <strong>Date:</strong>{' '}
              {selectedEvent.start.toLocaleString()} -{' '}
              {selectedEvent.end ? selectedEvent.end.toLocaleString() : 'No end date'}
            </p>
            <p>
              <strong>Description:</strong> {selectedEvent.extendedProps.details}
            </p>
            <p>
              <strong>Address:</strong> {selectedEvent.extendedProps.address}
            </p>
            <button
              onClick={() => setIsFormModalOpen(true)} // Open enrollment form modal
              className="enroll-button"
            >
              Enroll
            </button>
            <button onClick={() => setIsModalOpen(false)} className="close-button">
              Close
            </button>
          </div>
        )}
      </Modal>

      {/* Modal for the enrollment form */}
      <Modal
        isOpen={isFormModalOpen}
        onRequestClose={() => setIsFormModalOpen(false)} // Close form modal
        contentLabel="Enrollment Form"
        className="custom-modal-content"
        overlayClassName="custom-modal-overlay"
      >
        <h2>Enrollment Form</h2>
        <form>
          <label>
            First Name:
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Last Name:
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Phone Number:
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Email:
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
            />
          </label>
          <button type="submit" className="submit-button">
            Submit
          </button>
        </form>
        <button onClick={() => setIsFormModalOpen(false)} className="close-button">
          Close
        </button>
      </Modal>
    </div>
  );
};

export default UserEventsCalendar;