// src/components/IncidentForm.js
import React, { useState } from 'react';
//import axios from 'axios';
import axios from '../utils/axiosConfig';

const IncidentForm = () => {
  const [type, setType] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [age, setAge] = useState('');
  const [heartRate, setHeartRate] = useState('');
  const [bloodPressure, setBloodPressure] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/incidents', {
        type,
        location: { latitude: parseFloat(latitude), longitude: parseFloat(longitude) },
        age: parseInt(age),
        heart_rate: parseInt(heartRate),
        blood_pressure: parseInt(bloodPressure),
        description,
      });
      alert('Incident reported successfully!');
    } catch (err) {
      console.error(err);
      alert('Error reporting incident.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Report an Incident</h2>
      <input
        type="text"
        placeholder="Incident Type"
        value={type}
        onChange={(e) => setType(e.target.value)}
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
      <input
        type="number"
        placeholder="Age"
        value={age}
        onChange={(e) => setAge(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Heart Rate"
        value={heartRate}
        onChange={(e) => setHeartRate(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Blood Pressure"
        value={bloodPressure}
        onChange={(e) => setBloodPressure(e.target.value)}
        required
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button type="submit">Report Incident</button>
    </form>
  );
};

export default IncidentForm;
