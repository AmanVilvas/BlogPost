const express = require('express')
const { signin, login, userDetails, followUser } = require('./controllers/user-conroller')
const  auth  = require('./middleware/auth')



const router = express.Router()

    router.post('/signin', signin)
    router.post('/login', login)

    router.get('/user:id', userDetails)
    
    //to check follower of some user
    router.put('/user/follow/:id', auth, followUser)

    // const protected = async(req, res)=>{
    //     res.status(200).json({
    //         msg: ' Access done! '
    //     })
    // }

    // router.get('/demo',auth , protected)


module.exports = router