const express = require('express');
const router = express.Router();
const clientController = require('../controller/clientController'); // Correction du chemin si nécessaire

// Route pour créer un nouveau client (signup)
router.post('/signup', clientController.signup);

// Route pour déconnexion (signout)
router.post('/signout', clientController.signout);

// Route pour récupérer les informations d'un client (GET /info/:id)
router.get('/info/:id', clientController.getClientInfo);

// Route pour mettre à jour les informations d'un client (PUT /edit/:id)
router.put('/edit/:id', clientController.editClientInfo);

// Route pour mettre à jour le mot de passe d'un client (PUT /password/:id)
router.put('/password/:id', clientController.editPassword);

module.exports = router;
