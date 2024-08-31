// MapComponent.js
import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const MapComponent = ({ events }) => {
  const mapStyles = { height: "400px", width: "100%" };
  const defaultCenter = { lat: 37.7749, lng: -122.4194 }; // Default center, adjust as needed

  return (
    <LoadScript googleMapsApiKey={process.env.MAP_KEY}>
      <GoogleMap
        mapContainerStyle={mapStyles}
        zoom={10}
        center={defaultCenter}
      >
        {events.map(event => (
          <Marker
            key={event.id}
            position={{
              lat: event.latitude,
              lng: event.longitude
            }}
            title={event.title}
          />
        ))}
      </GoogleMap>
    </LoadScript>
  );
};

export default MapComponent;