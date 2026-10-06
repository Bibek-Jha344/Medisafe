const { demoUsers } = require('../config/demoData');

const getUsers = async (req, res) => {
    try {
        const users = demoUsers.map(({ password, ...user }) => user);
        return res.json({ success: true, count: users.length, users });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Unable to fetch users.' });
    }
};

module.exports = { getUsers };
