const mongoose = require('mongoose');

const exerciseSchema = new mongoose.Schema({
    name: { type: String, required: true },
    category: { type: String },
    targetArea: { type: String },
    difficulty: { type: String, enum: ['Beginner', 'Intermediate', 'Advanced'], default: 'Beginner' },
    duration: { type: String },
    repetitions: { type: String },
    instructions: [{ type: String }],
    benefits: { type: String },
    safetyGuidance: { type: String },
    image: { type: String },
    condition: [{ type: String }]
}, { timestamps: true });

module.exports = mongoose.model('Exercise', exerciseSchema);
