// backend/routes/clientRoutes.js

const express = require('express');
const router = express.Router();
const clientController = require('../controller/clientController');

router.post('/signup', clientController.signup);
router.post('/signout', clientController.signout);
router.get('/info', clientController.getClientInfo);
router.put('/edit', clientController.editClientInfo);
router.put('/password', clientController.editPassword);

module.exports = router;
