const mongoose = require('mongoose');

const medicineSchema = new mongoose.Schema({
    name: String,
    dosage: String,
    frequency: String,
    duration: String
});

const prescriptionSchema = new mongoose.Schema({
    patientId: { type: String, required: true },
    doctorId: { type: String, required: true },
    doctorName: { type: String },
    date: { type: Date, default: Date.now },
    diagnosis: { type: String },
    medicines: [medicineSchema],
    instructions: { type: String },
    followUp: { type: Date },
    fileName: { type: String },
    filePath: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Prescription', prescriptionSchema);
