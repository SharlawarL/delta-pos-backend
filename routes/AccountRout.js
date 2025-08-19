const express = require('express');
const router = express.Router();
const controller = require('../controllers/AccountController')

// Vehicle
router.get('/get-account', controller.getMaster);
router.get('/get-account-by-id/:id', controller.getById);
router.post('/add-account', controller.addMaster);
router.put('/update-account/:id', controller.updateMaster);
router.delete('/delete-account/:id', controller.deleteMaster);

module.exports = router;