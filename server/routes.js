const express = require('express')
const { signin, login, userDetails, followUser, updateProfile, searchUser, logout, myInfo } = require('./controllers/user-conroller')
const  auth  = require('./middleware/auth')
const { addPost, allPosts, deletePost, likePost, repost, singlePost } = require('./controllers/post-controller')
const { addComment, deleteComment } = require('./controllers/comment.controllers')



const router = express.Router()

    router.post('/signin', signin)
    router.post('/login', login)

    router.get('/user:id', auth, userDetails)
    
    //to check follower of some user
    router.put('/user/follow/:id', auth, followUser)
    router.put('/update', auth, updateProfile)
    router.get('/users/search/:query', auth, searchUser)
    router.post('/logout', auth, logout)
    router.get('/me', auth, myInfo)

    router.post('/post', auth, addPost)
    router.get('/post', auth, allPosts)
    router.delete('/post/:id', auth, deletePost)
    router.put('/post/:id', auth, likePost)
    router.put('/repost/:id', auth, repost)
    router.get('/getPost/:id', auth, singlePost)
    router.post('/comment/:id', auth, addComment)
    router.delete('/comment/:postId/:id', auth, deleteComment)


    // const protected = async(req, res)=>{
    //     res.status(200).json({
    //         msg: ' Access done! '
    //     })
    // }

    // router.get('/demo',auth , protected)


module.exports = router