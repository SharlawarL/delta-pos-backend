const express = require('express');
const router = express.Router();
const dc = require('../controllers/DriverController')

// Get customer data
router.get('/get-driver', dc.getDriverMaster);
router.get('/get-driver-by-id/:id', dc.getDriverById);
router.post('/add-driver', dc.addDriverMaster);
router.put('/update-driver/:id', dc.updateDriverMaster);
router.delete('/delete-driver/:id', dc.deleteDriverMaster);
router.get('/get-pending-driver', dc.getPendingJobs);
router.get('/get-jobs-by-driver/:id', dc.getJobsByDriverId);
router.put('/assign-jobs-to-driver', dc.assignJobToDriver);

router.get('/get-driver-pending-by-id/:id', dc.getDriverPendingById);
router.get('/get-driver-assigned-by-id/:id', dc.getDriverAssignedById);
router.get('/get-driver-assigned-by-id-completed/:id', dc.getDriverAssignedByIdComp);
    
module.exports = router;