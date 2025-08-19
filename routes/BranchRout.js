const express = require('express');
const router = express.Router();
const controller = require('../controllers/BranchController')

// Get customer data
router.get('/get-branch', controller.getMaster);
router.get('/get-branch-by-id/:id', controller.getById);
router.post('/add-branch', controller.addMaster);
router.put('/update-branch/:id', controller.updateMaster);
router.delete('/delete-branch/:id', controller.deleteMaster);
 
module.exports = router;