const express = require('express')
const { signin, login, userDetails } = require('./controllers/user-conroller')



const router = express.Router()

    router.post('/signin', signin)
    router.post('/login', login)
    router.get('/user:id', userDetails)


module.exports = router