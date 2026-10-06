const { demoPrescriptions } = require('../config/demoData');
const path = require('path');
const fs = require('fs');

let Prescription;
try { Prescription = require('../models/Prescription'); } catch (e) { Prescription = null; }

const isMongoConnected = () => {
    try { const mongoose = require('mongoose'); return mongoose.connection.readyState === 1; } catch { return false; }
};

let inMemoryPrescriptions = [...demoPrescriptions];

// GET /api/prescriptions
const getPrescriptions = async (req, res) => {
    try {
        const userId = req.user.id;

        if (isMongoConnected() && Prescription) {
            const prescriptions = await Prescription.find({ patientId: userId }).sort({ date: -1 });
            return res.json({ success: true, count: prescriptions.length, prescriptions });
        } else {
            const prescriptions = inMemoryPrescriptions
                .filter(p => p.patientId === userId || p.patientId === 'user001')
                .sort((a, b) => new Date(b.date) - new Date(a.date));
            return res.json({ success: true, count: prescriptions.length, prescriptions });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error.' });
    }
};

// GET /api/prescriptions/:id
const getPrescriptionById = async (req, res) => {
    try {
        const { id } = req.params;

        if (isMongoConnected() && Prescription) {
            const prescription = await Prescription.findById(id);
            if (!prescription) return res.status(404).json({ success: false, message: 'Prescription not found.' });
            return res.json({ success: true, prescription });
        } else {
            const prescription = inMemoryPrescriptions.find(p => p._id === id);
            if (!prescription) return res.status(404).json({ success: false, message: 'Prescription not found.' });
            return res.json({ success: true, prescription });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error.' });
    }
};

// POST /api/prescriptions (upload)
const uploadPrescription = async (req, res) => {
    try {
        const { doctorName, diagnosis, instructions, followUp } = req.body;
        const userId = req.user.id;
        const fileName = req.file ? req.file.filename : null;
        const filePath = req.file ? req.file.path : null;

        const prescriptionData = {
            patientId: userId,
            doctorId: 'manual',
            doctorName: doctorName || 'Self-uploaded',
            date: new Date(),
            diagnosis: diagnosis || 'Not specified',
            medicines: [],
            instructions: instructions || '',
            followUp: followUp ? new Date(followUp) : null,
            fileName,
            filePath
        };

        if (isMongoConnected() && Prescription) {
            const prescription = await Prescription.create(prescriptionData);
            return res.status(201).json({ success: true, message: 'Prescription uploaded.', prescription });
        } else {
            const newPrescription = { _id: 'prx_' + Date.now(), ...prescriptionData, createdAt: new Date() };
            inMemoryPrescriptions.push(newPrescription);
            return res.status(201).json({ success: true, message: 'Prescription uploaded (demo mode).', prescription: newPrescription });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error.' });
    }
};

module.exports = { getPrescriptions, getPrescriptionById, uploadPrescription };
