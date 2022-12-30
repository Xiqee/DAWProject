import path from "path";
import express, { Express, NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import { Socket } from "socket.io"
import {sha256} from "js-sha256";
const jwt = require("jwt-then");




const uri = "mongodb+srv://a71254:53420a@cluster0.fqb8cuo.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(uri, {
});

mongoose.connection.on("error", (err:any) => {
    console.log("Mongoose Connection ERROR: " + err.message);
});

mongoose.connection.once("open", () => {
    console.log("MongoDB Connected!");
});

const app: Express = express();
app.use( express.json());

app.use("/", express.static(path.join( __dirname,"../../client/dist")))


require("./models/user")
require("./models/message")
const User = mongoose.model("User");
const Message = mongoose.model("Message");

app.post("/register",async(inRequest: Request , inResponse : Response ) => {
    try {
        const { username, email, password } = inRequest.body;
        const userExists = await User.findOne({
            email,
        });

        if (userExists) throw "User with same email already exits.";

        const user = new User({
            username,
            email,
            password: sha256(password + "ksjdfiwejiesldcl"),
        });

        await user.save();
        inResponse.send("ok");
    }
    catch(inError){
        inResponse.send("error");
    }
});

app.post("/login",
    async ( inRequest:Request , inResponse:Response) => {
        try {
            const { email, password } = inRequest.body;
            const user = await User.findOne({
                email,
                password:sha256(password + "ksjdfiwejiesldcl"),
            });

            if (user){
                const token = await jwt.sign(user.toObject(), "dskfjslkdjfm2");
                inResponse.json({
                    user: user,
                    message:"ok",
                    token,
                });
            }
            else inResponse.send("wrong credentials")

        }
        catch(inError){
            inResponse.send("error");
        }
    });

const server = app.listen(8080);

const io = require("socket.io")(server, {
    allowEIO3: true,
    cors: {
        origin: true,
        methods: ['GET', 'POST'],
        credentials: true
    }
});
io.use(async (socket:any, next:NextFunction) => {
    try {
        const token = socket.handshake.query.token;
        const payload = await jwt.verify(token, process.env.SECRET);
        socket.userId = payload.id;
        next();
    } catch (err) {}
});

io.on("connection", (socket:any) => {
    console.log("Connected: " + socket.userId);

    socket.on("disconnect", () => {
        console.log("Disconnected: " + socket.userId);
    });

    socket.on("joinRoom", ({ conversationId } : { conversationId: String}) => {
        socket.join(conversationId);
        console.log("A user joined chatroom: " + conversationId);
    });

    socket.on("leaveRoom", ({ conversationId } : { conversationId: String}) => {
        socket.leave(conversationId);
        console.log("A user left chatroom: " + conversationId);
    });

    socket.on("chatroomMessage", async ({ conversationId, message } : { conversationId: String, message: String}) => {
        if (message.trim().length > 0) {
            const user = await User.findOne({ _id: socket.userId });
            const newMessage = new Message({
                chatroom: conversationId,
                user: socket.userId,
                message,
            });
            io.to(conversationId).emit("newMessage", {
                message,
                name: user.name,
                userId: socket.userId,
            });
            await newMessage.save();
        }
    });
});






/*
const io = require("socket.io")(server, {
    allowEIO3: true,
    cors: {
        origin: true,
        methods: ['GET', 'POST'],
        credentials: true
    }
});


io.use(async (socket: any, next: NextFunction) => {
    try {
        const token = socket.handshake.query.token;
        const payload = await jwt.verify(token, process.env.SECRET);
        socket.userId = payload.id;
        next();
    } catch (err) {}
});
io.on('connection', (socket:any) => {

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
    socket.on("joinConversation", ({ conversationID } : {conversationID: String}) => {
        socket.join(conversationID);
        console.log("A user joined conversation: " + conversationID);
    });
    socket.on("leaveConversation", ({ conversationID } : {conversationID: String}) => {
        socket.leave(conversationID);
        console.log("A user left conversation: " + conversationID);
    });


    socket.on("ConversationMessage", async ({ conversationID, message } : { conversationID: String,message:String}) => {
        if (message.trim().length > 0) {
            const user = await User.findOne({ _id: socket.userId });
            const newMessage = new Message({
                conversationId : conversationID,
                sender: socket.userId,
                text: message,
            });
            io.to(conversationID).emit("newMessage", {
                message,
                name: user.name,
                userId: socket.userId,
            });
            await newMessage.save();
        }
    });
});
*/


