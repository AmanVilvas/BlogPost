// 2:55

const User = require('../models/user-model')
const Post = require('../models/post-model')
const Comment = require('../models/comment-model')
const cloudinary = require('../config/cloudinary')
const {formidable} = require('formidable')


exports.addPost = async (req,res) =>{
    try{
        const form = formidable({})
        // creating an instance
        form.parse(req, async(err, fields, files)=>{
            if(err){
                return res.status(400).json({
                    msg: "error in form parse! "
                })
            }
            const post = new Post()
            if(fields.text){
                //post.text-- db se hai .text--- title aur sab
                post.text = fields.text
            }
            if(fields.media){
            const uploadedImage = await cloudinary.uploader.upload(
                files.media.filepath,
                //file path in my local machine
                { folder: "Threads_clone/Posts" }
            )
            if( !uploadedImage ){
                return res.status(400).json({
                    msg: " image is not uploaded"
                })
            }
            //means image is uploaded successfully
            post.media = uploadedImage.secure_url // url is given by cloudinary
            post.public_id = uploadedImage.public_id

            }
            //admin of the post
            post.admin = req.user._id
            //newPost mai sab info aajayegi post ki
            const newPost = await post.save()
            await User.findByIdAndUpdate(req.user._id, {
                $push: { threads: newPost._id},
            },{ 
                    new: true
                }
            )
            res.status(201).json({
                msg: "Post posted successfully!"
            })

        })
    }catch(err){
        res.status(400).json({
            msg: "error in posting the post", err: err.message
        })
    }
}

exports.allPosts = async(req,res)=>{
    try{   
        const { page } = req.query
        let pageNumber = page
        if(!page || page == undefined){
            //means sirf 1st page dikhega --- not neg or zero bhi aa sakta hai (to prevent that)
            pageNumber = 1;
        }

        const post = await Post.find({})
        .sort({ createdAt: -1 
            //-1 means newest first and 1 means oldest first
         }).skip((pageNumber - 1)*5)
        .limit(5)
        .populate("admin").populate('likes').populate({
            path: 'comments',
            populate: {
                path: 'admin',
                model: 'User'
            }
        })
    res.status(200).json({msg: "posts fetched successfuly", 
        post
    })
    }catch(err){
        res.status(400).json({
            msg:"no more post", err: err.message
        })
    }
}


