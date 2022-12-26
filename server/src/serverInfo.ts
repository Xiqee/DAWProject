import path from "path";//permite a navegacao pelos diretorios e ficheiros
import fs from "fs";

//e necessario fazer com que a informacao do servidor esteja 
//disponivel para que este comunique com a classe Worker do 
//SMTP.ts onde e guardado no serverInfo.json
export interface IServerInfo {
    smtp:{ //obj com a funcao de enviar info ao server
        host:string , port: number ,
        auth:{ 
            user:string , 
            pass:string 
        }
    }
}
export let serverInfo:IServerInfo;

//le o ficheiro serverInfo.json e inicializa a variavel previamnete criada
const rawInfo: string = fs.readFileSync(path.join(__dirname,"../server/serverInfo.json"),'utf8');
serverInfo = JSON.parse(rawInfo); // string to object