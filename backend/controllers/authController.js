const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { demoUsers } = require('../config/demoData');

// In-memory user store for demo mode
let inMemoryUsers = [...demoUsers];

// Try to use MongoDB User model
let User;
try {
    User = require('../models/User');
} catch (e) {
    User = null;
}

const isMongoConnected = () => {
    try {
        const mongoose = require('mongoose');
        return mongoose.connection.readyState === 1;
    } catch { return false; }
};

const generateToken = (user) => {
    return jwt.sign(
        { id: user._id || user.id, email: user.email, role: user.role, name: user.name },
        process.env.JWT_SECRET || 'medisafe_jwt_secret_key_2024_bibek_jha',
        { expiresIn: process.env.JWT_EXPIRE || '7d' }
    );
};

// POST /api/auth/register
const register = async (req, res) => {
    try {
        const { name, email, password, phone, age, gender, bloodGroup, address } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ success: false, message: 'Name, email, and password are required.' });
        }

        if (password.length < 6) {
            return res.status(400).json({ success: false, message: 'Password must be at least 6 characters.' });
        }

        if (isMongoConnected() && User) {
            const existing = await User.findOne({ email });
            if (existing) return res.status(400).json({ success: false, message: 'Email already registered.' });

            const hashedPassword = await bcrypt.hash(password, 10);
            const user = await User.create({ name, email, password: hashedPassword, phone, age, gender, bloodGroup, address });

            const token = generateToken(user);
            return res.status(201).json({
                success: true,
                message: 'Registration successful.',
                token,
                user: { id: user._id, name: user.name, email: user.email, role: user.role }
            });
        } else {
            // Demo mode
            const existing = inMemoryUsers.find(u => u.email === email);
            if (existing) return res.status(400).json({ success: false, message: 'Email already registered.' });

            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = {
                _id: 'user_' + Date.now(),
                name, email, password: hashedPassword, phone, age, gender, bloodGroup, address,
                role: 'patient',
                createdAt: new Date()
            };
            inMemoryUsers.push(newUser);

            const token = generateToken(newUser);
            return res.status(201).json({
                success: true,
                message: 'Registration successful (demo mode).',
                token,
                user: { id: newUser._id, name: newUser.name, email: newUser.email, role: newUser.role }
            });
        }
    } catch (error) {
        console.error('Register error:', error);
        res.status(500).json({ success: false, message: 'Server error during registration.' });
    }
};

// POST /api/auth/login
const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ success: false, message: 'Email and password are required.' });
        }

        if (isMongoConnected() && User) {
            const user = await User.findOne({ email });
            if (!user) return res.status(401).json({ success: false, message: 'Invalid email or password.' });

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) return res.status(401).json({ success: false, message: 'Invalid email or password.' });

            const token = generateToken(user);
            return res.json({
                success: true,
                message: 'Login successful.',
                token,
                user: { id: user._id, name: user.name, email: user.email, role: user.role }
            });
        } else {
            // Demo mode
            const user = inMemoryUsers.find(u => u.email === email);
            if (!user) return res.status(401).json({ success: false, message: 'Invalid email or password.' });

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) return res.status(401).json({ success: false, message: 'Invalid email or password.' });

            const token = generateToken(user);
            return res.json({
                success: true,
                message: 'Login successful (demo mode).',
                token,
                user: { id: user._id, name: user.name, email: user.email, role: user.role }
            });
        }
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ success: false, message: 'Server error during login.' });
    }
};

// GET /api/auth/me
const getMe = async (req, res) => {
    try {
        const userId = req.user.id;

        if (isMongoConnected() && User) {
            const user = await User.findById(userId).select('-password');
            if (!user) return res.status(404).json({ success: false, message: 'User not found.' });
            return res.json({ success: true, user });
        } else {
            const user = inMemoryUsers.find(u => u._id === userId);
            if (!user) return res.status(404).json({ success: false, message: 'User not found.' });
            const { password: _, ...safeUser } = user;
            return res.json({ success: true, user: safeUser });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error.' });
    }
};

module.exports = { register, login, getMe };
