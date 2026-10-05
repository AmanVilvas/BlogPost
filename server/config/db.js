const mongoose = require('mongoose')

const connectDB = async () => {
    try {
        if (!process.env.MONGO_URI) {
            throw new Error('MONGO_URI is not defined. Add it to server/.env or the backend service environment.')
        }
        await mongoose.connect(process.env.MONGO_URI)
        console.log('db connected...');

        // Log if DB disconnects unexpectedly
        mongoose.connection.on('disconnected', () => {
            console.warn('MongoDB disconnected!')
        })
    } catch (err) {
        throw new Error(`MongoDB connection failed: ${err.message}`)
    }
}

module.exports = connectDB
