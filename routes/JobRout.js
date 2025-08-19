const express = require('express');
const router = express.Router();
const jm = require('../controllers/JobController')

const multer = require('multer');

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: './uploads',   
 // Directory to store uploaded files
    filename: (req, file, cb) => {

        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);

        let filename = `payment_-${uniqueSuffix}.${file.originalname.split('.').pop()}`

        req.body.filename = filename

        cb(null, filename); // Use original filename
    }
});
const upload = multer({ storage: storage });

// Vehicle
router.get('/get-job', jm.getJobMaster);
router.get('/get-job-completed', jm.getJobCompletedMaster);
router.get('/get-job-pending', jm.getJobPendingMaster);
router.get('/get-job-todays', jm.getJobTodaysMaster);
router.get('/get-job-active', jm.getJobActiveMaster);

router.get('/get-job-by-id/:id', jm.getJobById);
router.post('/add-job', jm.addJobMaster);

router.put('/update-job/:id', jm.updateJobMaster);
router.put('/update-job-delivery/:id', jm.updateJobDeliver);

router.put('/update-job-status/:id', jm.convertJobToInvoice);


router.delete('/delete-job/:id', jm.deleteJobMaster);


router.put('/update-job-trip-status/:id', jm.updateJobTripMaster);

router.get('/sent-job-email/:id', jm.sentJobToEmail);

router.get('/job-payment-list/:id', jm.jobPaymentList);
router.post('/job-payment-add/:id', upload.single('file'),  jm.jobPaymentAdd);

router.get('/job-doc-list/:id', jm.jobDocList);
router.delete('/job-doc-delete/:id', jm.jobDocDelete);
router.post('/job-doc-add/:id', upload.single('file'),  jm.jobDocAdd);

router.put('/convert-job-to-invoice/:id', jm.convertJobToInvoice);

module.exports = router;