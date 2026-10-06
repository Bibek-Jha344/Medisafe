const jwt = require('jsonwebtoken');

// In-memory store for demo mode (when MongoDB not available)
const demoStore = require('../config/demoData');

const protect = (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
        return res.status(401).json({ success: false, message: 'Not authorized. No token provided.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'medisafe_jwt_secret_key_2024_bibek_jha');
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ success: false, message: 'Not authorized. Token invalid or expired.' });
    }
};

const adminOnly = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        next();
    } else {
        res.status(403).json({ success: false, message: 'Access denied. Admin only.' });
    }
};

module.exports = { protect, adminOnly };
