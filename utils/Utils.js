const multer = require('multer');

const storage = multer.diskStorage({
    destination: './uploads',
    filename: (req, file, cb) => {
        const { newFileName } = req.body;
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, `user_${newFileName}_-${uniqueSuffix}.${file.originalname.split('.').pop()}`);
    }
});

const upload = multer({ storage: storage });

module.exports = { upload };