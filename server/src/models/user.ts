const mongoose = require("mongoose");
/*
MONGO USER MODEL
ATTRIBUTES: USERNAME, EMAIL, PASSWORD AND PROFILE PICTURE (image)
 */
const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: "Name is required!",
        },
        email: {
            type: String,
            required: "Email is required!",
        },
        password: {
            type: String,
            required: "Password is required!",
        },
        image: {
            type: String,
            required: "Image is required"
        }
    },
    {
        timestamps: true,
    }
);
//export model
module.exports = mongoose.model("User", userSchema);