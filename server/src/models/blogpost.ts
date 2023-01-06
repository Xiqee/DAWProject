import mongoose from "mongoose"
/*
MONGO USER MODEL
ATTRIBUTES: AUTHOR NAME, AUTHOR ID, CONTENT(text) AND AUTHOR PROFILE PICTURE (authorImage)
 */
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
        authorImage:{
            type: String,
            required: "Image is required"
        }
    },
    { timestamps: true }
);
//export model
module.exports = mongoose.model("BlogPost", BlogPostSchema);