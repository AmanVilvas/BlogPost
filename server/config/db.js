const mongoose = require('mongoose')

const connectDB = async () => {
    try {
        if (!process.env.MONGO_URI) {
            console.error('MONGO_URI is not defined')
            return
        }
        await mongoose.connect(process.env.MONGO_URI)
        console.log('db connected...');

        // Log if DB disconnects unexpectedly
        mongoose.connection.on('disconnected', () => {
            console.warn('MongoDB disconnected!')
        })
    } catch (err) {
        console.error('MongoDB connection failed:', err.message)
        
    }
}

module.exports = connectDB
