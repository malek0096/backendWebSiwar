const Client = require('../model/clientModel'); // Import du modèle Client
const bcrypt = require('bcryptjs');
// Signup
exports.signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Validation des champs requis
    if (!username || !email || !password) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    // Vérifiez si l'email existe déjà
    const existingClient = await Client.findByEmail(email);
    if (existingClient) {
      return res.status(400).json({ message: 'Email already exists.' });
    }

    // Hash du mot de passe
    const hashedPassword = await bcrypt.hash(password, 12);

    // Création du client
    await Client.create({ username, email, password: hashedPassword });

    res.status(201).json({ message: 'Client created successfully.' });
  } catch (err) {
    console.error(err);
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
    const clientId = req.params.id; // ID client passé en paramètre
    const client = await Client.findById(clientId);

    if (!client) {
      return res.status(404).json({ message: 'Client not found' });
    }

    res.status(200).json(client);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

// Edit Client Info
exports.editClientInfo = async (req, res) => {
  try {
    const clientId = req.params.id;
    const {username, email } = req.body;

    // Mise à jour des informations
    const updatedClient = await Client.update(clientId, {username, email });

    if (!updatedClient) {
      return res.status(404).json({ message: 'Client not found' });
    }

    res.status(200).json({ message: 'Client updated successfully', client: updatedClient });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

// Edit Password
exports.editPassword = async (req, res) => {
  try {
    const clientId = req.params.id;
    const { oldPassword, newPassword } = req.body;

    // Récupérer le client
    const client = await Client.findById(clientId);
    if (!client) {
      return res.status(404).json({ message: 'Client not found' });
    }

    // Vérifier l'ancien mot de passe
    const isMatch = await bcrypt.compare(oldPassword, client.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Old password is incorrect' });
    }

    // Hash du nouveau mot de passe
    const hashedNewPassword = await bcrypt.hash(newPassword, 12);

    // Mise à jour du mot de passe
    await Client.updatePassword(clientId, hashedNewPassword);

    res.status(200).json({ message: 'Password updated successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};
