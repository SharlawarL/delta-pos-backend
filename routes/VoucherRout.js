const express = require('express');
const router = express.Router();
const controller = require('../controllers/VoucherController')

// voucher
router.get('/get-voucher', controller.getMaster);
router.get('/get-voucher-by-id/:id', controller.getById);
router.post('/add-voucher', controller.addMaster);
router.put('/update-voucher/:id', controller.updateMaster);
router.delete('/delete-voucher/:id', controller.deleteMaster);

module.exports = router;