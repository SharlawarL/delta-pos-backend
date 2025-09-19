const express = require('express');
const router = express.Router();
const ec = require('../controllers/SupplierController')
const ac = require('../controllers/AuthController')
const multer = require('multer');

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: './uploads',   
 // Directory to store uploaded files
    filename: (req, file, cb) => {

        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);

        let filename = `supplier_-${uniqueSuffix}.${file.originalname.split('.').pop()}`

        req.body.filename = filename

        cb(null, filename); // Use original filename
    }
});
const upload = multer({ storage: storage });


// Get customer data
router.get('/get', ec.getMaster);
router.get('/get-by-id/:id', ec.getById);
router.post('/add', upload.single('file') , ec.addMaster);
router.put('/update/:id', upload.single('file'), ec.updateMaster);
router.delete('/delete/:id', ec.deleteMaster);

module.exports = router;
