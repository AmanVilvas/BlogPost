const User = require('../models/user-model')
const Notification = require('../models/notification-model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {formidable} = require('formidable')
const cloudinary = require('../config/cloudinary')
const { OAuth2Client } = require('google-auth-library')
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)

exports.signin = async (req, res) => {
    try {
        const { userName, email, password } = req.body

        if (!userName || !email || !password) {
            return res.status(400).json({
                msg: 'username, password, email are required'
            })
        }
        const userExists = await User.findOne({ email })
        if (userExists) {
            return res.status(400).json({
                msg: 'email exists already'
            })
        }
        const hashedPassword = await bcrypt.hash(password, 12)

        if (!hashedPassword) {
            return res.status(400).json({ msg: 'problem with bcrypt' })
        }

        const user = new User({
            userName,
            email,
            password: hashedPassword
        })

        const result = await user.save()

        if (!result) {
            return res.status(400).json({
                msg: 'user details are not saved yet!'
            })
        }

        if (!process.env.JWT_SECRET) {
            return res.status(500).json({
                msg: 'Server configuration error: JWT_SECRET is not defined'
            })
        }

        const accessToken = jwt.sign({ token: result._id }, process.env.JWT_SECRET, {
            expiresIn: "7d"
        })

        const isProd = process.env.NODE_ENV === 'production'
        res.cookie('token', accessToken, {
            maxAge: 1000 * 60 * 60 * 24 * 7,
            httpOnly: true,
            path: '/',
            sameSite: isProd ? 'none' : 'lax',
            secure: isProd || req.secure || req.headers['x-forwarded-proto'] === 'https'
        })

        res.status(200).json({
            msg: `Hey ${result.userName}, welcome to Threads!`
        })

    } catch (err) {
        res.status(400).json({
            msg: 'Error in signin!', err: err.message
        })
    }
}

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body
        if (!email || !password) {
            return res.status(400).json({
                msg: 'email and password are required to login'
            })
        }
        const userExists = await User.findOne({ email })
        if (!userExists) {
            return res.status(400).json({
                msg: 'user does not exist'
            })
        }
        const passwordMatched = await bcrypt.compare(password, userExists.password)
        if (!passwordMatched) {
            return res.status(400).json({
                msg: 'password is incorrect'
            })
        }

        if (!process.env.JWT_SECRET) {
            return res.status(500).json({
                msg: 'Server configuration error: JWT_SECRET is not defined'
            })
        }

        const accessToken = jwt.sign({
            token: userExists._id },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        )

        const isProd = process.env.NODE_ENV === 'production'
        res.cookie("token", accessToken, {
            maxAge: 1000 * 60 * 60 * 24 * 7,
            httpOnly: true,
            path: '/',
            sameSite: isProd ? 'none' : 'lax',
            secure: isProd || req.secure || req.headers['x-forwarded-proto'] === 'https'
        })

        res.status(200).json({
            msg: `${userExists.userName} logged in successfully`
        })

    } catch (err) {
        res.status(400).json({
            msg: "login failed",
            err: err.message
        })
    }
}

exports.googleLogin = async (req, res) => {
    try {
        const { credential, userName } = req.body;
        
        if (!credential) {
            return res.status(400).json({ msg: "Google credential is required" });
        }

        const ticket = await client.verifyIdToken({
            idToken: credential,
            audience: process.env.GOOGLE_CLIENT_ID,
        });
        
        const payload = ticket.getPayload();
        const { email, name, picture } = payload;

        let userExists = await User.findOne({ email });

        if (userExists) {
            // User exists, log them in
            if (!process.env.JWT_SECRET) {
                return res.status(500).json({ msg: 'Server configuration error' });
            }

            const accessToken = jwt.sign({ token: userExists._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
            
            const isProd = process.env.NODE_ENV === 'production';
            res.cookie("token", accessToken, {
                maxAge: 1000 * 60 * 60 * 24 * 7,
                httpOnly: true,
                path: '/',
                sameSite: isProd ? 'none' : 'lax',
                secure: isProd || req.secure || req.headers['x-forwarded-proto'] === 'https'
            });

            return res.status(200).json({ msg: `${userExists.userName} logged in successfully`, user: userExists });
        } else {
            // User does not exist
            if (!userName) {
                // If no userName provided, tell frontend we need one
                return res.status(200).json({ requireUsername: true });
            }

            // Check if chosen username is already taken
            const userNameExists = await User.findOne({ userName });
            if (userNameExists) {
                return res.status(400).json({ msg: "username exists already" });
            }

            // Create new user
            // Use a random password since it's required by schema but they use Google auth
            const hashedPassword = await bcrypt.hash(email + process.env.JWT_SECRET, 12);
            
            const newUser = new User({
                userName,
                email,
                password: hashedPassword,
                profilePic: picture || 'https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG-Clipart.png'
            });

            const result = await newUser.save();

            const accessToken = jwt.sign({ token: result._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
            
            const isProd = process.env.NODE_ENV === 'production';
            res.cookie("token", accessToken, {
                maxAge: 1000 * 60 * 60 * 24 * 7,
                httpOnly: true,
                path: '/',
                sameSite: isProd ? 'none' : 'lax',
                secure: isProd || req.secure || req.headers['x-forwarded-proto'] === 'https'
            });

            return res.status(200).json({ msg: `Hey ${result.userName}, welcome to Threads!`, user: result });
        }
    } catch (err) {
        console.log("Google login error:", err);
        res.status(400).json({ msg: "Google login failed", err: err.message });
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
            populate: [
                { path: 'likes' }, 
                { path: 'comments', populate: { path: 'admin' } }, 
                { path: 'admin' },
                { 
                    path: 'repostOf', 
                    populate: [
                        { path: 'likes' }, 
                        { path: 'comments', populate: { path: 'admin' } }, 
                        { path: 'admin' }
                    ]
                }
            ]
        })
        .populate({
            path: 'replies', populate: {path: 'admin'}
        })
        .populate({
            path: 'reposts',
            // populate likes, comments and admin of each reposted post
            populate: [
                { path: 'likes' }, 
                { path: 'comments', populate: { path: 'admin' } }, 
                { path: 'admin' }
            ]
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

            // CREATE NOTIFICATION FOR FOLLOW
            const newNotif = new Notification({
                sender: req.user._id,
                receiver: userExists._id,
                type: 'follow'
            });
            await newNotif.save();

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

exports.searchUser = async(req,res) =>{
    try{
        const {query} = req.params
        const users = await User.find({
            $or: [
                {userName: { $regex: query, $options:'i'}},
                {email: { $regex: query, $options:'i'}}
            ]
        })
        res.status(200).json({msg: 'searched', users})
    }catch(err){
        return res.status(400).json({
            msg:"Error in searching!! ", err: err.message
        })
    }
}
exports.logout = async(req,res) =>{
    try{
        const isProd = process.env.NODE_ENV === 'production'
        // Clear the cookie properly
        res.cookie('token', "",{
            maxAge: 0, // Expire immediately
            httpOnly: true,
            path: '/',
            sameSite: isProd ? 'none' : 'lax',
            secure: isProd || req.secure || req.headers['x-forwarded-proto'] === 'https'
        })
        
        console.log('Clearing cookie in logout')
        
        res.status(201).json({
            msg:'logged out successfully'
        })
    }catch(err){
        return res.status(400).json({
            msg:"Error in logout!! ", err: err.message
        })
    }
}
exports.myInfo = async (req,res)=>{
    try{
        res.status(200).json({
            me: req.user
        })
    }catch(err){
        res.status(400).json({
            msg:"info cant be found", err: err.message
        })
    }
}




