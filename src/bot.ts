import {Client, Message} from "discord.js";
import {inject, injectable} from "inversify";
import { MessageResponder } from "./services/message-responder";
import { TYPES } from "./types";

@injectable()
export class Bot {
    private client: Client;
    private readonly token: string;
    private messageResponder: MessageResponder;

    constructor(
        @inject(TYPES.Client) client: Client,
        @inject(TYPES.Token) token: string,
        @inject(TYPES.MessageResponder) messageResponder: MessageResponder
    ){
        this.client = client;
        this.token = token;
        this.messageResponder = messageResponder;
    }


    public listen():Promise<string>{
        
        this.client.on('message',(message:Message)=> {
            if(message.author.bot) return;

            console.log("Message received: ",message.content);

            this.messageResponder.handle(message).then(()=>{
                console.log("Response sent");
            }).catch((e)=>{
                console.log("Response not sent: ",e);
            })

        });
        return this.client.login(this.token)
    }
}