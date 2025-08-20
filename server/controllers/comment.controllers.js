const User = require("../models/user-model");
const Post = require("../models/post-model");
const Comment = require("../models/comment-model");
const mongoose = require("mongoose");

// exports.addComment = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { text } = req.body;
//     if (!id) {
//       return res.status(400).json({ msg: "id is required !" });
//     }
//     if (!text) {
//       return res.status(400).json({ msg: "No comment is added !" });
//     }
//     const postExists = await Post.findById(id);
//     if (!postExists) {
//       return res.status(400).json({ msg: "No such post !" });
//     }
//     const comment = new Comment({
//       text,
//       admin: req.user._id,
//       post: postExists._id,
//     });
//     const newComment = await comment.save();
//     await Post.findByIdAndUpdate(
//       id,
//       {
//         $push: { comments: newComment._id },
//       },
//       { new: true }
//     );
//     await User.findByIdAndUpdate(
//       req.user._id,
//       {
//         $push: { replies: newComment._id },
//       },
//       { new: true }
//     );
//     res.status(201).json({ msg: "Commented !" });
//   } catch (err) {
//     res.status(400).json({ msg: "Error in addComment !", err: err.message });
//   }
// };

exports.addComment = async (req, res) => {
  try {
    const { id } = req.params; // postId
    const { text } = req.body;

    if (!id) {
      return res.status(400).json({ msg: "Post ID is required!" });
    }
    if (!text) {
      return res.status(400).json({ msg: "No comment text provided!" });
    }

    const postExists = await Post.findById(id);
    if (!postExists) {
      return res.status(404).json({ msg: "Post not found!" });
    }

    // Create comment
    const comment = new Comment({
      text,
      admin: req.user._id,
      post: postExists._id,
    });
    const newComment = await comment.save();

    // Push into Post
    await Post.findByIdAndUpdate(
      id,
      { $push: { comments: newComment._id } },
      { new: true }
    );

    // Push into User
    await User.findByIdAndUpdate(
      req.user._id,
      { $push: { replies: newComment._id } },
      { new: true }
    );

    return res.status(201).json({ msg: "Comment added successfully!", comment: newComment });
  } catch (err) {
    return res.status(500).json({ msg: "Error in addComment", err: err.message });
  }
};

// ---------------- Delete Comment ----------------
exports.deleteComment = async (req, res) => {
  try {
    const { postId, id } = req.params;

    // Validate IDs
    if (!mongoose.Types.ObjectId.isValid(postId) || !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ msg: "Invalid Post ID or Comment ID" });
    }

  //   console.log("Route ID:", id);
  // console.log("Post Found:", post);
// console.log("User ID:", userId);
// console.log("User:", user);

    // Check post existence
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ msg: "Post not found!" });
    }

    // Check comment existence
    const comment = await Comment.findById(id);
    if (!comment) {
      return res.status(404).json({ msg: "Comment not found!" });
    }

    // Ensure comment belongs to this post
    if (!post.comments.includes(comment._id)) {
      return res.status(400).json({ msg: "This post does not include the comment!" });
    }

    // Authorization: comment owner OR post owner
    const commentOwner = comment.admin.toString();
    const postOwner = post.admin.toString();
    const currentUser = req.user._id.toString();

    if (commentOwner !== currentUser && postOwner !== currentUser) {
      return res.status(403).json({ msg: "You are not authorized to delete this comment!" });
    }

    // Remove from Post
    await Post.findByIdAndUpdate(postId, { $pull: { comments: comment._id } });

    // Remove from User
    await User.findByIdAndUpdate(commentOwner, { $pull: { replies: comment._id } });

    // Delete the comment itself
    await Comment.findByIdAndDelete(id);

    return res.status(200).json({ msg: "Comment deleted successfully!" });
  } catch (err) {
    return res.status(500).json({ msg: "Error in deleteComment", err: err.message });
  }
};