const express = require('express');
const router = express.Router();
const { getRecommendations, createRecommendation } = require('../controllers/recommendationController');
const { protect } = require('../middleware/auth');

router.get('/', protect, getRecommendations);
router.post('/', protect, createRecommendation);

module.exports = router;
