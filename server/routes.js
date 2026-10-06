const express = require('express')
const { signin, login, userDetails, followUser, updateProfile, searchUser, suggestedUsers, discoverUsers, logout, myInfo, googleLogin } = require('./controllers/user-conroller')
const auth = require('./middleware/auth')
const optionalAuth = auth.optionalAuth
const { addPost, allPosts, feedPosts, updatePost, deletePost, likePost, repost, singlePost } = require('./controllers/post-controller')
const { addComment, deleteComment } = require('./controllers/comment.controllers')



const router = express.Router();
router.post('/signin', signin)
    router.post('/login', login)
    router.post('/google-login', googleLogin)

    router.get('/user/:id', userDetails)
    
    router.put('/user/follow/:id', auth, followUser)
    router.put('/update', auth, updateProfile)
    router.get('/users/search/:query', searchUser)
    router.get('/users/discover', optionalAuth, discoverUsers)
    router.get('/users/suggestions', suggestedUsers)
    router.post('/logout', auth, logout)
    router.get('/me', auth, myInfo)

    router.post('/post', auth, addPost)
    router.get('/post', allPosts)
    // Keep already-open older clients working while they refresh to the feed URL.
    router.get('/following', auth, (req, res) => {
        req.params.feed = 'following'
        return feedPosts(req, res)
    })
    router.get('/post/feed/following', auth, (req, res) => {
        req.params.feed = 'following'
        return feedPosts(req, res)
    })
    router.get('/post/feed/discover', feedPosts)
    router.put('/post/:id', auth, updatePost)
    router.delete('/post/:id', auth, deletePost)
    router.put('/post/like/:id', auth, likePost)
    router.put('/repost/:id', auth, repost)
    router.get('/post/:id', singlePost)
    router.post('/comment/:id', auth, addComment)
    router.delete('/comment/:postId/:id', auth, deleteComment)

    const { getNotifications, markAsRead } = require('./controllers/notification.controllers')
    router.get('/notifications', auth, getNotifications)
    router.put('/notifications/read', auth, markAsRead)

module.exports = router
