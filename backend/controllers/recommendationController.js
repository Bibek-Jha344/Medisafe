const { analyzeSymptoms } = require('../services/recommendationEngine');
const { demoDoctors, demoExercises, demoRecommendations } = require('../config/demoData');

const getRecommendations = async (req, res) => {
    try {
        const list = demoRecommendations.map((item) => ({
            ...item,
            recommendedDoctors: (item.recommendedDoctors || []).map(id => demoDoctors.find(d => d._id === id)).filter(Boolean),
            recommendedExerciseDetails: (item.exercises || []).map(id => demoExercises.find(e => e._id === id)).filter(Boolean)
        }));

        return res.json({ success: true, count: list.length, recommendations: list });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Unable to fetch recommendations.' });
    }
};

const createRecommendation = async (req, res) => {
    try {
        const { bodyPart, symptoms, painLevel, duration, mobilityDifficulty, additionalNotes } = req.body;

        if (!bodyPart) {
            return res.status(400).json({ success: false, message: 'Body part is required for recommendation analysis.' });
        }

        const result = analyzeSymptoms({ bodyPart, symptoms, painLevel, duration, mobilityDifficulty, additionalNotes });
        result.recommendedDoctors = result.recommendedDoctorIds.map(id => demoDoctors.find(d => d._id === id)).filter(Boolean);
        result.recommendedExerciseDetails = result.recommendedExerciseIds.map(id => demoExercises.find(e => e._id === id)).filter(Boolean);

        return res.json({ success: true, recommendation: result });
    } catch (error) {
        console.error('Recommendation error:', error);
        res.status(500).json({ success: false, message: 'Error creating recommendation.' });
    }
};

module.exports = { getRecommendations, createRecommendation };
