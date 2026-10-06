const express = require('express');
const router = express.Router();
const { getAppointments, createAppointment, cancelAppointment } = require('../controllers/appointmentController');
const { protect } = require('../middleware/auth');

router.get('/', protect, getAppointments);
router.post('/', protect, createAppointment);
router.put('/:id/cancel', protect, cancelAppointment);

module.exports = router;
