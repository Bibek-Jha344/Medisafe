const { demoUsers, demoProgress, demoAppointments, demoPrescriptions } = require('../config/demoData');

const getPatients = async (req, res) => {
    try {
        const patients = demoUsers
            .filter(user => user.role === 'patient')
            .map(({ password, ...user }) => user);

        return res.json({ success: true, count: patients.length, patients });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Unable to fetch patient data.' });
    }
};

const getPatientById = async (req, res) => {
    try {
        const { id } = req.params;
        const patient = demoUsers.find(user => user._id === id && user.role === 'patient');

        if (!patient) {
            return res.status(404).json({ success: false, message: 'Patient not found.' });
        }

        const safePatient = (({ password, ...rest }) => rest)(patient);
        const progress = demoProgress.filter(item => item.patientId === id);
        const appointments = demoAppointments.filter(item => item.patientId === id);
        const prescriptions = demoPrescriptions.filter(item => item.patientId === id);

        return res.json({
            success: true,
            patient: safePatient,
            progress,
            appointments,
            prescriptions,
            recoveryScore: progress.length ? Math.round(progress[progress.length - 1].recoveryScore) : 0
        });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Unable to fetch patient details.' });
    }
};

module.exports = { getPatients, getPatientById };
