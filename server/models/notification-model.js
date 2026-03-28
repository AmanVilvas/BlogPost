const mongoose = require('mongoose')

const notificationSchema = new mongoose.Schema({
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    receiver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    type: {
        type: String,
        enum: ['like', 'follow', 'repost', 'reply'],
        required: true
    },
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'post'
    },
    comment: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'comment'
    },
    read: {
        type: Boolean,
        default: false
    }
}, { timestamps: true })

module.exports = mongoose.model('Notification', notificationSchema)
