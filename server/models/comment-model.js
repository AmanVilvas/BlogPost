const mongoose = require('mongoose')

const commentschema = new mongoose.Schema({

// 41:26

},{ timestamps: true })




module.exports = mongoose.model('comment', commentschema)