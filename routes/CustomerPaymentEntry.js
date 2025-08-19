const express = require('express');
const router = express.Router();
const controller = require('../controllers/CustomerPaymentController')

router.get('/get-customer-payment', controller.getMaster);
router.get('/get-customer-payment-by-id/:id', controller.getById);
router.post('/add-customer-payment', controller.addMaster);
router.put('/update-customer-payment/:id', controller.updateMaster);
router.delete('/delete-customer-payment/:id', controller.deleteMaster);

module.exports = router;