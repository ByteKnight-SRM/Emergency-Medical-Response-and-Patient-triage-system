// src/components/Dashboard.js
import React, { useEffect, useState } from 'react';
//import axios from 'axios';
import axios from '../utils/axiosConfig';

const Dashboard = () => {
  const [incidents, setIncidents] = useState([]);

  useEffect(() => {
    fetchIncidents();
    const interval = setInterval(fetchIncidents, 5000); // Refresh every 5 seconds
    return () => clearInterval(interval);
  }, []);

  const fetchIncidents = async () => {
    try {
      const response = await axios.get('/api/incidents');
      setIncidents(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h2>Incident Dashboard</h2>
      <table>
        <thead>
          <tr>
            <th>Type</th>
            <th>Location</th>
            <th>Severity</th>
            <th>Status</th>
            <th>Reported At</th>
          </tr>
        </thead>
        <tbody>
          {incidents.map(incident => (
            <tr key={incident._id}>
              <td>{incident.type}</td>
              <td>({incident.location.latitude}, {incident.location.longitude})</td>
              <td>{incident.severity}</td>
              <td>{incident.status}</td>
              <td>{new Date(incident.timestamp).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;
