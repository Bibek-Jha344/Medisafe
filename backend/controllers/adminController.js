const { demoUsers, demoDoctors, demoAppointments, demoPrescriptions, demoExercises, demoProgress } = require('../config/demoData');

// GET /api/admin/stats
const getAdminStats = async (req, res) => {
    try {
        res.json({
            success: true,
            stats: {
                totalPatients: demoUsers.filter(u => u.role === 'patient').length,
                totalDoctors: demoDoctors.length,
                totalAppointments: demoAppointments.length,
                totalPrescriptions: demoPrescriptions.length,
                totalExercises: demoExercises.length,
                activeUsers: demoUsers.length,
                pendingAppointments: demoAppointments.filter(a => a.status === 'pending').length,
                completedAppointments: demoAppointments.filter(a => a.status === 'completed').length
            }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error.' });
    }
};

// GET /api/admin/users
const getAllUsers = async (req, res) => {
    try {
        const safeUsers = demoUsers.map(({ password: _, ...u }) => u);
        res.json({ success: true, count: safeUsers.length, users: safeUsers });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error.' });
    }
};

// GET /api/admin/appointments
const getAllAppointments = async (req, res) => {
    try {
        res.json({ success: true, count: demoAppointments.length, appointments: demoAppointments });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error.' });
    }
};

module.exports = { getAdminStats, getAllUsers, getAllAppointments };
