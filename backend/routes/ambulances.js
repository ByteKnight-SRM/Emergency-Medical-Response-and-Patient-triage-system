// routes/ambulances.js
const express = require('express');
const router = express.Router();
const Ambulance = require('../models/Ambulance');

// Register a new ambulance
router.post('/', async (req, res) => {
  try {
    const ambulance = new Ambulance(req.body);
    await ambulance.save();
    res.status(201).json(ambulance);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all ambulances
router.get('/', async (req, res) => {
  try {
    const ambulances = await Ambulance.find();
    res.json(ambulances);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update ambulance location and status
router.put('/:id', async (req, res) => {
  try {
    const ambulance = await Ambulance.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(ambulance);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
