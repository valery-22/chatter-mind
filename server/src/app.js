const express = require('express');
const cors = require('cors');
const path = require('path');
const chatRoutes = require('./routes/chat');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Health check route
app.get('/', (req, res) => {
  res.send('✅ ChatterMind API is running');
});

// API routes
app.use('/api/chat', chatRoutes);

// Serve frontend only in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../../client/build')));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../../client/build', 'index.html'));
  });
}

module.exports = app;

