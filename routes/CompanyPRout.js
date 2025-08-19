const express = require('express');
const router = express.Router();
const controller = require('../controllers/CompanyPController')

// Get customer data
router.get('/get-pcompany', controller.getCompanyMaster);
router.get('/get-pcompany-by-id/:id', controller.getCompanyById);
router.post('/add-pcompany', controller.addCompanyMaster);
router.put('/update-pcompany/:id', controller.updateCompanyMaster);
router.delete('/delete-pcompany/:id', controller.deleteCompanyMaster);
 
module.exports = router;