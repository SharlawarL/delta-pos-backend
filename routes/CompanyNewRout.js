const express = require('express');
const router = express.Router();
const controller = require('../controllers/CompanyNewController')

// companynew
router.get('/get-company-new', controller.getAllMaster);
router.get('/get-company-new-by-id/:id', controller.getDataById);
router.post('/add-company-new', controller.addCompanyNew);
router.put('/update-company-new/:id', controller.updateCompanyNew);
router.delete('/delete-company-new/:id', controller.deleteCompanyNew);

module.exports = router;