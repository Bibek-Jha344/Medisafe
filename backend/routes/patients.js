const express = require('express');
const router = express.Router();
const { getPatients, getPatientById } = require('../controllers/patientController');
const { protect } = require('../middleware/auth');

router.get('/', protect, getPatients);
router.get('/:id', protect, getPatientById);

module.exports = router;
