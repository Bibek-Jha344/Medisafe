/**
 * MEDISAFE - Local Healthcare and Physiotherapy Support Platform
 * Backend Server
 * Author: Bibek Jha
 * Technology: Node.js + Express.js + MongoDB
 */

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const connectDB = require('./config/db');

const app = express();

// Connect to MongoDB (graceful - will run in demo mode if not available)
connectDB();

// Middleware
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploaded files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Serve frontend static files
app.use(express.static(path.join(__dirname, '../frontend')));

// API Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', require('./routes/users'));
app.use('/api/patients', require('./routes/patients'));
app.use('/api/doctors', require('./routes/doctors'));
app.use('/api/physiotherapists', require('./routes/physiotherapists'));
app.use('/api/appointments', require('./routes/appointments'));
app.use('/api/symptoms', require('./routes/symptoms'));
app.use('/api/recommendations', require('./routes/recommendations'));
app.use('/api/prescriptions', require('./routes/prescriptions'));
app.use('/api/exercises', require('./routes/exercises'));
app.use('/api/progress', require('./routes/progress'));
app.use('/api/notifications', require('./routes/notifications'));
app.use('/api/admin', require('./routes/admin'));

// Health check
app.get('/api/health', (req, res) => {
    const mongoose = require('mongoose');
    res.json({
        success: true,
        message: 'MEDISAFE API is running',
        version: '1.0.0',
        dbStatus: mongoose.connection.readyState === 1 ? 'connected' : 'demo-mode',
        timestamp: new Date().toISOString()
    });
});

// Serve frontend for all non-API routes (SPA fallback)
app.get('*', (req, res) => {
    if (!req.path.startsWith('/api')) {
        res.sendFile(path.join(__dirname, '../frontend/index.html'));
    } else {
        res.status(404).json({ success: false, message: 'API endpoint not found.' });
    }
});

// Global error handler
app.use((err, req, res, next) => {
    console.error('Server error:', err.message);
    res.status(err.status || 500).json({
        success: false,
        message: err.message || 'Internal Server Error'
    });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`\n====================================`);
    console.log(`  MEDISAFE Server Running`);
    console.log(`  Port: ${PORT}`);
    console.log(`  URL: http://localhost:${PORT}`);
    console.log(`  API: http://localhost:${PORT}/api`);
    console.log(`====================================\n`);
});

module.exports = app;
