const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({

    admin: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'

    },
    text: {
        type: String
    },
    media: {
        type: String
    },
    public_id: {
        type: String
    },
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'comment'
    }],


},{timestamps: true})


module.exports = mongoose.model('post',postSchema)






//35:20