const { demoProgress } = require('../config/demoData');

let Progress;
try { Progress = require('../models/Progress'); } catch (e) { Progress = null; }

const isMongoConnected = () => {
    try { const mongoose = require('mongoose'); return mongoose.connection.readyState === 1; } catch { return false; }
};

let inMemoryProgress = [...demoProgress];

// GET /api/progress
const getProgress = async (req, res) => {
    try {
        const userId = req.user.id;

        if (isMongoConnected() && Progress) {
            const progress = await Progress.find({ patientId: userId }).sort({ date: 1 });
            return res.json({ success: true, count: progress.length, progress });
        } else {
            const progress = inMemoryProgress
                .filter(p => p.patientId === userId || p.patientId === 'user001')
                .sort((a, b) => new Date(a.date) - new Date(b.date));
            return res.json({ success: true, count: progress.length, progress });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error.' });
    }
};

// POST /api/progress
const addProgress = async (req, res) => {
    try {
        const { exercisesCompleted, totalExercises, painLevel, mobilityScore, recoveryScore, jointAngles, notes } = req.body;
        const userId = req.user.id;

        const progressData = {
            patientId: userId,
            date: new Date(),
            exercisesCompleted: exercisesCompleted || 0,
            totalExercises: totalExercises || 5,
            painLevel: painLevel || 5,
            mobilityScore: mobilityScore || 50,
            recoveryScore: recoveryScore || 50,
            jointAngles: jointAngles || {},
            notes: notes || ''
        };

        if (isMongoConnected() && Progress) {
            const progress = await Progress.create(progressData);
            return res.status(201).json({ success: true, message: 'Progress recorded.', progress });
        } else {
            const newProgress = { _id: 'prg_' + Date.now(), ...progressData, createdAt: new Date() };
            inMemoryProgress.push(newProgress);
            return res.status(201).json({ success: true, message: 'Progress recorded (demo mode).', progress: newProgress });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error.' });
    }
};

module.exports = { getProgress, addProgress };
