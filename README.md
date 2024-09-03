# Spark Volunteering Hub

Spark is a responsive web application designed to facilitate and promote volunteerism within organizations. The platform allows employees to sign up for volunteering events, while administrators have the ability to manage these events through an admin dashboard. Spark leverages the Google Maps API for location services on event pages, ensuring that volunteers can easily find and participate in community activities.

## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Installation](#installation)
- [Usage](#usage)
- [API Integration](#api-integration)
- [Accessibility](#accessibility)
- [Responsiveness](#responsiveness)
- [Known Limitations](#known-limitations)
- [Future Enhancements](#future-enhancements)

## Project Overview

Spark is designed to streamline the process of organizing and participating in volunteering events. Employees can effortlessly find and sign up for opportunities to give back to their communities, while administrators manage the events through a secure and user-friendly interface. The platform is built using modern web technologies, including React for the frontend and Node.js for the backend, with PostgreSQL serving as the database. The application also integrates the Google Maps API to provide accurate location data for events.

## Features

- Employee Sign-Up: Allows users to browse and sign up for volunteering events.
- Admin Dashboard: Enables admins to add, edit, and delete volunteering events.
- Google Maps Integration: Displays event locations on a map for easy navigation.
- Secure Login: Includes authentication features for both users and admins.
- Responsive Design: Ensures a seamless experience across various devices.

## Technology Stack

- Frontend: React, HTML, CSS
- Backend: Node.js, Express.js
- Database: PostgreSQL
- API Integration: Google Maps API
- Environment Management: dotenv

## Installation

To set up the project locally, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/VYNCENTHARRIS/Capstone1.git
   cd Capstone1
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables: Access the `.env` file add your configuration settings, including your Google Maps API key and PostgreSQL connection details.
   ```bash
   GOOGLE_MAPS_API_KEY=your-api-key-here
   DATABASE_URL=your-database-url-here
   ```

## Usage

1. Starting the Application
   Start the React application:

   ```
   npm start
   ```

2. Start the server
   Navigate to the backend directory and then run it

   ```
   cd backend
   node server.js
   ```

3. Access the Application
   Open your browser and navigate to http://localhost:3000.

## API Integration

Spark integrates the Google Maps API to provide real-time location data for volunteering events. This API is crucial for helping users find event locations quickly and easily. To obtain a Google Maps API key, visit Google Cloud.

## Responsiveness

Spark is fully responsive, ensuring a seamless experience across mobile, tablet, and desktop devices. Bootstrap CSS is used to provide a modern and responsive design.

## Known Limitations

The admin dashboard currently lacks advanced filtering options for events.
Limited customization is available for the Google Maps display.
User authentication is basic and may require additional security enhancements.

## Future Enhancements

Enhanced Security: Improve the authentication system to include features like password recovery and multi-factor authentication.
Dynamic Notifications: Add real-time notifications for new events and updates to existing events.
User Profiles: Develop user profiles that track volunteering history and personal achievements.
