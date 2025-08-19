const express = require('express');
const router = express.Router();
const ec = require('../controllers/emailController')

// Get customer data
router.get('/sent-mail/:id', ec.sentMail);

module.exports = router;