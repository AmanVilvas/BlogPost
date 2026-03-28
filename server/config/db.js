const mongoose = require('mongoose')

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log('db connected...');

        // Log if DB disconnects unexpectedly
        mongoose.connection.on('disconnected', () => {
            console.warn('MongoDB disconnected!')
        })
    } catch (err) {
        console.error('MongoDB connection failed:', err.message)
        process.exit(1) // exit process if DB fails to connect
    }
}

module.exports = connectDB