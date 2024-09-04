// EventCalendar.js
import React from 'react';
import FullCalendar from '@fullcalendar/react'; // Import FullCalendar component
import dayGridPlugin from '@fullcalendar/daygrid'; // Import the day grid plugin for month view
import interactionPlugin from '@fullcalendar/interaction'; // Import the interaction plugin for event selection and clicking
import '../css/EventCalendar.css'; // Import CSS for styling

const EventCalendar = ({ events, handleDateSelect, handleEventClick }) => {
  return (
    <div className="calendar-container">
      {/* Render the FullCalendar component with specified configurations */}
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]} // Use day grid and interaction plugins
        initialView="dayGridMonth" // Set the initial view to month grid
        events={events} // Pass the list of events to be displayed
        selectable={true} // Enable date selection
        selectMirror={true} // Mirror the selection to provide feedback
        dayMaxEvents={true} // Allow displaying multiple events in a day
        select={handleDateSelect} // Handle date selection
        eventClick={handleEventClick} // Handle event click
        editable={true} // Allow events to be editable
        headerToolbar={{
          left: 'prev,next today', // Navigation buttons for previous, next, and today
          center: 'title', // Center the calendar title
          right: 'dayGridMonth,dayGridWeek', // View buttons for month and week views
        }}
      />
    </div>
  );
};

export default EventCalendar;