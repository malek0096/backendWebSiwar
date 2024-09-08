// backend/models/client.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const clientSchema = new Schema({
  nom: { type: String, required: true },
  prenom: { type: String, required: true },
  email: {
    type: String,
    required: true,
    unique: true,
    set: (value) => {
      // Convert to lowercase and remove spaces
      return value.toLowerCase().replace(/\s+/g, '');
    }
  },
  password: { type: String, required: true },
});

module.exports = mongoose.model('Client', clientSchema);
