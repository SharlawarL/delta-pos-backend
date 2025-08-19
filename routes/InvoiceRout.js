const express = require('express');
const router = express.Router();
const jm = require('../controllers/InvoiceController')

// Vehicle
router.get('/get-invoice', jm.getJobMaster);
router.get('/get-invoice-by-id/:id', jm.getJobById);
router.post('/add-invoice', jm.addJobMaster);
router.put('/update-invoice/:id', jm.updateJobMaster);
router.delete('/delete-invoice/:id', jm.deleteJobMaster);

router.get('/sent-job-email/:id', jm.sentJobToEmail);

router.get('/invoice-doc-list/:id', jm.jobDocList);
router.get('/invoice-payment-list/:id', jm.jobPaymentList);

module.exports = router;