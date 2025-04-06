
// src/components/Map.js
import React, { useEffect, useState, useContext } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
//import axios from 'axios';
import axios from '../utils/axiosConfig';
import { SocketContext } from '../contexts/SocketContext';

const containerStyle = {
  width: '100%',
  height: '600px',
};

const center = {
  lat: 40.7128, // Default to New York City
  lng: -74.0060,
};

const Map = () => {
  const [ambulances, setAmbulances] = useState([]);
  const socket = useContext(SocketContext);

  useEffect(() => {
    // Fetch initial ambulance data
    axios.get('/api/ambulances')
      .then(response => setAmbulances(response.data))
      .catch(error => console.log(error));

    // Listen for real-time updates
    socket.on('locationUpdate', (data) => {
      setAmbulances(prevAmbulances => prevAmbulances.map(amb => 
        amb._id === data.id ? { ...amb, location: data.location, status: data.status } : amb
      ));
    });

    // Cleanup on unmount
    return () => socket.off('locationUpdate');
  }, [socket]);

  return (
    <LoadScript googleMapsApiKey="yOUR KEY>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={12}
      >
        {ambulances.map(ambulance => (
          <Marker
            key={ambulance._id}
            position={{
              lat: ambulance.location.latitude,
              lng: ambulance.location.longitude,
            }}
            label={ambulance.status}
          />
        ))}
      </GoogleMap>
    </LoadScript>
  );
};

export default React.memo(Map);
