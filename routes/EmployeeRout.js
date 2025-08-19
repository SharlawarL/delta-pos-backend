const express = require('express');
const router = express.Router();
const ec = require('../controllers/EmployeeController')
const ac = require('../controllers/AuthController')
const multer = require('multer');

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: './uploads',   
 // Directory to store uploaded files
    filename: (req, file, cb) => {

        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);

        let filename = `user_-${uniqueSuffix}.${file.originalname.split('.').pop()}`

        req.body.filename = filename

        cb(null, filename); // Use original filename
    }
});
const upload = multer({ storage: storage });


// Get customer data
router.get('/get-employee', ec.getAllEmployees);
router.get('/get-employee-by-id/:id', ec.getEmployeesById);
router.post('/add-employee', upload.single('file') , ac.empRegister);
router.put('/update-password/:id', ec.passwordChange);
router.put('/update-employee/:id', upload.single('file'), ec.updateEmployee);
router.delete('/delete-employee/:id', ec.deleteEmployee);

router.get('/get-all-menu', ec.getAllMenu);

router.put('/user-menu-update/:id', ec.userMenuUpdate);

module.exports = router;
