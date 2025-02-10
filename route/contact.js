const express = require('express');
const router = express.Router();
const { contactUs , sendContactMessage } = require('../controller/contact');

router.post('/contact', contactUs);
router.post('/sendMessage', sendContactMessage)


module.exports = router;
