import React, { useState } from 'react';
import EventCalendar from './EventCalendar';
import AdminForm from './AdminForm';
import MapComponent from './MapComponent'; // Ensure you use this if needed
import '../css/CalendarApp.css'; // Your styles

const CalendarApp = () => {
  const [events, setEvents] = useState([
    { id: 1, title: 'Event 1', detail: 'Detail 1', address: 'Address 1', start: '2024-08-30T10:00', end: '2024-08-30T12:00' },
  ]);

  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isAdmin] = useState(true); // Keep isAdmin state if you plan to use it later

  const handleDateSelect = (selectInfo) => {
    setSelectedEvent(null); // Reset form for a new event
    const title = prompt('Enter a title for your event');
    const calendarApi = selectInfo.view.calendar;

    calendarApi.unselect(); // Clear date selection

    if (title) {
      let newEvent = {
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
    const clickedEvent = events.find((event) => event.id === clickInfo.event.id);
    setSelectedEvent(clickedEvent);
  };

  const addOrUpdateEvent = (eventForm) => {
    const eventDateTime = `${eventForm.date}T${eventForm.time}`;

    if (eventForm.id) {
      const updatedEvents = events.map((event) =>
        event.id === eventForm.id ? { ...eventForm, start: eventDateTime, end: eventDateTime } : event
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
      };
      setEvents([...events, newEvent]);
    }
  };

  const deleteEvent = (eventId) => {
    const updatedEvents = events.filter((event) => event.id !== eventId);
    setEvents(updatedEvents);
    setSelectedEvent(null);
  };

  return (
    <div className="calendar-app">
      <EventCalendar 
        events={events}
        handleDateSelect={handleDateSelect}
        handleEventClick={handleEventClick}
      />
      {isAdmin && (
        <AdminForm 
          selectedEvent={selectedEvent}
          addOrUpdateEvent={addOrUpdateEvent}
          deleteEvent={deleteEvent}
          events={events}
          setEvents={setEvents} // Pass setEvents as a prop
        />
      )}
      <MapComponent events={events} />
      {/* Ensure MapComponent is used if needed */}
      {/* <MapComponent events={events} /> */}
    </div>
  );
};

export default CalendarApp;