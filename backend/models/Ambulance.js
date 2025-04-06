// models/Ambulance.js
const mongoose = require('mongoose');

const AmbulanceSchema = new mongoose.Schema({
  identifier: { type: String, required: true, unique: true },
  driverName: { type: String, required: true },
  contact: { type: String, required: true },
  location: {
    latitude: { type: Number, default: 0 },
    longitude: { type: Number, default: 0 },
  },
  status: { type: String, default: 'Available' }, // e.g., Available, En Route, Busy
});

module.exports = mongoose.model('Ambulance', AmbulanceSchema);
