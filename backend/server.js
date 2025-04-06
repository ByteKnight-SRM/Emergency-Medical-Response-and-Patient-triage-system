// server.js
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/auth');

require('dotenv').config();



const app = express();
const server = http.createServer(app);
const auth = require('./middleware/auth');
app.use('/api/auth', authRoutes);

const io = socketIo(server, {
  cors: {
    origin: '*', // Adjust for production
    methods: ['GET', 'POST'],
  },
});

app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

// Define Routes
const incidentRoutes = require('./routes/incidents');
const ambulanceRoutes = require('./routes/ambulances');

app.use('/api/incidents', incidentRoutes);
app.use('/api/ambulances', ambulanceRoutes);

// Real-Time Communication
io.on('connection', (socket) => {
  console.log('New client connected');

  socket.on('updateLocation', (data) => {
    // Broadcast updated location to all clients
    io.emit('locationUpdate', data);
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});
app.use('/api/incidents', auth(['admin', 'dispatcher', 'paramedic']), incidentRoutes);
app.use('/api/ambulances', auth(['admin', 'dispatcher']), ambulanceRoutes);
// Start Server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
