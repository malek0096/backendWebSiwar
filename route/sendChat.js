const express = require('express');
const router = express.Router();
const {  sendChatMessage } = require('../controller/contact');


router.post('/sendChat', sendChatMessage);

module.exports = router;
