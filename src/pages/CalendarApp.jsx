// CalendarApp.jsx
import React, { useState, useEffect } from 'react';
import EventCalendar from './EventCalendar';
import AdminForm from './AdminForm';
import EventModal from './EventModal'; // Import the modal component
import '../css/CalendarApp.css';

const CalendarApp = () => {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAdmin] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('http://localhost:5000/events');
        const data = await response.json();
        
        const formattedEvents = data.map(event => ({
          id: event.id,
          title: event.title,
          start: event.startdate,
          end: event.enddate,
          detail: event.details,
          address: event.address
        }));

        setEvents(formattedEvents);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, []);

  const handleDateSelect = (selectInfo) => {
    setSelectedEvent(null);
    const title = prompt('Enter a title for your event');
    const calendarApi = selectInfo.view.calendar;
    calendarApi.unselect();

    if (title) {
      const newEvent = {
        id: Math.random(),
        title,
        detail: 'No details added',
        address: 'No address added',
        start: `${selectInfo.startStr}T10:00`,
        end: `${selectInfo.endStr}T12:00`,
      };
      setEvents([...events, newEvent]);
    }
  };

  const handleEventClick = (clickInfo) => {
    const clickedEvent = events.find(event => event.id === clickInfo.event.id);
    setSelectedEvent(clickedEvent);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedEvent(null);
  };

  const addOrUpdateEvent = (eventForm) => {
    const eventDateTime = `${eventForm.date}T${eventForm.time}`;

    if (eventForm.id) {
      const updatedEvents = events.map(event =>
        event.id === eventForm.id ? { ...eventForm, start: eventDateTime, end: eventDateTime } : event
      );
      setEvents(updatedEvents);
    } else {
      const newEvent = {
        id: Math.random(),
        title: eventForm.title,
        detail: eventForm.detail,
        address: eventForm.address,
        start: eventDateTime,
        end: eventDateTime,
      };
      setEvents([...events, newEvent]);
    }
  };

  const deleteEvent = (eventId) => {
    const updatedEvents = events.filter(event => event.id !== eventId);
    setEvents(updatedEvents);
    setSelectedEvent(null);
  };

  return (
    <div className="calendar-app">
      <div className="calendar-container">
        <EventCalendar
          events={events}
          handleDateSelect={handleDateSelect}
          handleEventClick={handleEventClick}
        />
      </div>
      <div className="admin-form-container">
        {isAdmin && (
          <AdminForm
            selectedEvent={selectedEvent}
            addOrUpdateEvent={addOrUpdateEvent}
            deleteEvent={deleteEvent}
            events={events}
            setEvents={setEvents}
          />
        )}
      </div>
      <div className="event-list-container">
        <h3>Event List</h3>
        <ul className="event-list">
          {events.map(event => (
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
      {selectedEvent && (
        <EventModal
          isOpen={isModalOpen}
          onRequestClose={closeModal}
          event={selectedEvent}
        />
      )}
    </div>
  );
};

export default CalendarApp;