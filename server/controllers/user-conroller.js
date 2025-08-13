
const User = require('../models/user-model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')



exports.signin = async (req, res)=>{
    try {
        const { userName, email, password } = req.body

        if(!userName || !email || !password){
            return res.status(400).json({
        msg: 'username, password, email are required'
        })
    }
    const userExists = await User.findOne({email})
    if(userExists){
        return res.status(400).json({
            msg: 'email exists already'
        })
    }
    const hashedPassword = await bcrypt.hash(password, 12)


    if(!hashedPassword){
        return res.status(400)({ msg : 'problem with bcyrpt '})
    }

    const user = new User({
        userName,
        email,
        password: hashedPassword
        })

    const result = await user.save()

    if(!result){
        return res.status(400).json({
            msg: 'user details are not saved yet! '
        })
    }


    //till now users details are saved successfully where all details are correct and password is hashed..


    const accessToken = jwt.sign( { token: result._id }, process.env.JWT_SECRET, {
         expiresIn: "7d" 
        })

      if(!accessToken){
        return res.status(400).json({
            msg: 'jwt why??? ! '
        })
    }
//server side cookie/ cookie--- now jwt token is done so we will store that in a cookie to keep it more secure and we cant even change it using the browserrr

    res.cookie('token', accessToken, {
        maxAge: 1000*60*60*24*7,
        httpOnly: true,
        sameSite: 'none',
        secure: true
    } )

        res.status(200).json({
            msg: `Hey ${result.userName} whats up? Welcome to the club!  `
        })

    } catch (err) {
        res.status(400).json({
        msg: 'Error in signin! ', err: err.message
        })
    }
}

exports.login = async(req, res)=>{

try{
    
    const { email, password } = req.body
    if(!email || !password){
        return res.status(400).json({
            msg: ' email and password are required to login'
        })
    }
    const userExists = await User.findOne({email})
    // console.log(userExists)
    if(!userExists){
        return res.status(400).json({
            msg: 'user doesnt exists'
        })
    }
    const passwordMatched = await bcrypt.compare(password,userExists.password)
    if(!passwordMatched){
         return res.status(400).json({
            msg: 'passeword is incorrect'
        })
    }
    const accessToken = jwt.sign({
        token: userExists._id},
        process.env.JWT_SECRET,
        {expiresIn: '7d'}
    )

    if(!accessToken){
         return res.status(400).json({
            msg: 'failed to create the token'
        })
    }
    res.cookie("token", accessToken, {
        maxAge: 1000*60*60*24*7,
        httpOnly: true,
        secure: true,
        sameSite: 'none'
    })

    res.status(200).json({
        msg: `${userExists.userName} logged in successfully`
    })


}catch(err){
    res.status(400).json({
        msg: "login is failed at beginning", 
        err: err.message
    })
}


}

//userDetails--> jis user ki profile mai jaa rahe hai uske meta data
exports.userDetails = async ( req, res )=>{
    try{
        const { id } = req.params

        if(!id){
            res.status(400).json({
            msg: "Error in finding the user id"
        })
        }

        const user = await  User.findById(id)
        .select("-password")
        .populate('followers')
        .populate({
            path: 'threads',
            populate: [{path: 'likes'}, {path: 'comments'}, {path: 'admin'}]
        })
        .populate({
            path: 'replies', populate: {path: 'admin'}
        })
        .populate({
            path: 'reposts',
            populate: [{path: 'likes'}, {path: 'comment'}, {path: 'admin'}]
        })
        res.status(200).json({
            msg:"user details fetched successfully", user
        })


    }catch(err){
        res.status(400).json({
            msg: "Error in fetching UserDetails", err: err.message
        })
    }
}

