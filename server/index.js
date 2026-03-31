const express = require('express')
const dotenv = require('dotenv')
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
    origin: function(origin, callback) {
        if (!origin) return callback(null, true);

        if (allowedOrigins.includes(origin)) {
            return callback(null, true);
        } else {
            return callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json())
app.use(cookieParser())

app.get('/', (req, res) => {
    res.send('backend API runningggggggggggg')
})

app.use("/api", router)

const port = process.env.PORT || 5000;
app.listen(port, ()=>{
    console.log(`server is alive at ${port}`);
    
})





