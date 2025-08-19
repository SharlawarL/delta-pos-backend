const express = require('express');
const router = express.Router();
const qm = require('../controllers/QuotationController')

// Convert Quotation
router.put('/convert-quotation-job/:id', qm.convertQuotationJob);
router.get('/get-quotation-by-id/:id', qm.getQuotationById);

module.exports = router;