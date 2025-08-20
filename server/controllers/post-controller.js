// 2:55

const User = require('../models/user-model')
const Post = require('../models/post-model')
const Comment = require('../models/comment-model')
const cloudinary = require('../config/cloudinary')
const { formidable } = require('formidable')
const { default: mongoose } = require('mongoose')


exports.addPost = async (req, res) => {
    try {
        const form = formidable({})
        // creating an instance
        form.parse(req, async (err, fields, files) => {
            if (err) {
                return res.status(400).json({
                    msg: "error in form parse! "
                })
            }
            const post = new Post()
            if (fields.text) {
                //post.text-- db se hai .text--- title aur sab
                post.text = fields.text
            }
            if (fields.media) {
                const uploadedImage = await cloudinary.uploader.upload(
                    files.media.filepath,
                    //file path in my local machine
                    { folder: "Threads_clone/Posts" }
                )
                if (!uploadedImage) {
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
                $push: { threads: newPost._id },
            }, {
                new: true
            }
            )
            res.status(201).json({
                msg: "Post posted successfully!"
            })

        })
    } catch (err) {
        res.status(400).json({
            msg: "error in posting the post", err: err.message
        })
    }
}

exports.allPosts = async (req, res) => {
    try {
        const { page } = req.query
        let pageNumber = page
        if (!page || page == undefined) {
            //means sirf 1st page dikhega --- not neg or zero bhi aa sakta hai (to prevent that)
            pageNumber = 1;
        }

        const post = await Post.find({})
            .sort({
                createdAt: -1
                //-1 means newest first and 1 means oldest first
            }).skip((pageNumber - 1) * 5)
            .limit(5)
            .populate({path: 'admin',
                select: '-password'
            }).populate({path: 'likes',
                select: '-password'
            }).populate({
                path: 'comments',
                populate: {
                    path: 'admin',
                    model: 'User'
                }
            })


        if (post.length === 0) {
            return res.status(200).json({
                msg: "No posts available",
                post: []
            });
        }

        // otherwise send posts and stop execution
        return res.status(200).json({
            msg: "Posts fetched successfully",
            post,
            count: post.length
        });

        // if(post){
        //     res.json({
        //         msg: "no posst available"
        //     })
        // }
    } catch (err) {
        res.status(400).json({
            msg: "no more post", err: err.message
        })
    }
}

exports.deletePost = async (req, res) => {
    try {
        const { id } = req.params
        //id-- post id that need to be deleted
        if (!id) {
            return res.status(400).json({
                msg: " ID is required!"
            })
        }
        const postExist = await Post.findById(id)
        if (!postExist) {
            return res.status(400).json({
                msg: "post doesnt exists"
            })
        }
        const userId = req.user._id.toString()
        const adminId = postExist.admin._id.toString()

        if (userId !== adminId) {
            return res.status(400).json({
                msg: "only admin of the post can delete the post!"
            })
        }
        if (postExist.media) {
            await cloudinary.uploader.destroy(postExist.public_id,
                (error, result) => {
                    console.log({ error, result })
                }
            )
        }
        //deleting all the comments fronm the post
        await Comment.deleteMany({ _id: { $in: postExist.comments } })

        await User.updateMany({
            $or: [{ threads: id }, { resposts: id }, { replies: id }],
        }, {
            $pull: {
                threads: id,
                reposts: id,
                replies: id
            }
        },
            { new: true }
        )

        await Post.findByIdAndDelete(id)
        res.status(200).json({
            msg: "post deleted successfully"
        })
    } catch (err) {
        return res.status(400).json({
            msg: "Error in deletePost! ", err: err.message
        })
    }
}

exports.likePost = async (req, res) => {
    try {
        //post -- id
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ msg: "id is not here" });
        }

        const postExists = await Post.findById(id);
        if (!postExists) {
            return res.status(404).json({ msg: "post doesnt exist" });
        }
        const userId = postExists.admin
        const userIdliked = await User.findById(userId)
        // If already liked -> remove like
        if (postExists.likes.includes(req.user._id)) {
            await Post.findByIdAndUpdate(
                id,
                { $pull: { likes: req.user._id } },
                { new: true }
            );

            return res.status(200).json({
                msg: `You unliked ${userIdliked.userName}'s post`
            });
        }

        // Else -> add like
        await Post.findByIdAndUpdate(
            id,
            { $push: { likes: req.user._id } },
            { new: true }
        );

        return res.status(200).json({
            msg: `You liked ${userIdliked.userName}'s post`
        });

    } catch (err) {
        return res.status(500).json({
            msg: "problem in likePost",
            err: err.message
        });
    }
};
//3:32


exports.repost = async (req, res) =>{
    try{
        const { id } = req.params
        if(!id){
            return res.status(400).json({
                msg:"id is required"
            })
        }
        const post = await Post.findById(id)
        
    if(!post){
        return res.status(400).json({
                msg:"post does not exist"
            })
    }

    const newId = new mongoose.Types.ObjectId(id)

    


    const userExist = req.user._id

    if(!userExist){
        return res.status(400).json({
                msg:"user does not exist"
            })
    }
    if(req.user.reposts.includes(newId)){
        await User.findByIdAndUpdate(userExist,
            {
                $pull: { reposts: post._id }},
                { new: true }
    )
    res.status(201).json({
        msg: "post removed from reposts"
    })
    }
    else {
            await User.findByIdAndUpdate(
                userExist,
                { $push: { reposts: post._id } },
                { new: true }
            );
            return res.status(200).json({ msg: "Reposted" });
        }

    }catch (err) {
        return res.status(500).json({
            msg: "problem in repost",
            err: err.message
        });
    }
}

exports.singlePost = async (req,res) => {
    try{
        const { id } = req.params
        if(!id){
            return res.status(400).json({
                msg: "id is required!"
            })
        }

        const post = await Post.findById( id ).populate({
            path: 'admin',
            select: '-password'
        }).populate({ path: 'likes', select: '-password'}).populate({
            path: 'comments', 
            populate: {
                path: 'admin',
            }
        })
        return res.status(200).json({
            msg:"post fetched successfully", post
        })


        // if(!post){
        //     if(!id){
        //     return res.status(400).json({
        //         msg: "id is required!"
        //     })
        //     }
        // }
        // const userId = req.user._id
        // if(!userId){
        //     if(!id){
        //     return res.status(400).json({
        //         msg: "user not found!"
        //     })
        // }
        // }

        // if(userId === post.admin){
        //     return res.status(200).json({
        //         msg:"post fetched successfully", post
        //     })
        // }else {
        //     if(!id){
        //     return res.status(400).json({
        //         msg: "you are not authorized!"
        //     })
        // }
        // }



    }catch(err){
        return res.status(400).json({
            msg:"problem with singlePost", err: err.message
        })
    }
}