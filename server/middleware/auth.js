const User = require('../models/user-model')
const jwt = require('jsonwebtoken')

const auth = async(req,res,next) =>{
    try{
        const token = req.cookies.token
        // Debug logging
        console.log('Cookies:', req.cookies)
        console.log('Token:', token)
        console.log('JWT_SECRET exists:', !!process.env.JWT_SECRET)
        
        if(!token){
            return res.status(400).json({
                msg: "token not found"
            })
        }
        
        if(!process.env.JWT_SECRET) {
            return res.status(500).json({
                msg: "Server configuration error: JWT_SECRET is not defined"
            })
        }
        
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
        if(!decodedToken){
            return res.status(400).json({
                msg: "token is not verified"
            })
        }
        const user = await User.findById(decodedToken.token)
        .populate('followers')
        // .populate('thread')
        // .populate('replies')
        // .populate('reposts')

        if(!user){
            return res.status(400).json({
                msg: "user not found with the token recieved"
            })
        }
        req.user = user
        next();
    }catch(err){
        return res.status(400).json({
            msg:"Error in doing authorization", err: err.message
        })
    }
}
module.exports = auth


