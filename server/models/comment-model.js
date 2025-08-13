const mongoose = require('mongoose')

const commentschema = new mongoose.Schema({

    admin: {
//jisne comment kiya hai uski id
        type: mongoose.Types.ObjectId,
        ref: 'user'
    },
    //jin post par comment kiya 
    post: {
        type: mongoose.Types.ObjectId,
        ref: 'post'
    },
    text: {
        //kya comment kiya hai
        type: String,
    }

},{ timestamps: true })




module.exports = mongoose.model('comment', commentschema)