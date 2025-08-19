const express = require('express');
const router = express.Router();
const cc = require('../controllers/CustomerMasterController')

// Get customer data
router.get('/get-customer', cc.getCustomerMaster);
router.get('/get-customer-by-id/:id', cc.getCustomerById);
router.post('/add-customer', cc.addCustomerMaster);
router.put('/update-customer/:id', cc.updateCustomerMaster);
router.delete('/delete-customer/:id', cc.deleteCustomerMaster);

module.exports = router;