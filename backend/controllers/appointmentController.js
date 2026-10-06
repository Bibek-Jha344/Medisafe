const { demoAppointments, demoDoctors } = require('../config/demoData');

let Appointment;
try { Appointment = require('../models/Appointment'); } catch (e) { Appointment = null; }

const isMongoConnected = () => {
    try { const mongoose = require('mongoose'); return mongoose.connection.readyState === 1; } catch { return false; }
};

let inMemoryAppointments = [...demoAppointments];

// GET /api/appointments
const getAppointments = async (req, res) => {
    try {
        const userId = req.user.id;
        const userRole = req.user.role;

        if (isMongoConnected() && Appointment) {
            let query = userRole === 'admin' ? {} : { patientId: userId };
            const appointments = await Appointment.find(query).sort({ date: -1 });
            return res.json({ success: true, count: appointments.length, appointments });
        } else {
            let appointments = userRole === 'admin'
                ? inMemoryAppointments
                : inMemoryAppointments.filter(a => a.patientId === userId || a.patientId === 'user001');
            appointments = appointments.sort((a, b) => new Date(b.date) - new Date(a.date));
            return res.json({ success: true, count: appointments.length, appointments });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error.' });
    }
};

// POST /api/appointments
const createAppointment = async (req, res) => {
    try {
        const { doctorId, date, time, reason } = req.body;
        const userId = req.user.id;
        const userName = req.user.name;

        if (!doctorId || !date || !time) {
            return res.status(400).json({ success: false, message: 'Doctor, date, and time are required.' });
        }

        // Validate date is in future
        const appointmentDate = new Date(date);
        if (appointmentDate < new Date()) {
            return res.status(400).json({ success: false, message: 'Appointment date must be in the future.' });
        }

        // Get doctor info
        const doctor = demoDoctors.find(d => d._id === doctorId);
        const doctorName = doctor ? doctor.name : 'Unknown Doctor';
        const specialty = doctor ? doctor.specialty : '';
        const consultationFee = doctor ? doctor.consultationFee : 0;

        if (isMongoConnected() && Appointment) {
            const appointment = await Appointment.create({
                patientId: userId,
                patientName: userName,
                doctorId,
                doctorName,
                specialty,
                date: appointmentDate,
                time,
                reason: reason || '',
                status: 'pending',
                consultationFee
            });
            return res.status(201).json({ success: true, message: 'Appointment booked successfully.', appointment });
        } else {
            const newAppointment = {
                _id: 'apt_' + Date.now(),
                patientId: userId,
                patientName: userName,
                doctorId,
                doctorName,
                specialty,
                date: appointmentDate,
                time,
                reason: reason || '',
                status: 'pending',
                consultationFee,
                createdAt: new Date()
            };
            inMemoryAppointments.push(newAppointment);
            return res.status(201).json({ success: true, message: 'Appointment booked successfully (demo mode).', appointment: newAppointment });
        }
    } catch (error) {
        console.error('Create appointment error:', error);
        res.status(500).json({ success: false, message: 'Server error.' });
    }
};

// PUT /api/appointments/:id/cancel
const cancelAppointment = async (req, res) => {
    try {
        const { id } = req.params;

        if (isMongoConnected() && Appointment) {
            const appointment = await Appointment.findByIdAndUpdate(id, { status: 'cancelled' }, { new: true });
            if (!appointment) return res.status(404).json({ success: false, message: 'Appointment not found.' });
            return res.json({ success: true, message: 'Appointment cancelled.', appointment });
        } else {
            const idx = inMemoryAppointments.findIndex(a => a._id === id);
            if (idx === -1) return res.status(404).json({ success: false, message: 'Appointment not found.' });
            inMemoryAppointments[idx].status = 'cancelled';
            return res.json({ success: true, message: 'Appointment cancelled.', appointment: inMemoryAppointments[idx] });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error.' });
    }
};

module.exports = { getAppointments, createAppointment, cancelAppointment };
