const express = require('express');
const router = express.Router();
const dc = require('../controllers/ReportController')

router.get('/get-quotation-report', dc.getQuotationReport);
router.get('/get-job-report', dc.getJobReport);
router.get('/get-invoice-report', dc.getInvoiceReport);
router.get('/get-quotation-status-report', dc.getQuotationStatusReport);

router.get('/get-driver-trip-end-status-report', dc.getDriverTripEndReport);
router.get('/get-numbers-driver-job-report', dc.getNumbersDriverjobReport);
router.get('/get-job-status-report', dc.getJobStatusReport);
router.get('/get-numbers-of-job-done-by-employee-report', dc.getnumberofjobdonebyemployeereport);

router.get('/get-quotation-payment-report', dc.getQuotationPaymentReport);

module.exports = router;
