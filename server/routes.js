const express = require('express')
const { signin, login, userDetails, followUser, updateProfile, searchUser, logout, myInfo, googleLogin } = require('./controllers/user-conroller')
const  auth  = require('./middleware/auth')
const { addPost, allPosts, deletePost, likePost, repost, singlePost } = require('./controllers/post-controller')
const { addComment, deleteComment } = require('./controllers/comment.controllers')



const router = express.Router()

    router.post('/signin', signin)
    router.post('/login', login)
    router.post('/google-login', googleLogin)

    router.get('/user/:id', auth, userDetails)
    
    //to check follower of some user
    router.put('/user/follow/:id', auth, followUser)
    router.put('/update', auth, updateProfile)
    router.get('/users/search/:query', auth, searchUser)
    router.post('/logout', auth, logout)
    router.get('/me', auth, myInfo)

    router.post('/post', auth, addPost)
    router.get('/post', auth, allPosts)
    router.delete('/post/:id', auth, deletePost)
    // like a post -- separate path to avoid clash with DELETE /post/:id
    router.put('/post/like/:id', auth, likePost)
    router.put('/repost/:id', auth, repost)
    // get a single post -- GET /post/:id (Express differentiates GET from DELETE)
    router.get('/post/:id', auth, singlePost)
    router.post('/comment/:id', auth, addComment)
    router.delete('/comment/:postId/:id', auth, deleteComment)

    const { getNotifications, markAsRead } = require('./controllers/notification.controllers')
    router.get('/notifications', auth, getNotifications)
    router.put('/notifications/read', auth, markAsRead)

module.exports = router