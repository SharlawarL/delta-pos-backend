const express = require('express');
const router = express.Router();
const dc = require('../controllers/DriverController')

// Get customer data
router.post('/login', dc.driverLogin);

module.exports = router;