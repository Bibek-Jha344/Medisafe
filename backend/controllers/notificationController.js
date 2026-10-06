const demoNotifications = [
    {
        _id: 'notif_001',
        userId: 'user001',
        title: 'Appointment reminder',
        message: 'Your appointment with Dr. Anjali Sharma is scheduled for tomorrow at 10:00 AM.',
        type: 'appointment',
        read: false,
        createdAt: new Date('2024-03-09T09:00:00Z')
    },
    {
        _id: 'notif_002',
        userId: 'user001',
        title: 'Exercise progress',
        message: 'Your knee flexion improved by 12% this week. Keep following the physiotherapy plan.',
        type: 'progress',
        read: false,
        createdAt: new Date('2024-03-08T08:30:00Z')
    },
    {
        _id: 'notif_003',
        userId: 'user001',
        title: 'Prescription updated',
        message: 'New instructions were added to your prescription from Dr. Priya Singh.',
        type: 'prescription',
        read: true,
        createdAt: new Date('2024-03-05T14:00:00Z')
    }
];

const getNotifications = async (req, res) => {
    try {
        const userId = req.user?.id || 'user001';
        const notifications = demoNotifications.filter(item => item.userId === userId || item.userId === 'user001');
        return res.json({ success: true, count: notifications.length, notifications });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Unable to fetch notifications.' });
    }
};

const markNotificationRead = async (req, res) => {
    try {
        const { id } = req.params;
        const item = demoNotifications.find(n => n._id === id);

        if (!item) {
            return res.status(404).json({ success: false, message: 'Notification not found.' });
        }

        item.read = true;
        return res.json({ success: true, message: 'Notification marked as read.', notification: item });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Unable to update notification.' });
    }
};

module.exports = { getNotifications, markNotificationRead };
