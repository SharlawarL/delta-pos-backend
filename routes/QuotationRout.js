const express = require('express');
const router = express.Router();
const qm = require('../controllers/QuotationController')

const multer = require('multer');

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: './uploads',   
 // Directory to store uploaded files
    filename: (req, file, cb) => {

        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);

        let filename = `quote_-${uniqueSuffix}.${file.originalname.split('.').pop()}`

        req.body.filename = filename

        cb(null, filename); // Use original filename
    }
});
const upload = multer({ storage: storage });

// Vehicle
router.get('/get-quotation', qm.getQuotationMaster);
router.get('/get-quotation-by-id/:id', qm.getQuotationById);
router.get('/get-quotation-by-cust', qm.getQuotationByCustMaster);
router.get('/get-quotation-by-customers-status', qm.getQuotationByCustStatusMaster);

router.post('/add-quotation', qm.addQuotationMaster);
router.put('/update-quotation/:id', qm.updateQuotationMaster);

router.delete('/delete-quotation/:id', qm.deleteQuotationMaster);
router.put('/convert-quotation-to-job/:id', qm.convertQuotationToJob);
router.get('/sent-quotation-email/:id', qm.sentQuotationToEmail);


router.get('/get-quotationItem',qm.getQuotationItem);
router.get('/get-quotation-item-by-id/:id',qm.getQuotationItemById);
router.post('/add-quotationItem',qm.addQuotationItem);
router.put('/update-quotationItem/:id',qm.updateQuotationItem);
router.delete('/delete-quotationItem/:id',qm.deleteQuotationItem);

router.put('/assign-driver-to-job/:id',qm.assignDriverToJob);

router.get('/get-quotation-email-history-by-id/:id', qm.getQuotationEmailHistoryById);

router.get('/quotation-doc-list/:id', qm.quotationDocList);
router.post('/quotation-doc-add/:id', upload.single('file'),  qm.quotationDocAdd);
router.delete('/quotation-doc-delete/:id', qm.quotationDocDelete);

module.exports = router;