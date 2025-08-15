
const User = require('../models/user-model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {formidable} = require('formidable')
const cloudinary = require('../config/cloudinary')

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
    const userExists = await User.findOne({ email })
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

        const user = await  User.findById( id )
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

exports.followUser = async (req, res)=>{
    try{
        const { id } = req.params
        if(!id){
            return res.status(400).json({
            msg:"id is required"
        })
        }
        const userExists = await User.findById(id)
        if(!userExists){
            return res.status(400).json({
            msg:"username not found"
        })
        //check in followers array if our id exists means we are already following the user id
        //if we follows them then unfollow and vice verse
        }

        if(userExists.followers.includes(req.user._id)){
            await User.findByIdAndUpdate(
                userExists._id,{
                    $pull: {followers: req.user._id},
                },
                //new will update the list of followers in the document like saving the docs
                {new: true}
            );
            return res.status(200).json({
                msg:`you have unfollowed ${userExists.userName}`
            //we have unfollowed them
            
            })
        }

        //if already follows the push the user id to followers array

        else{
            await User.findByIdAndUpdate(
                userExists._id,{
                    $push: {followers: req.user._id},
                },
                {new: true}
            );
            return res.status(200).json({
                msg:`you are following ${userExists.userName}`
                //you have followed the user
            })
        }



        }
    
    catch(err){
        res.status(400).json({
            msg:"username is required", err: err.message
        })
    }
}


exports.updateProfile = async (req, res) => {
    try {
        const userExists = await User.findById(req.user._id)
        if (!userExists) {
            return res.status(400).json({
                msg: "user does not exists"
            })
        }
        const form = formidable({ multiples: false });

        // fields-- media related text
        //files-- media filess
        form.parse(req, async (err, fields, files) => {
            if (err) {
                return res.status(400).json({
                    msg: "error in parsing the media files", err: err.message
                })
            }

            if (fields.text) {
                await User.findByIdAndUpdate(
                    req.user._id,
                    { bio: Array.isArray(fields.text) ? fields.text[0] : fields.text },
                    { new: true }
                )
            }

            //if pfp pehle se hi exists karti hai to delete the old one
            if (files.media) {
                // handle formidable array/object difference
                let fileObj = Array.isArray(files.media) ? files.media[0] : files.media;
                let filePath = fileObj.filepath || fileObj.path;

                //if pfp pehle se hi exists karti hai to delete the old one
                if (userExists.public_id) {
                    await cloudinary.uploader.destroy(
                        userExists.public_id, (error, result) => {
                            console.log({ error, result });
                        }
                    )
                }

                const uploadedImage = await cloudinary.uploader.upload(filePath,
                    { folder: 'Threads_clone/Profiles' }
                )
                if (!uploadedImage) {
                    return res.status(400).json({
                        msg: "file not uploaded successfully"
                    })
                }

                await User.findByIdAndUpdate(
                    req.user._id,
                    { profilePic: uploadedImage.secure_url, public_id: uploadedImage.public_id },
                    { new: true }
                )
            }

            res.status(201).json({
                msg: 'pfp updated successfully'
            })
        })

    } catch (err) {
        res.status(400).json({
            msg: "profile doesnt exists", err: err.message
        })
    }
}
