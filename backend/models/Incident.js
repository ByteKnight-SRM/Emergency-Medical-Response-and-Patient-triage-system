// models/Incident.js
const mongoose = require('mongoose');

const IncidentSchema = new mongoose.Schema({
  type: { type: String, required: true },
  location: {
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
  },
  severity: { type: String, required: true }, // e.g., Red, Yellow, Green, Black
  description: { type: String },
  timestamp: { type: Date, default: Date.now },
  status: { type: String, default: 'Pending' }, // e.g., Pending, In Progress, Resolved
});

module.exports = mongoose.model('Incident', IncidentSchema);
