const express = require('express');
const router = express.Router();
const { getAdminStats, getAllUsers, getAllAppointments } = require('../controllers/adminController');
const { protect, adminOnly } = require('../middleware/auth');

router.get('/stats', protect, adminOnly, getAdminStats);
router.get('/users', protect, adminOnly, getAllUsers);
router.get('/appointments', protect, adminOnly, getAllAppointments);

module.exports = router;
