
import {Client, Message} from "discord.js";
import {inject, injectable} from "inversify";
import { MessageResponder } from "./services/message-responder";
import { Giphy } from "./services/giphy";
import { TYPES } from "./types";



@injectable()
export class Bot {
    private client: Client;
    private readonly token: string;
    private messageResponder: MessageResponder;
    private giphy: Giphy;

    constructor(
        @inject(TYPES.Client) client: Client,
        @inject(TYPES.Token) token: string,
        @inject(TYPES.MessageResponder) messageResponder: MessageResponder,
        @inject(TYPES.Giphy) giphy: Giphy
    ){
        this.client = client;
        this.token = token;
        this.messageResponder = messageResponder;
        this.giphy = giphy;
    }

    public async elmo(){
        return await this.giphy.search('elmo sesame','g');
    }
    public start(){
        
        this.client.on('message',(message:Message)=> {
            if(message.author.bot) return;

            console.log("Message received: ",message.content.toLowerCase());
            if(message.content.toLowerCase().search(/el(\s)*mo/g)>=0){
                this.elmo().then(res => {
                        let random_gif=Math.floor(Math.random() * res.length);
                        message.channel.send(res[random_gif].url);
                });
            }
            if(message.content.toLowerCase().search(/hol[ai](ta)?s*/g)>=0){
                message.reply('Holis!');
            }
            if(message.content.toLowerCase().search(/(g(u|o)a(u|o)|wow|w0w)!*/g)>=0){
                message.reply('GUAU!');
            }
            // this.messageResponder.handle(message).then(()=>{
            //     console.log("Response sent");
            // }).catch((e)=>{
            //     console.log("Response not sent: ",e);
            // })

        });
        this.client.login(this.token).then(()=>{
            console.log('Logged in!');
            this.client.user.setPresence({activity:{name:"quesesto",type:"WATCHING"}});
        }).catch((error)=>{
            console.log('Oh no! ',error);
        });
    }
}