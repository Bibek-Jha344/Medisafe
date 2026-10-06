const { demoDoctors } = require('../config/demoData');

let Doctor;
try { Doctor = require('../models/Doctor'); } catch (e) { Doctor = null; }

const isMongoConnected = () => {
    try { const mongoose = require('mongoose'); return mongoose.connection.readyState === 1; } catch { return false; }
};

// GET /api/doctors
const getDoctors = async (req, res) => {
    try {
        const { specialty, location } = req.query;

        if (isMongoConnected() && Doctor) {
            let query = { isActive: true };
            if (specialty) query.specialty = new RegExp(specialty, 'i');
            if (location) query.location = new RegExp(location, 'i');
            const doctors = await Doctor.find(query);
            return res.json({ success: true, count: doctors.length, doctors });
        } else {
            let doctors = demoDoctors;
            if (specialty) doctors = doctors.filter(d => d.specialty.toLowerCase().includes(specialty.toLowerCase()));
            if (location) doctors = doctors.filter(d => d.location.toLowerCase().includes(location.toLowerCase()));
            return res.json({ success: true, count: doctors.length, doctors });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error fetching doctors.' });
    }
};

// GET /api/doctors/:id
const getDoctorById = async (req, res) => {
    try {
        const { id } = req.params;

        if (isMongoConnected() && Doctor) {
            const doctor = await Doctor.findById(id);
            if (!doctor) return res.status(404).json({ success: false, message: 'Doctor not found.' });
            return res.json({ success: true, doctor });
        } else {
            const doctor = demoDoctors.find(d => d._id === id);
            if (!doctor) return res.status(404).json({ success: false, message: 'Doctor not found.' });
            return res.json({ success: true, doctor });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error.' });
    }
};

module.exports = { getDoctors, getDoctorById };
