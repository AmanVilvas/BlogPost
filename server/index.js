const express = require('express')
const dotenv = require('dotenv')
dotenv.config()
const connectDB = require('./config/db')
const router = require('./routes')
const cookieParser = require('cookie-parser')
const cors = require('cors')

const app = express()
app.use(cors({
    origin: function (origin, callback) {
        callback(null, true)
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}))

app.use(express.json())
app.use(cookieParser())

app.get('/', (req, res) => {
    res.send('backend API runningggggggggggg')
})

app.use("/api", router)

const port = process.env.PORT || 5000;
connectDB()
    .then(() => {
        app.listen(port, () => {
            console.log(`server is alive at ${port}`)
        })
    })
    .catch((err) => {
        console.error(err.message)
        process.exitCode = 1
    })





