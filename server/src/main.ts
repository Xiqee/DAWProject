import path from "path";
import express, {Express, Request, Response} from "express";
import mongoose from "mongoose";
import {sha256} from "js-sha256";
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
Register method which takes an HTTP request with username, email and password.
If a user with the email already exists it isn't added.
Otherwise, the user is added to the DB with a hashed password(SHA256)
 */
app.post("/register", async (inRequest: Request, inResponse: Response) => {
    try {
        const {username, email, password} = inRequest.body;
        const userExists = await User.findOne({
            email,
        });

        if (userExists) inResponse.send("User with same email already exits.");

        else {
            const user = new User({
                username,
                email,
                password: sha256(password + process.env.SALT),
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
app.post("/login",
    async (inRequest: Request, inResponse: Response) => {
        try {
            const {email, password} = inRequest.body;
            const user = await User.findOne({
                email,
                password: sha256(password + process.env.SALT),
            });

            if (user) {
                const token = await jwt.sign(user.toObject(), process.env.SECRET);
                inResponse.json({
                    user: user,
                    message: "ok",
                    token,
                });
            } else inResponse.send("wrong credentials")

        } catch (inError) {
            inResponse.send("error");
        }
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
Create blog post method which takes an HTTP request with authorID and text.
 */
app.post("/blogpost",
    async (inRequest: Request, inResponse: Response) => {
        try {
            const {authorID, text} = inRequest.body;
            const blogpost = await new BlogPost({
                authorID: authorID,
                text: text,
                likes:0
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
Update blog post method which increments the likes value of the post with given ID.
 */
app.post("/blogpost/like/:id",
    async (inRequest: Request, inResponse: Response) => {
        try {
            await BlogPost.findByIdAndUpdate(inRequest.params['id'], {$inc : {'likes' : 1}});
            inResponse.send("done");
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

/*
Create blog post method which takes an HTTP request with postID, authorID and text.
 */
app.post("/comment/:id",
    async (inRequest: Request, inResponse: Response) => {
        try {
            const {authorID, text} = inRequest.body;
            const comment = await new Comment( {
                postID: inRequest.params.id,
                authorID: authorID,
                text: text,
            });
            if (await comment.save()) inResponse.send("done")
            else inResponse.send("DB error")
        } catch (inError) {
            inResponse.send("error");
        }
    });
app.get("/blogpost/comments/:id",
    async (inRequest: Request, inResponse: Response) => {
        try {
            const comments = await Comment.find({'postID' : inRequest.params['id']});
            if (comments) inResponse.json(comments);
            else inResponse.send("DB error");
        } catch (inError) {
            inResponse.send("error");
        }
    });


app.listen(8000);


