const { demoExercises } = require('../config/demoData');

let Exercise;
try { Exercise = require('../models/Exercise'); } catch (e) { Exercise = null; }

const isMongoConnected = () => {
    try { const mongoose = require('mongoose'); return mongoose.connection.readyState === 1; } catch { return false; }
};

// GET /api/exercises
const getExercises = async (req, res) => {
    try {
        const { category, difficulty, condition } = req.query;

        if (isMongoConnected() && Exercise) {
            let query = {};
            if (category) query.category = new RegExp(category, 'i');
            if (difficulty) query.difficulty = difficulty;
            if (condition) query.condition = new RegExp(condition, 'i');
            const exercises = await Exercise.find(query);
            return res.json({ success: true, count: exercises.length, exercises });
        } else {
            let exercises = demoExercises;
            if (category) exercises = exercises.filter(e => e.category.toLowerCase().includes(category.toLowerCase()));
            if (difficulty) exercises = exercises.filter(e => e.difficulty === difficulty);
            if (condition) exercises = exercises.filter(e => e.condition.some(c => c.toLowerCase().includes(condition.toLowerCase())));
            return res.json({ success: true, count: exercises.length, exercises });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error.' });
    }
};

// GET /api/exercises/:id
const getExerciseById = async (req, res) => {
    try {
        const { id } = req.params;

        if (isMongoConnected() && Exercise) {
            const exercise = await Exercise.findById(id);
            if (!exercise) return res.status(404).json({ success: false, message: 'Exercise not found.' });
            return res.json({ success: true, exercise });
        } else {
            const exercise = demoExercises.find(e => e._id === id);
            if (!exercise) return res.status(404).json({ success: false, message: 'Exercise not found.' });
            return res.json({ success: true, exercise });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error.' });
    }
};

module.exports = { getExercises, getExerciseById };
