const express = require('express');
const router = express.Router();
const controller = require('../controllers/PaymodeController')

// Vehicle
router.get('/get-paymode', controller.getMaster);
router.get('/get-paymode-by-id/:id', controller.getById);
router.post('/add-paymode', controller.addMaster);
router.put('/update-paymode/:id', controller.updateMaster);
router.delete('/delete-paymode/:id', controller.deleteMaster);

module.exports = router;