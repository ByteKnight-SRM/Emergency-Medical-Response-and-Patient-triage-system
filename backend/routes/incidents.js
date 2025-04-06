/*// routes/incidents.js
const express = require('express');
const router = express.Router();
const Incident = require('../models/Incident');

// Create a new incident
router.post('/', async (req, res) => {
  try {
    const incident = new Incident(req.body);
    await incident.save();
    res.status(201).json(incident);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all incidents
router.get('/', async (req, res) => {
  try {
    const incidents = await Incident.find();
    res.json(incidents);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update incident status
router.put('/:id', async (req, res) => {
  try {
    const incident = await Incident.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(incident);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;

const express = require('express');
const axios = require('axios'); // For making HTTP requests to the Python Triage Service
const router = express.Router();

// Dummy in-memory data (replace with database integration)
const incidents = [];

// Route to fetch all incidents
router.get('/', (req, res) => {
  res.status(200).json({
    message: 'List of incidents',
    data: incidents,
  });
});

// Route to add a new incident
router.post('/', async (req, res) => {
  try {
    const { description, location } = req.body;

    if (!description || !location) {
      return res.status(400).json({ error: 'Description and location are required' });
    }

    // Send data to the Triage Service for severity prediction
    const response = await axios.post('http://127.0.0.1:5001/predict', { description });

    const { severity, confidence } = response.data;

    // Create a new incident object
    const newIncident = {
      id: incidents.length + 1,
      description,
      location,
      severity,
      confidence,
      timestamp: new Date(),
    };

    // Add to the in-memory list (replace with database logic later)
    incidents.push(newIncident);

    res.status(201).json({
      message: 'Incident added successfully',
      data: newIncident,
    });
  } catch (error) {
    console.error('Error in Triage Service:', error.message);
    res.status(500).json({
      error: 'Failed to process incident',
    });
  }
});

// Route to get details of a single incident
router.get('/:id', (req, res) => {
  const incidentId = parseInt(req.params.id);
  const incident = incidents.find((i) => i.id === incidentId);

  if (!incident) {
    return res.status(404).json({ error: 'Incident not found' });
  }

  res.status(200).json({
    message: 'Incident details',
    data: incident,
  });
});

module.exports = router;
*/

const express = require('express');
const Incident = require('../models/Incident');
const router = express.Router();
const twilio = require('twilio');
const sgMail = require('@sendgrid/mail');

// Configure Twilio
const TWILIO_PHONE = process.env.TWILIO_PHONE_NUMBER; // Get from environment variables
const TWILIO_SID = process.env.TWILIO_SID;
const TWILIO_AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN;

const twilioClient = twilio(TWILIO_SID, TWILIO_AUTH_TOKEN);

// Configure SendGrid
sgMail.setApiKey(process.env.SENDGRID_API_KEY); // Set SendGrid API key from env

// Function to send SMS via Twilio
const sendSMS = async (message, to) => {
  try {
    await twilioClient.messages.create({
      body: message,
      from: TWILIO_PHONE,
      to: to,
    });
    console.log('SMS sent successfully');
  } catch (error) {
    console.error('Error sending SMS:', error);
  }
};

// Function to send email via SendGrid
const sendEmail = async (to, subject, text) => {
  const msg = {
    to: to,
    from: 'your-email@example.com', // Replace with your SendGrid verified sender email
    subject: subject,
    text: text,
  };
  
  try {
    await sgMail.send(msg);
    console.log('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

// Get all incidents
router.get('/', async (req, res) => {
  try {
    const incidents = await Incident.find();
    res.status(200).json(incidents);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch incidents' });
  }
});

// Add a new incident
router.post('/', async (req, res) => {
  const { description, location, phoneNumber, email } = req.body;

  // Validate incoming data
  if (!description || !location || !phoneNumber || !email) {
    return res.status(400).json({ error: 'Description, location, phoneNumber, and email are required' });
  }

  try {
    // Create a new incident
    const newIncident = new Incident({
      description,
      location,
      timestamp: new Date(),
    });
    
    // Save the incident to the database
    await newIncident.save();

    // Send SMS to the provided phone number via Twilio
    const smsMessage = `New incident reported: ${description} at ${location}.`;
    await sendSMS(smsMessage, phoneNumber);

    // Send email notification via SendGrid
    const emailSubject = `New Incident Reported: ${description}`;
    const emailText = `A new incident has been reported with the following details:\n\nDescription: ${description}\nLocation: ${location}`;
    await sendEmail(email, emailSubject, emailText);

    res.status(201).json(newIncident);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add incident and send notifications' });
  }
});

// Get incident by ID
router.get('/:id', async (req, res) => {
  try {
    const incident = await Incident.findById(req.params.id);
    if (!incident) return res.status(404).json({ error: 'Incident not found' });
    res.status(200).json(incident);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch incident' });
  }
});

module.exports = router;

