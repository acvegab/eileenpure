import {Message} from "discord.js";
import {WordFinder} from "./word-finder";
import {inject, injectable} from "inversify";
import {TYPES} from "../types";

@injectable()
export class MessageResponder {
  private wordFinder: WordFinder;

  constructor(
    @inject(TYPES.WordFinder) wordFinder: WordFinder
  ) {
    this.wordFinder = wordFinder;
  }

  handle(message: Message): Promise<Message | Message[]> {
    if (this.wordFinder.isPing(message.content)) {
      return message.reply('pong!');
    }
    // else if(this.wordFinder.isGuau(message.content)){
    //   return message.reply('guau!');
    // }

    return Promise.reject();
  }
}