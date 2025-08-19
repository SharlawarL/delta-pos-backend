const express = require('express');
const router = express.Router();
const vm = require('../controllers/VehicleMasterController')

// Vehicle
router.get('/get-vehicle', vm. getVehicleMaster);
router.get('/get-vehicle-by-id/:id', vm.getVehicleById);
router.post('/add-vehicle', vm.addVehicleMaster);
router.put('/update-vehicle/:id', vm.updateVehicleMaster);
router.delete('/delete-vehicle/:id', vm.deleteVehicleMaster);

module.exports = router;