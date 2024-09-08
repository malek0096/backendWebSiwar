// backend/server.js

const express = require('express');
const app = express();
const connectDB = require('./config/db');
const clientRoutes = require('./route/clientRoute');

require('dotenv').config();
connectDB();

app.use(express.json()); // for parsing application/json

// Use routes
app.use('/api/client', clientRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
