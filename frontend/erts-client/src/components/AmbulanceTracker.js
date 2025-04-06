// src/components/AmbulanceTracker.js
import React, { useState, useContext } from 'react';
//import axios from 'axios';
import axios from '../utils/axiosConfig';
import { SocketContext } from '../contexts/SocketContext';

const AmbulanceTracker = () => {
  const [identifier, setIdentifier] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [status, setStatus] = useState('Available');
  const socket = useContext(SocketContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Update ambulance location in backend
      const response = await axios.put(`/api/ambulances/${identifier}`, {
        location: { latitude: parseFloat(latitude), longitude: parseFloat(longitude) },
        status,
      });

      // Emit real-time update
      socket.emit('updateLocation', {
        id: response.data._id,
        location: response.data.location,
        status: response.data.status,
      });

      alert('Ambulance location updated!');
    } catch (err) {
      console.error(err);
      alert('Error updating location.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Update Ambulance Location</h2>
      <input
        type="text"
        placeholder="Ambulance ID"
        value={identifier}
        onChange={(e) => setIdentifier(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Latitude"
        value={latitude}
        onChange={(e) => setLatitude(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Longitude"
        value={longitude}
        onChange={(e) => setLongitude(e.target.value)}
        required
      />
      <select value={status} onChange={(e) => setStatus(e.target.value)}>
        <option value="Available">Available</option>
        <option value="En Route">En Route</option>
        <option value="Busy">Busy</option>
      </select>
      <button type="submit">Update Location</button>
    </form>
  );
};

export default AmbulanceTracker;
