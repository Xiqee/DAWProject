import mongoose from "mongoose"

const CommentSchema = new mongoose.Schema(
    {
        postID:{
            type: String,
            required: "PostID is required!",
        },
        authorID: {
            type: String,
            required: "Author is required!",
        },
        text:{
            type: String,
            required: "Text is required!",
        },
        likes:{
            type: Number,
            required: "Likes are required!"
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("Comment", CommentSchema);