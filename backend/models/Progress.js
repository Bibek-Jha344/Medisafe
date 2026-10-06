const mongoose = require('mongoose');

const progressSchema = new mongoose.Schema({
    patientId: { type: String, required: true },
    date: { type: Date, default: Date.now },
    exercisesCompleted: { type: Number, default: 0 },
    totalExercises: { type: Number, default: 5 },
    painLevel: { type: Number, min: 0, max: 10 },
    mobilityScore: { type: Number, min: 0, max: 100 },
    recoveryScore: { type: Number, min: 0, max: 100 },
    jointAngles: {
        rightKnee: Number,
        leftKnee: Number,
        rightElbow: Number,
        leftElbow: Number
    },
    notes: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Progress', progressSchema);
