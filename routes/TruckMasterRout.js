const express = require('express');
const router = express.Router();
const con = require('../controllers/TruckMasterController')

// voucher
router.get('/get-truck-master', con.getTruckMaster);
router.get('/get-truck-master-by-id/:id', con.getById);
router.post('/add-truck-master', con.addTruckMaster);
router.put('/update-truck-master/:id', con.updateTruckMaster);
router.delete('/delete-truck-master/:id', con.deleteTruckMaster);

module.exports = router;