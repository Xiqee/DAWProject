import path from "path";
import express, {Express, Request, Response} from "express";
import mongoose from "mongoose";
import {sha256} from "js-sha256";
const cors = require('cors');
const jwt = require("jwt-then");
require("dotenv").config()

//Connect to Mongo DB
mongoose.connect(process.env.DB as string).then(() => {
    console.log("DB connected")
}).catch(err => {
    console.log(err)
});

//Create express app for REST API
const app: Express = express();

//CORS SECURITY MECHANISM
app.use(cors())

//RECOGNISE OBJECTS AS JSON
app.use(express.json());


//Use client side
app.use("/", express.static(path.join(__dirname, "../../client/dist")))


//Import Mongo DB models
require("./models/user")
require("./models/blogpost")
require("./models/comment")
const User = mongoose.model("User");
const BlogPost = mongoose.model("BlogPost");
const Comment = mongoose.model("Comment");

/*
/////////////////// USER HTTP METHODS //////////////////////////////////
 */
//Creates random int between min and max (both inclusive)
function getRandomInt(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/*
Register method which takes an HTTP request with username, email and password.
If a user with the email already exists it isn't added.
Each user gets a random image
Otherwise, the user is added to the DB with a hashed password(SHA256)
 */

app.post("/register", async (inRequest: Request, inResponse: Response) => {
    try {
        const {username, email, password} = inRequest.body;
        //Checks if a user with the given email exists
        const userExists = await User.findOne({
            email,
        });
        //If a user with the email exists, creates a user with the email.
        if (userExists) inResponse.send("User with same email already exits.");

        else {
            const user = new User({
                username,
                email,
                password: sha256(password + process.env.SALT),
                image: `${getRandomInt(0, 7)}.jpg`
            });

            await user.save();
            inResponse.send("ok");
        }
    } catch (inError) {
        inResponse.send("error");
    }
});

/*
Login method which takes an HTTP request with email and password.
If the given data matches a user's data a jwt token is created
 */
app.post("/login", async (inRequest: Request, inResponse: Response) => {
    const {email, password} = inRequest.body;

    // Look for user email in the database
    const user = await User.findOne({
        email,
        password: sha256(password + process.env.SALT),
    });

    if (user) {
        // Send JWT access token
        const accessToken = await jwt.sign(
            user.toObject(),
            process.env.ACCESS_TOKEN_SECRET,
            {
                expiresIn: "1m",
            }
        );

        // Refresh token
        const refreshToken = await jwt.sign(
            user.toObject(),
            process.env.REFRESH_TOKEN_SECRET,
            {
                expiresIn: "15m",
            }
        );

        inResponse.json({
            accessToken,
            refreshToken,
        });
    } else inResponse.send("Wrong")
});

/*
User get method that gets the user with the given id
 */
app.get("/user/:id",
    async (inRequest: Request, inResponse: Response) => {
        try {
            const user = await User.findById(inRequest.params.id);
            if (user) inResponse.json(user);
            else inResponse.send("DB error");
        } catch (inError) {
            inResponse.send("error");
        }
    });

/*
/////////////////// BLOG POST HTTP METHODS //////////////////////////////////
 */
/*
Create blog post method which takes an HTTP request with authorID and text.
 */
app.post("/blogpost",
    async (inRequest: Request, inResponse: Response) => {
        try {
            const {authorID, text} = inRequest.body;
            const user = await User.findById(authorID);
            const blogpost = await new BlogPost({
                author: user.username,
                authorID: authorID,
                text: text,
                authorImage: user.image
            });
            if (await blogpost.save()) inResponse.send("done")
            else inResponse.send("DB error")
        } catch (inError) {
            inResponse.send("error");
        }
    });
/*
Update blog post method which takes an HTTP request with authorID and text.
 */
app.post("/blogpost/:id",
    async (inRequest: Request, inResponse: Response) => {
        try {
            const {authorID, text} = inRequest.body;
            const blogpost = await BlogPost.findByIdAndUpdate(inRequest.params.id, {
                authorID: authorID,
                text: text,
            });
            if (await blogpost.save()) inResponse.send("done")
            else inResponse.send("DB error")
        } catch (inError) {
            inResponse.send("error");
        }
    });

/*
Blogpost get method that gets all blogposts from the db.
 */
app.get("/blogpost",
    async (inRequest: Request, inResponse: Response) => {
        try {
            const blogposts = await BlogPost.find({});
            if (blogposts) inResponse.json(blogposts);
            else inResponse.send("DB error");
        } catch (inError) {
            inResponse.send("error");
        }
    });

/*
Blogpost get method that gets the blogpost with the given id
 */

app.get("/blogpost/:id",
    async (inRequest: Request, inResponse: Response) => {
        try {
            const blogposts = await BlogPost.findById(inRequest.params.id);
            if (blogposts) inResponse.json(blogposts);
            else inResponse.send("DB error");
        } catch (inError) {
            inResponse.send("error");
        }
    });

//Run server on port 8000
app.listen(8000);


