const express = require('express');
const router = express.Router();
const controller = require('../controllers/CompanyMasterController')

// Get customer data
router.get('/get-company', controller.getCompanyMaster);
router.get('/get-company-by-id/:id', controller.getCompanyById);
router.post('/add-company', controller.addCompanyMaster);
router.put('/update-company/:id', controller.updateCompanyMaster);
router.delete('/delete-company/:id', controller.deleteCompanyMaster);
 
module.exports = router;