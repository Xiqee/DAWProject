import mongoose from "mongoose"

const BlogPostSchema = new mongoose.Schema(
    {
        author: {
            type: String,
            required: "Author is required!",
        },
        authorID: {
            type: String,
            required: "AuthorID is required!",
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

module.exports = mongoose.model("BlogPost", BlogPostSchema);