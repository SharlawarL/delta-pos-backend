const express = require('express');
const router = express.Router();
const controller = require('../controllers/CategoryController')


router.get('/get-category-list', controller.getMaster);
router.get('/get-category-by-id/:id', controller.getById);
router.post('/add-category', controller.addMaster);
router.put('/update-category/:id', controller.updateMaster);
router.delete('/delete-category/:id', controller.deleteMaster);

module.exports = router;