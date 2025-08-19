const express = require('express');
const router = express.Router();
const qnt = require('../controllers/TruckQntController')

// voucher
router.get('/get-truck-qnt', qnt.getTruckQnt);
router.get('/get-truck-qnt-by-id/:id', qnt.getById);
router.post('/add-truck-qnt', qnt.addTruckQnt);
router.put('/update-truck-qnt/:id', qnt.updateTruckQnt);
router.delete('/delete-truck-qnt/:id', qnt.deleteTruckQnt);

module.exports = router;