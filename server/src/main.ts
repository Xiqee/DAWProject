import path from "path";
import express, { Express, NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
const Msg = require('./models/messages');

const app: Express = express();
app.use(express.json());
const http = require('http').Server(app)
const io = require('socket.io')(http)

app.use("/", express.static(path.join( __dirname,"../../client/dist")))


//CORS SECURITY
app.use(function (inRequest: Request, inResponse: Response, inNext: NextFunction) {
    inResponse.header("Access-Control-Allow-Origin", "*");//escreve no header da response o CORS
    inResponse.header("Access-Control-Allow-Methods","GET,POST,DELETE,OPTIONS");//escreve no header da response os methods
    inResponse.header("Access-Control-Allow-Headers","Origin,X-Requested-With,Content-Type,Accept");//escreve no header da response o header
    inNext();
});


const uri = "mongodb+srv://a71254:53420a@cluster0.fqb8cuo.mongodb.net/?retryWrites=true&w=majority";

async function connect() {
    try {
        await mongoose.connect(uri);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error(error);
    }
}

app.get('/add-message', (req, res) => {
    const message = new Msg({
        msg:"Dog"
    })
    message.save()
        .then((result: any) => {
            res.send(result);
        })
        .catch((err:any) => {
            console.log(err);
        });
});


async function start(){
    try {
        await connect();

        await app.listen(8080);
        console.log("App successfully started on port 8080")
    }
    catch (error) {
        console.error(error);
    }
}

start();