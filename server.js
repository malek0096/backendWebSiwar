// backend/server.js

const express = require('express');
const app = express();
const db = require('./config/db'); // Connexion MySQL
const clientRoutes = require('./route/clientRoute');
const contact = require('./route/contact');
const chat = require('./route/sendChat');
require('dotenv').config();
const cors = require('cors');
app.use(cors());
app.use(express.json()); // for parsing application/json

// Use routes
app.use('/api/client', clientRoutes);
app.use('/api/contact', contact);
app.use('/api/chat', chat);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
