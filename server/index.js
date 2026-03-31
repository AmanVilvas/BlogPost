const express = require('express')
const dotenv = require('dotenv')
// Load environment variables before other imports
dotenv.config()
const connectDB = require('./config/db')
const router = require('./routes')
const cookieParser = require('cookie-parser')
const cors = require('cors')

const app = express()
connectDB()

const allowedOrigins = [
    process.env.CLIENT_URL, 
    'https://blog-post-pb8vkptm5-aman-sharmas-projects-d13f3c48.vercel.app', 
    'https://blog-post-nu-brown.vercel.app',
    'http://localhost:3000', 
    'http://localhost:5173'
].filter(Boolean);

app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}))

app.use(express.json())
app.use(cookieParser())

// Simple health check route so you don't see "Cannot GET /"
app.get('/', (req, res) => {
    res.send('Your backend API is running successfully!')
})

app.use("/api", router)

const port = process.env.PORT
app.listen(port, ()=>{
    console.log(`server is alive at ${port}`);
    
})





