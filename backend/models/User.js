const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true },
    phone: { type: String, trim: true },
    role: { type: String, enum: ['patient', 'doctor', 'admin'], default: 'patient' },
    age: { type: Number },
    gender: { type: String, enum: ['male', 'female', 'other'] },
    bloodGroup: { type: String },
    address: { type: String },
    medicalHistory: [{ type: String }],
    profileImage: { type: String },
    isActive: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
