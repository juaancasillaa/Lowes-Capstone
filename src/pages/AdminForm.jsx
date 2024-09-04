import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import '../css/AdminForm.css'; // Import CSS for styling

const AdminForm = ({ selectedEvent, events = [], setEvents }) => {
  // State to manage form input values
  const [eventForm, setEventForm] = useState({
    id: '',
    title: '',
    detail: '',
    address: '',
    date: '',
    time: ''
  });

  // Update form state when a new event is selected
  useEffect(() => {
    if (selectedEvent) {
      // Split the date and time from the selected event's start datetime
      const eventDate = selectedEvent.start.split('T')[0];
      const eventTime = selectedEvent.start.split('T')[1];
      
      // Populate the form with the selected event's details
      setEventForm({
        id: selectedEvent.id,
        title: selectedEvent.title,
        detail: selectedEvent.detail,
        address: selectedEvent.address,
        date: eventDate,
        time: eventTime
      });
    } else {
      // Reset form if no event is selected
      setEventForm({ id: '', title: '', detail: '', address: '', date: '', time: '' });
    }
  }, [selectedEvent]);

  // Handle changes in form input fields
  const handleInputChange = (e) => {
    setEventForm({ ...eventForm, [e.target.name]: e.target.value });
  };

  // Handle form submission for adding or updating an event
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    console.log('Submitting form:', eventForm);
    
    try {
      if (eventForm.id) {
        // Update existing event
        const response = await fetch(`http://localhost:5000/api/events/${eventForm.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            event_name: eventForm.title,
            details: eventForm.detail,
            address: eventForm.address,
            event_date: eventForm.date,
            event_time: eventForm.time,
          }),
        });

        console.log('Response status:', response.status);
        console.log('Response data:', await response.json());

        if (!response.ok) {
          const errorData = await response.json();
          console.error('Error details:', errorData);
          throw new Error('Failed to update the event');
        }

        const updatedEvent = await response.json();
        // Update the events list with the updated event
        setEvents(events.map(event => event.id === updatedEvent.id ? updatedEvent : event));
      } else {
        // Add a new event
        const response = await fetch('http://localhost:5000/api/events', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            event_name: eventForm.title,
            details: eventForm.detail,
            address: eventForm.address,
            event_date: eventForm.date,
            event_time: eventForm.time,
          }),
        });

        console.log('Response status:', response.status);
        console.log('Response data:', await response.json());

        if (!response.ok) {
          const errorData = await response.json();
          console.error('Error details:', errorData);
          throw new Error('Failed to add the event');
        }

        const newEvent = await response.json();
        // Add the new event to the events list
        setEvents([...events, newEvent]);
      }
    
      // Reset the form after submission
      setEventForm({ id: '', title: '', detail: '', address: '', date: '', time: '' });
    } catch (error) {
      console.error('Error saving event:', error);
    }
  };  

  // Handle deletion of an event
  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      try {
        await fetch(`/api/events/${eventForm.id}`, {
          method: 'DELETE',
        });
        console.log('Event deleted:', eventForm.id);

        // Remove the deleted event from the events list
        const updatedEvents = events.filter((event) => event.id !== eventForm.id);
        setEvents(updatedEvents);
        // Reset the form after deletion
        setEventForm({ id: '', title: '', detail: '', address: '', date: '', time: '' });
      } catch (error) {
        console.error('Error deleting event:', error);
      }
    }
  };

  return (
    <div className="admin-form-container">
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
          <button type="submit" className='btn-submit'>
            {eventForm.id ? 'Update Event' : 'Add Event'}
          </button>
          {eventForm.id && (
            <button type="button" onClick={handleDelete}>
              Delete Event
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

AdminForm.propTypes = {
  selectedEvent: PropTypes.object,
  events: PropTypes.array,
  setEvents: PropTypes.func.isRequired,
};

export default AdminForm;