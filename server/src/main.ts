import path from "path";
import express, {Express, Request, Response} from "express";
import mongoose from "mongoose";
import {sha256} from "js-sha256";

const jwt = require("jwt-then");
require("dotenv").config()

mongoose.connect(process.env.DB as string).then(() => {
    console.log("DB connected")
}).catch(err => {
    console.log(err)
});

const app: Express = express();
app.use(express.json());

app.use("/", express.static(path.join(__dirname, "../../client/dist")))

require("./models/user")
require("./models/blogpost")
const User = mongoose.model("User");
const BlogPost = mongoose.model("BlogPost");

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

app.post("/blogpost",
    async (inRequest: Request, inResponse: Response) => {
        try {
            const {authorID, text} = inRequest.body;
            const blogpost = await new BlogPost({
                authorID: authorID,
                text: text,
            });
            if (await blogpost.save()) inResponse.send("done")
            else inResponse.send("DB error")
        } catch (inError) {
            inResponse.send("error");
        }
    });

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

app.listen(8080);


