const express = require('express');
const router = express.Router();
const { analyzeSymptomRequest } = require('../controllers/symptomController');
const { protect } = require('../middleware/auth');

router.post('/analyze', protect, analyzeSymptomRequest);

module.exports = router;
