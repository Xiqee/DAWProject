"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const serverInfo_1 = require("./serverInfo");
const SMTP = __importStar(require("./SMTP"));
const Contacts = __importStar(require("./contacts"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
//recebe como primeiro parametro o path e segundo argumento o path raiz a partir do qual os ativos estáticos serão atendidos
app.use("/", express_1.default.static(path_1.default.join(__dirname, "../../client/dist")));
//recebe um request e uma response
app.use(function (inRequest, inResponse, inNext) {
    inResponse.header("Access-Control-Allow-Origin", "*"); //escreve no header da response o CORS
    inResponse.header("Access-Control-Allow-Methods", "GET,POST,DELETE,OPTIONS"); //escreve no header da response os methods
    inResponse.header("Access-Control-Allow-Headers", "Origin,X-Requested-With,Content-Type,Accept"); //escreve no header da response o header
    inNext();
});
//recebe como primeiro argumento um path que é "/messages" e o segundo um callback
app.post("/messages", (inRequest, inResponse) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const smtpWorker = new SMTP.Worker(serverInfo_1.serverInfo); //Cria uma variavel do tipo Worker
        yield smtpWorker.sendMessage(inRequest.body); //Envia mensagem usando a funcao sendMessage do ficheiro
        inResponse.send("ok"); //Na resposta envia mensagem "ok"
    }
    catch (inError) {
        inResponse.send("error"); //Na resposta envia mensagem "error"
    }
}));
//recebe como primeiro argumento path que é "/contacts" e segundo um callback
//funcao para mostrar a lista (exemplo)
app.get("/contacts", (inRequest, inResponse) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const contactsWorker = new Contacts.Worker(); //Cria uma variavel do tipo worker
        const contacts = yield contactsWorker.listContacts(); //lista os contacts com a funcao .listContacts() do worker
        inResponse.json(contacts); // serialize object into JSON, adiciona para a resposta esse contacto (da print na response como postman apresenta)
    }
    catch (inError) {
        inResponse.send("error"); //Na resposta apressenta a mensagem "error"
    }
}));
//recebe como primeiro argumento path que é "/contacts" e segundo um callback
//funcao para adicionar contactos (exemplo)
app.post("/contacts", (inRequest, inResponse) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const contactsWorker = new Contacts.Worker(); //Cria uma variavel do tipo worker
        const contact = yield contactsWorker.addContact(inRequest.body); //adiciona o contacto a lista 
        inResponse.json(contact); // for client acknowledgment and future use ( includesID), serve para apresnetar o contacto na response
    }
    catch (inError) {
        inResponse.send("error"); // aparece erro na response
    }
}));
//recebe como primeiro argumento path que é "/contacts/:id" e segundo um callback
//serve para dar delete a um contacto, temos de especificar qual o contacto dizendo o id do contacto    
app.delete("/contacts/:id", (inRequest, inResponse) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const contactsWorker = new Contacts.Worker();
        yield contactsWorker.deleteContact(inRequest.params.id); //da delete do contacto na lista
        inResponse.send("ok"); //Na resposta envia mensagem "ok"
    }
    catch (inError) {
        inResponse.send("error"); //Na resposta envia mensagem "error"
    }
}));
const uri = "mongodb+srv://a71254:53420a@cluster0.fqb8cuo.mongodb.net/?retryWrites=true&w=majority";
function connect() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield mongoose_1.default.connect(uri);
            console.log("Connected to MongoDB");
        }
        catch (error) {
            console.error(error);
        }
    });
}
function start() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield connect();
            yield app.listen(8080);
            console.log("App successfully started on port 8080");
        }
        catch (error) {
            console.error(error);
        }
    });
}
start();
