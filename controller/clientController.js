// backend/controllers/clientController.js

const Client = require('../model/clientModel')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Signup
exports.signup = async (req, res) => {
  try {
    const { nom, prenom, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 12);
    const newClient = new Client({ nom, prenom, email, password: hashedPassword });
    await newClient.save();
    res.status(201).json({ message: 'Client created successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Signout
exports.signout = (req, res) => {
  res.status(200).json({ message: 'Client signed out successfully' });
};

// Get Client Info
exports.getClientInfo = async (req, res) => {
  try {
    const client = await Client.findById(req.clientId);
    res.status(200).json(client);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Edit Client Info
exports.editClientInfo = async (req, res) => {
  try {
    const { nom, prenom, email } = req.body;
    const client = await Client.findByIdAndUpdate(req.clientId, { nom, prenom, email }, { new: true });
    res.status(200).json(client);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Edit Password
exports.editPassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;
    const client = await Client.findById(req.clientId);
    const isMatch = await bcrypt.compare(oldPassword, client.password);
    if (!isMatch) return res.status(400).json({ message: 'Old password is incorrect' });
    
    const hashedNewPassword = await bcrypt.hash(newPassword, 12);
    client.password = hashedNewPassword;
    await client.save();
    res.status(200).json({ message: 'Password updated successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
