const express = require('express');
const router = express.Router();
const { getExercises, getExerciseById } = require('../controllers/exerciseController');

router.get('/', getExercises);
router.get('/:id', getExerciseById);

module.exports = router;
