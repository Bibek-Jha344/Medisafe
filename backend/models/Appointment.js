const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
    patientId: { type: String, required: true },
    patientName: { type: String, required: true },
    doctorId: { type: String, required: true },
    doctorName: { type: String, required: true },
    specialty: { type: String },
    date: { type: Date, required: true },
    time: { type: String, required: true },
    status: { type: String, enum: ['pending', 'confirmed', 'completed', 'cancelled'], default: 'pending' },
    reason: { type: String },
    notes: { type: String },
    consultationFee: { type: Number }
}, { timestamps: true });

module.exports = mongoose.model('Appointment', appointmentSchema);
