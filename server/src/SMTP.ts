import * as nodemailer from "nodemailer";
import {SendMailOptions,SentMessageInfo} from "nodemailer";
import Mail from "nodemailer/lib/mailer";

import {IServerInfo} from "./serverInfo";

/*
Classe Worker
*/
export class Worker {
    private static serverInfo:IServerInfo; //cria variavel serverInfo importada
    //construtor recebe um objeto serverInfo e coloca na variavel worker.serverInfo
    constructor(inServerInfo:IServerInfo) {
        Worker.serverInfo = inServerInfo;
    }
     
    //recebe um sendMailOptions e retorna um promise
    public sendMessage(inOptions:SendMailOptions):Promise<void>{
        return new Promise ((inResolve,inReject) => {
            const transport:Mail = nodemailer.createTransport( Worker.serverInfo.smtp);//conecta ao servidor SMTP para puder enviar a mensagem
            transport.sendMail ( inOptions ,
                ( inError : Error | null , inInfo : SentMessageInfo ) => {
                if (inError){
                    inReject(inError);//erro
                }
                else{
                    inResolve (); //sucesso
                }
            });
        });
    }
}