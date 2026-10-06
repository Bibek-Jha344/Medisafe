const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
    name: { type: String, required: true },
    specialty: { type: String, required: true },
    qualification: { type: String },
    experience: { type: Number },
    hospital: { type: String },
    location: { type: String },
    phone: { type: String },
    email: { type: String },
    rating: { type: Number, default: 4.5, min: 0, max: 5 },
    reviewCount: { type: Number, default: 0 },
    consultationFee: { type: Number },
    availableDays: [{ type: String }],
    availableSlots: [{ type: String }],
    bio: { type: String },
    image: { type: String },
    specializations: [{ type: String }],
    isActive: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Doctor', doctorSchema);
