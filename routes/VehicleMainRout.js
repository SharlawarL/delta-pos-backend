const express = require('express');
const router = express.Router();
const controller = require('../controllers/VehicleMainController')

// Vehicle
router.get('/get-vehicle', controller.getMaster);
router.get('/get-vehicle-by-id/:id', controller.getById);
router.post('/add-vehicle', controller.addMaster);
router.put('/update-vehicle/:id', controller.updateMaster);
router.delete('/delete-vehicle/:id', controller.deleteMaster);

module.exports = router;