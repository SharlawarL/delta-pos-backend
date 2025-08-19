const express = require('express');
const router = express.Router();
const cc = require('../controllers/ClassificationMasterController')


// Get customer data
router.get('/get-ClassificationMaster', cc.getClassificationMaster);
router.post('/add-ClassificationMaster', cc.addClassificationMaster);
router.put('/update-ClassificationMaster/:id', cc.updateClassificationMaster);
router.delete('/delete-ClassificationMaster/:id', cc.deleteClassificationMaster);

module.exports = router;