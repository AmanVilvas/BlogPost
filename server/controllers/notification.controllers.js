const Notification = require('../models/notification-model')

// Fetch notifications for the registered user
exports.getNotifications = async (req, res) => {
    try {
        const userId = req.user._id

        // Find all notifications pointing to the logged-in user
        // Populating the sender and the related post
        const notifications = await Notification.find({ receiver: userId })
            .sort({ createdAt: -1 }) // newest first
            .populate('sender', 'userName profilePic')
            .populate('post', 'text media')

        return res.status(200).json({ notifications })
    } catch (err) {
        return res.status(500).json({ msg: "Error fetching notifications", err: err.message })
    }
}

exports.markAsRead = async (req, res) => {
    try {
        const userId = req.user._id

        // Marks all notifications for this user as read
        await Notification.updateMany(
            { receiver: userId, read: false },
            { $set: { read: true } }
        )

        return res.status(200).json({ msg: "Marked all as read" })
    } catch (err) {
        return res.status(500).json({ msg: "Error marking notifications read", err: err.message })
    }
}
