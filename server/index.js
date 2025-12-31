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

const isProd = process.env.NODE_ENV === 'production'
// Enhanced CORS configuration for better cookie handling
app.use(cors({
    origin: isProd ? ['https://your-prod-domain.com'] : ['http://localhost:5173'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}))

// Debug middleware to log requests
app.use((req, res, next) => {
    console.log(`${req.method} ${req.path}`)
    next()
})
app.use(express.json())
app.use(cookieParser())

app.use("/api", router)

const port = process.env.PORT
app.listen(port, ()=>{
    console.log(`server is alive at ${port}`);
    
})





