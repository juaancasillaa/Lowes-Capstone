import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import '../css/AdminForm.css'; // Import CSS for styling

const AdminForm = ({ selectedEvent, events = [], setEvents }) => {
  // State to manage form input values
  const [eventForm, setEventForm] = useState({
    id: '',
    title: '',
    startdate: '',
    enddate: '',
    details: '',
    address: ''
  });

  // Update form state when a new event is selected
  useEffect(() => {
    if (selectedEvent) {
      setEventForm({
        id: selectedEvent.id,
        title: selectedEvent.title,
        startdate: selectedEvent.startdate || '', // Ensure default empty string if undefined
        enddate: selectedEvent.enddate || '',
        details: selectedEvent.details || '',
        address: selectedEvent.address || ''
      });
    } else {
      // Reset form if no event is selected
      setEventForm({ id: '', title: '', startdate: '', enddate: '', details: '', address: '' });
    }
  }, [selectedEvent]);

  // Format dates to YYYY-MM-DD
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
  };

  // Handle changes in form input fields
  const handleInputChange = (e) => {
    setEventForm({ ...eventForm, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Submitting form:', eventForm);

    // Format dates to YYYY-MM-DD
    const eventPayload = {
      title: eventForm.title,
      details: eventForm.details,
      startdate: formatDate(eventForm.startdate),
      enddate: formatDate(eventForm.enddate),
      address: eventForm.address
    };

    try {
      const response = eventForm.id
        ? await fetch(`http://localhost:5000/events/${eventForm.id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(eventPayload),
          })
        : await fetch('http://localhost:5000/events', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(eventPayload),
          });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error details:', errorData);
        throw new Error(eventForm.id ? 'Failed to update the event' : 'Failed to add the event');
      }

      const resultEvent = await response.json();
      if (eventForm.id) {
        // Update existing event
        setEvents(events.map(event => event.id === resultEvent.id ? resultEvent : event));
      } else {
        // Add new event
        setEvents([...events, resultEvent]);
      }

      // Reset the form after submission
      setEventForm({ id: '', title: '', startdate: '', enddate: '', details: '', address: '' });
    } catch (error) {
      console.error('Error saving event:', error);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      try {
        await fetch(`http://localhost:5000/events/${eventForm.id}`, {
          method: 'DELETE',
        });
        console.log('Event deleted:', eventForm.id);

        // Remove the deleted event from the events list
        setEvents(events.filter(event => event.id !== eventForm.id));
        // Reset the form after deletion
        setEventForm({ id: '', title: '', startdate: '', enddate: '', details: '', address: '' });
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
          <label>Title:</label>
          <input
            className='form-inputs'
            type="text"
            name="title"
            value={eventForm.title}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Start Date:</label>
          <input
            className='form-inputs'
            type="date"
            name="startdate"
            value={eventForm.startdate}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label>End Date:</label>
          <input
            className='form-inputs'
            type="date"
            name="enddate"
            value={eventForm.enddate}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Details:</label>
          <textarea
            className='form-inputs'
            name="details"
            value={eventForm.details}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Address:</label>
          <input
            className='form-inputs'
            type="text"
            name="address"
            value={eventForm.address}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-actions">
          <button type="submit" className='btn-submit'>
            {eventForm.id ? 'Update Event' : 'Add Event'}
          </button>
          {eventForm.id && (
            <button type="button" className='delete-btn' onClick={handleDelete}>
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