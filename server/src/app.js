const express = require('express');
const cors = require('cors');
const chatRoutes = require('./routes/chat');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/chat', chatRoutes);

app.get('/', (req, res) => res.send('ChatterMind API running!'));

module.exports = app;