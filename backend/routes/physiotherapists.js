const express = require('express');
const router = express.Router();
const { getPhysiotherapists, getPhysiotherapistById } = require('../controllers/physiotherapistController');
const { protect } = require('../middleware/auth');

router.get('/', protect, getPhysiotherapists);
router.get('/:id', protect, getPhysiotherapistById);

module.exports = router;
