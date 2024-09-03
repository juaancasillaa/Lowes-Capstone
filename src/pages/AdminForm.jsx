import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { geocodeAddress } from '../utils/geocode'; // Import the geocoding function
import '../css/AdminForm.css'; // Import CSS for styling

const AdminForm = ({ selectedEvent, addOrUpdateEvent, deleteEvent, events = [], setEvents }) => {
  const [eventForm, setEventForm] = useState({
    id: '',
    title: '',
    detail: '',
    address: '',
    date: '',
    time: ''
  });

  useEffect(() => {
    if (selectedEvent) {
      const eventDate = selectedEvent.start.split('T')[0];
      const eventTime = selectedEvent.start.split('T')[1];
      setEventForm({
        id: selectedEvent.id,
        title: selectedEvent.title,
        detail: selectedEvent.detail,
        address: selectedEvent.address,
        date: eventDate,
        time: eventTime
      });
    } else {
      setEventForm({ id: '', title: '', detail: '', address: '', date: '', time: '' });
    }
  }, [selectedEvent]);

  const handleInputChange = (e) => {
    setEventForm({ ...eventForm, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { lat, lng } = await geocodeAddress(eventForm.address, process.env.MAP_KEY);
      const eventDateTime = `${eventForm.date}T${eventForm.time}`;

      if (eventForm.id) {
        const updatedEvents = events.map((event) =>
          event.id === eventForm.id ? { ...eventForm, start: eventDateTime, end: eventDateTime, latitude: lat, longitude: lng } : event
        );
        setEvents(updatedEvents);
      } else {
        let newEvent = {
          id: Math.random(),
          title: eventForm.title,
          detail: eventForm.detail,
          address: eventForm.address,
          start: eventDateTime,
          end: eventDateTime,
          latitude: lat,
          longitude: lng
        };
        setEvents([...events, newEvent]);
      }

      setEventForm({ id: '', title: '', detail: '', address: '', date: '', time: '' });
    } catch (error) {
      console.error('Error adding or updating event:', error);
    }
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      deleteEvent(eventForm.id);
      setEventForm({ id: '', title: '', detail: '', address: '', date: '', time: '' });
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="event-form">
        <h3 className='header-h3'>{eventForm.id ? 'Edit Event' : 'Add Event'}</h3>
        <div className="form-group">
          <label>Event Name:</label>
          <input
            type="text"
            name="title"
            value={eventForm.title}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Detail:</label>
          <input
            type="text"
            name="detail"
            value={eventForm.detail}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Address:</label>
          <input
            type="text"
            name="address"
            value={eventForm.address}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Date:</label>
          <input
            type="date"
            name="date"
            value={eventForm.date}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Time:</label>
          <input
            type="time"
            name="time"
            value={eventForm.time}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-actions">
          <button type="submit">
            {eventForm.id ? 'Update Event' : 'Add Event'}
          </button>
          {eventForm.id && (
            <button type="button" onClick={handleDelete}>
              Delete Event
            </button>
          )}
        </div>
      </form>
      {/* Event list rendering */}
    </div>
  );
};

AdminForm.propTypes = {
  selectedEvent: PropTypes.object,
  addOrUpdateEvent: PropTypes.func.isRequired,
  deleteEvent: PropTypes.func.isRequired,
  events: PropTypes.array,
  setEvents: PropTypes.func.isRequired // Add setEvents to prop types
};

export default AdminForm;