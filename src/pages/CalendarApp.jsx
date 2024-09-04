import React, { useState } from 'react';
import EventCalendar from './EventCalendar';
import AdminForm from './AdminForm';
import '../css/CalendarApp.css'; // Import CSS for styling

const CalendarApp = () => {
  // State to manage the list of events
  const [events, setEvents] = useState([
    { id: 1, title: 'Event 1', detail: 'Detail 1', address: 'Address 1', start: '2024-08-30T10:00', end: '2024-08-30T12:00' },
  ]);

  // State to manage the currently selected event
  const [selectedEvent, setSelectedEvent] = useState(null);

  // State to manage admin privileges; can be extended or modified later
  const [isAdmin] = useState(true);

  // Handle date selection on the calendar to add a new event
  const handleDateSelect = (selectInfo) => {
    setSelectedEvent(null); // Reset form for a new event
    const title = prompt('Enter a title for your event');
    const calendarApi = selectInfo.view.calendar;

    calendarApi.unselect(); // Clear date selection

    if (title) {
      // Create a new event with user-provided title and default details
      let newEvent = {
        id: Math.random(), // Unique ID for the event
        title,
        detail: 'No details added',
        address: 'No address added',
        start: `${selectInfo.startStr}T10:00`, // Default start time
        end: `${selectInfo.endStr}T12:00`, // Default end time
      };
      setEvents([...events, newEvent]); // Add new event to the state
    }
  };

  // Handle clicking on an event to select it
  const handleEventClick = (clickInfo) => {
    const clickedEvent = events.find((event) => event.id === clickInfo.event.id);
    setSelectedEvent(clickedEvent); // Set the selected event
  };

  // Add or update an event based on the form data
  const addOrUpdateEvent = (eventForm) => {
    const eventDateTime = `${eventForm.date}T${eventForm.time}`;

    if (eventForm.id) {
      // Update existing event
      const updatedEvents = events.map((event) =>
        event.id === eventForm.id ? { ...eventForm, start: eventDateTime, end: eventDateTime } : event
      );
      setEvents(updatedEvents); // Update state with the modified events list
    } else {
      // Add a new event
      let newEvent = {
        id: Math.random(), // Unique ID for the new event
        title: eventForm.title,
        detail: eventForm.detail,
        address: eventForm.address,
        start: eventDateTime,
        end: eventDateTime,
      };
      setEvents([...events, newEvent]); // Add new event to the state
    }
  };

  // Delete an event by its ID
  const deleteEvent = (eventId) => {
    const updatedEvents = events.filter((event) => event.id !== eventId);
    setEvents(updatedEvents); // Update state with the remaining events
    setSelectedEvent(null); // Clear the selected event
  };

  return (
    <div className="calendar-app">
      <div className="calendar-container">
        {/* Render the calendar component */}
        <EventCalendar 
          events={events}
          handleDateSelect={handleDateSelect}
          handleEventClick={handleEventClick}
        />
      </div>
      <div className="admin-form-container">
        {/* Render the admin form if the user is an admin */}
        {isAdmin && (
          <AdminForm 
            selectedEvent={selectedEvent}
            addOrUpdateEvent={addOrUpdateEvent}
            deleteEvent={deleteEvent}
            events={events}
            setEvents={setEvents} // Pass setEvents to the AdminForm for event management
          />
        )}
      </div>
      <div className="event-list-container">
        <h3>Event List</h3>
        <ul className="event-list">
          {events.map((event) => (
            <li key={event.id} className="event-item">
              <span>{event.title}</span>
              <div className="event-actions">
                <button className="edit-btn" onClick={() => setSelectedEvent(event)}>Edit</button>
                <button className="delete-btn" onClick={() => deleteEvent(event.id)}>Delete</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CalendarApp;