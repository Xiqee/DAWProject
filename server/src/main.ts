import path from "path";
import express, { Express, NextFunction, Request, Response } from "express";
import mongoose from "mongoose";


import * as Contacts from "./contacts";
import { IContact } from "./contacts";

const app: Express = express();
app.use(express.json());
const http = require('http').Server(app)
const io = require('socket.io')(http)

//recebe como primeiro parametro o path e segundo argumento o path raiz a partir do qual os ativos estáticos serão atendidos
app.use("/",
    express.static(path.join(__dirname, "../../client/dist"))
);

//CORS SECURITY
app.use(function (inRequest: Request, inResponse: Response, inNext: NextFunction) {
    inResponse.header("Access-Control-Allow-Origin", "*");//escreve no header da response o CORS
    inResponse.header("Access-Control-Allow-Methods","GET,POST,DELETE,OPTIONS");//escreve no header da response os methods
    inResponse.header("Access-Control-Allow-Headers","Origin,X-Requested-With,Content-Type,Accept");//escreve no header da response o header
    inNext();
});

//recebe como primeiro argumento um path que é "/messages" e o segundo um callback
app.post("/messages", async (inRequest: Request, inResponse: Response) => {
    try {

        inResponse.send("ok");//Na resposta envia mensagem "ok"
    }
    catch (inError) {
        inResponse.send("error"); //Na resposta envia mensagem "error"
    }
});


//recebe como primeiro argumento path que é "/contacts" e segundo um callback
//funcao para mostrar a lista (exemplo)
app.get("/contacts",
    async (inRequest: Request, inResponse: Response) => {
        try {
            const contactsWorker: Contacts.Worker = new Contacts.Worker();//Cria uma variavel do tipo worker
            const contacts: IContact[] = await contactsWorker.listContacts();//lista os contacts com a funcao .listContacts() do worker
            inResponse.json(contacts); // serialize object into JSON, adiciona para a resposta esse contacto (da print na response como postman apresenta)
        }
        catch (inError) {
            inResponse.send("error");//Na resposta apressenta a mensagem "error"
        }
    });

//recebe como primeiro argumento path que é "/contacts" e segundo um callback
//funcao para adicionar contactos (exemplo)
app.post("/contacts",
    async (inRequest: Request, inResponse: Response) => {
        try {
            const contactsWorker: Contacts.Worker = new Contacts.Worker();//Cria uma variavel do tipo worker
            const contact: IContact = await contactsWorker.addContact(inRequest.body);//adiciona o contacto a lista
            inResponse.json(contact); // for client acknowledgment and future use ( includesID), serve para apresnetar o contacto na response
        }
        catch (inError) {
            inResponse.send("error");// aparece erro na response
        }
    });

//recebe como primeiro argumento path que é "/contacts/:id" e segundo um callback
//serve para dar delete a um contacto, temos de especificar qual o contacto dizendo o id do contacto    
app.delete("/contacts/:id", async (inRequest: Request, inResponse: Response) => {
    try {
        const contactsWorker: Contacts.Worker = new Contacts.Worker();
        await contactsWorker.deleteContact(inRequest.params.id);//da delete do contacto na lista
        inResponse.send("ok"); //Na resposta envia mensagem "ok"
    }
    catch (inError) {
        inResponse.send("error"); //Na resposta envia mensagem "error"
    }
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