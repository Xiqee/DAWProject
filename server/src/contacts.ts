import * as path from "path";
const Datastore = require("mongoose");//modulo node que pode ser usado apenas como armazenamento de dados na memoria ou persistente



export interface IContact {
    _id?:number,name:string,email:string
}
//filname : local do arquivo do banco de dados
//autoload : faz o carregamento automatico do banco de dados caso ele ja exista no diretorio definido no filename
export class Worker {
    private db: Nedb ;//cria ficheiro caso n exista ou carrega-o automaticamente
    constructor(){
    this.db = new Datastore ({
        filename: path.join( __dirname ,"contacts.db"), 
        autoload: true 
    });
}

//lista todos os contactos
//db.find recebe "{}" que remete a todos os contactos e uma funcao callback
public listContacts(): Promise<IContact[]> {
    return new Promise ((inResolve,inReject ) => {
        this.db.find({},(inError : Error | null , inDocs : IContact []) => {
            if(inError){
                inReject(inError);
            }
            else{
                inResolve(inDocs);
            }

        });
    });
 }

//recebe um contacto e adiciona a db atraves do db.insert
 public addContact(inContact:IContact): Promise<IContact> {
    return new Promise ((inResolve,inReject ) => {
        this.db.insert( inContact ,(inError : Error | null , inNewDoc : IContact ) => {
            if(inError){
                inReject(inError);
            }
            else{
                inResolve(inNewDoc);
            }
        });
    });
}

//recebe um id do contacto e remove o da db atraves do db.remove
public deleteContact (inID : string): Promise<void> {
    return new Promise ((inResolve,inReject) => {
        this.db.remove({_id: inID}, { },
            (inError:Error |null, inNumRemoved:number) => {
                if(inError) {
                    inReject(inError);
                } 
                else{
                    inResolve();
                }
            });
        });
    }
}