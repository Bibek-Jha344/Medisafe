const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { getPrescriptions, getPrescriptionById, uploadPrescription } = require('../controllers/prescriptionController');
const { protect } = require('../middleware/auth');

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadDir = path.join(__dirname, '../uploads');
        require('fs').mkdirSync(uploadDir, { recursive: true });
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        cb(null, `prescription_${Date.now()}${path.extname(file.originalname)}`);
    }
});

const upload = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
    fileFilter: (req, file, cb) => {
        const allowed = ['.pdf', '.jpg', '.jpeg', '.png'];
        const ext = path.extname(file.originalname).toLowerCase();
        if (allowed.includes(ext)) cb(null, true);
        else cb(new Error('Only PDF and image files are allowed.'));
    }
});

router.get('/', protect, getPrescriptions);
router.get('/:id', protect, getPrescriptionById);
router.post('/', protect, upload.single('prescription'), uploadPrescription);

module.exports = router;
