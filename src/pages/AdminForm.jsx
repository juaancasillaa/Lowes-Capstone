import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import '../css/AdminForm.css'; // Import CSS for styling

const AdminForm = ({ selectedEvent, events = [], setEvents }) => {
  // State to manage form input values
  const [eventForm, setEventForm] = useState({
    id: '',
    title: '',
    startDateTime: '',
    endDateTime: '',
    description: ''
  });

  // Update form state when a new event is selected
  useEffect(() => {
    if (selectedEvent) {
      // Populate the form with the selected event's details
      setEventForm({
        id: selectedEvent.id,
        title: selectedEvent.title,
        startDateTime: selectedEvent.start.split('T').join('T'),
        endDateTime: selectedEvent.end.split('T').join('T'),
        description: selectedEvent.description
      });
    } else {
      // Reset form if no event is selected
      setEventForm({ id: '', title: '', startDateTime: '', endDateTime: '', description: '' });
    }
  }, [selectedEvent]);

  // Handle changes in form input fields
  const handleInputChange = (e) => {
    setEventForm({ ...eventForm, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    console.log('Submitting form:', eventForm);
    
    try {
      const eventPayload = {
        title: eventForm.title,
        details: eventForm.description,
        start: `${eventForm.startDateTime}:00`, // Adding seconds
        end: `${eventForm.endDateTime}:00` // Adding seconds
      };
  
      if (eventForm.id) {
        // Update existing event
        const response = await fetch(`http://localhost:5000/api/events/${eventForm.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(eventPayload),
        });
  
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
          body: JSON.stringify(eventPayload),
        });
  
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
      setEventForm({ id: '', title: '', startDateTime: '', endDateTime: '', description: '' });
    } catch (error) {
      console.error('Error saving event:', error);
    }
  };     
  
  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      try {
        await fetch(`http://localhost:5000/api/events/${eventForm.id}`, {
          method: 'DELETE',
        });
        console.log('Event deleted:', eventForm.id);
  
        // Remove the deleted event from the events list
        const updatedEvents = events.filter((event) => event.id !== eventForm.id);
        setEvents(updatedEvents);
        // Reset the form after deletion
        setEventForm({ id: '', title: '', startDateTime: '', endDateTime: '', description: '' });
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
          <label>Start Date & Time:</label>
          <input
            className='form-inputs'
            type="datetime-local"
            name="startDateTime"
            value={eventForm.startDateTime}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label>End Date & Time:</label>
          <input
            className='form-inputs'
            type="datetime-local"
            name="endDateTime"
            value={eventForm.endDateTime}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Description:</label>
          <textarea
            className='form-inputs'
            name="description"
            value={eventForm.description}
            onChange={handleInputChange}
            required
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