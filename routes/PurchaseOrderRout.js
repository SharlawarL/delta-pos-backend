const express = require('express');
const router = express.Router();
const controller = require('../controllers/PurchaseOrderController')


router.get('/get-list', controller.getMaster);
router.get('/get-by-id/:id', controller.getById);
router.post('/add', controller.addMaster);
router.put('/update/:id', controller.updateMaster);
router.delete('/delete/:id', controller.deleteMaster);

module.exports = router;