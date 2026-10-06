const { analyzeSymptoms } = require('../services/recommendationEngine');
const { demoDoctors, demoExercises } = require('../config/demoData');

// POST /api/symptoms/analyze
const analyzeSymptomRequest = async (req, res) => {
    try {
        const { bodyPart, symptoms, painLevel, duration, mobilityDifficulty, additionalNotes } = req.body;

        if (!bodyPart) {
            return res.status(400).json({ success: false, message: 'Body part is required for symptom analysis.' });
        }

        // Run rule-based analysis
        const result = analyzeSymptoms({ bodyPart, symptoms, painLevel, duration, mobilityDifficulty, additionalNotes });

        // Attach full doctor objects for recommended doctors
        result.recommendedDoctors = result.recommendedDoctorIds.map(id => demoDoctors.find(d => d._id === id)).filter(Boolean);

        // Attach full exercise objects for recommended exercises
        result.recommendedExerciseDetails = result.recommendedExerciseIds.map(id => demoExercises.find(e => e._id === id)).filter(Boolean);

        res.json(result);
    } catch (error) {
        console.error('Symptom analysis error:', error);
        res.status(500).json({ success: false, message: 'Error analyzing symptoms.' });
    }
};

module.exports = { analyzeSymptomRequest };
