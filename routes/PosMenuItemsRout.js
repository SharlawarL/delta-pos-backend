const express = require('express');
const router = express.Router();
const controller = require('../controllers/PosMenuItemsController')

const multer = require('multer');

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: './uploads',   
 // Directory to store uploaded files
    filename: (req, file, cb) => {

        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);

        let filename = `menu_items_-${uniqueSuffix}.${file.originalname.split('.').pop()}`

        req.body.filename = filename

        cb(null, filename); // Use original filename
    }
});
const upload = multer({ storage: storage });



router.get('/get-list', controller.getMaster);
router.get('/get-by-id/:id', controller.getById);
router.post('/add', upload.single('file'), controller.addMaster);
router.put('/update/:id', upload.single('file'), controller.updateMaster);
router.delete('/delete/:id', controller.deleteMaster);

module.exports = router;