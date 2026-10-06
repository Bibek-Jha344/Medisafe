const { demoDoctors, demoProgress } = require('../config/demoData');

const getPhysiotherapists = async (req, res) => {
    try {
        const physiotherapists = demoDoctors.filter(doc => /physio|physiotherapist/i.test(doc.specialty));
        return res.json({ success: true, count: physiotherapists.length, physiotherapists });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Unable to fetch physiotherapists.' });
    }
};

const getPhysiotherapistById = async (req, res) => {
    try {
        const { id } = req.params;
        const physiotherapist = demoDoctors.find(doc => doc._id === id && /physio|physiotherapist/i.test(doc.specialty));

        if (!physiotherapist) {
            return res.status(404).json({ success: false, message: 'Physiotherapist not found.' });
        }

        return res.json({ success: true, physiotherapist, recentProgress: demoProgress.slice(-2) });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Unable to fetch physiotherapist details.' });
    }
};

module.exports = { getPhysiotherapists, getPhysiotherapistById };
