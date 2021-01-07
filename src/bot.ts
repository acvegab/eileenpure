
import {Client, Guild, TextChannel, Message} from "discord.js";
import {inject, injectable} from "inversify";
import { MessageResponder } from "./services/message-responder";
import { Giphy } from "./services/giphy";
import { TYPES } from "./types";

import { CronJob } from 'cron';
//DISCORD
@injectable()
export class Bot {
    private client: Client;
    private readonly token: string;
    private messageResponder: MessageResponder;
    private giphy: Giphy;
    private guild:Guild;
    private cronJob: CronJob;
    private inviteCode;

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
    // public sendMessage(guild:Guild, message, channelName){
    //     console.log('Envía mensaje')
    //     const channel = guild.channels.cache.find(channel => channel.name === channelName);
    //     console.log(`Envía mensaje al channel: ${channel}`)
    //     channel.send(message);
    // }
    public async elmo(){
        return await this.giphy.search('elmo sesame','g');
    }
    public start(){

        this.client.on('guildMemberAdd', member => {
            if(member.guild.name=="Satokito"){
            const channel = member.guild.channels.cache.find(ch => ch.name === 'welcome');
            const reglas = member.guild.channels.cache.find(ch => ch.name === 'reglas');
            if (!channel) return;
            (channel as TextChannel).send(`**¡Hola ${member}!** Qué bueno que llegaste, pasa al canal <#${reglas.id}> para que las leas con mucha atención y podamos mantener una linda comunidad :3`);
            }
        });
        this.client.on('message',(message:Message)=> {
            if(message.author.bot) return;
            let command=message.content.toLowerCase();
            const message_split=message.content.split('!eileen ');

            // SATOKITO
            if(message_split.length>=2&&message.guild.name==='Satokito'){
                command = message_split[1];
                console.log(`el comando es: ${command}`)
                // if(command.split('welcome').length>=2){
                //     this.sendMessage(message.guild,command.split('welcome')[1],'reglas');
                // }
                // if(command.split('invite').length>=2){
                //     const channel = message.guild.channels.cache.find(ch => ch.name === 'test');
                //     channel.createInvite()
                //     .then(invite => channel.send(`Created an invite with a code of https://discord.gg/${invite.code}`))
                //     .catch(console.error);
                // }
                // return;

            } 

            // General
            console.log("Message received: ",command);
            if(command.search(/el(\s)*mo/g)>=0){
                this.elmo().then(res => {
                        let random_gif=Math.floor(Math.random() * res.length);
                        message.channel.send(res[random_gif].url);
                });
            }

            return;

            // if(command.search(/hol[ai](ta)?s*/g)>=0){
            //     message.reply('Holis!');
            // }
            // if(command.search(/(g(u|o)a(u|o)|wow|w0w)!*/g)>=0){
            //     message.reply('GUAU!');
            // }
            // this.messageResponder.handle(message).then(()=>{
            //     console.log("Response sent");
            // }).catch((e)=>{
            //     console.log("Response not sent: ",e);
            // })

        });
        this.client.login(this.token).then(()=>{
            console.log('Logged in!');
            // this.startJob();
            this.client.user.setPresence({activity:{name:"quesesto",type:"WATCHING"}});
        }).catch((error)=>{
            console.log('Oh no! ',error);
        });
    }
    
    // public generateInvite(){
    //     console.log('generate Invite');
    //     const guild = this.client.guilds.cache.find(guild => guild.name === 'Satokito');
    //     const channel = guild.channels.cache.find(ch => ch.name === 'test');
    //     channel.createInvite()
    //     // .then(invite => channel.send(`Created an invite with a code of https://discord.gg/${invite.code}`))
    //     .then(invite => this.inviteCode=invite.code)
    //     .catch(console.error);
    // }
    // public startJob(){
    //     console.log('Start cron job');
    //     this.cronJob = new CronJob('30 * * * * *', async () => {
    //         try {
    //         await this.generateInvite();
    //         } catch (e) {
    //         console.error(e);
    //         }
    //     });
    //     this.cronJob.start();
    // }
}