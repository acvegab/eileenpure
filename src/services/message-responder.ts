import {Message} from "discord.js";
import {WordFinder} from "./word-finder";
import {inject, injectable} from "inversify";
import {TYPES} from "../types";

@injectable()
export class MessageResponder {
  private pingFinder: WordFinder;

  constructor(
    @inject(TYPES.WordFinder) pingFinder: WordFinder
  ) {
    this.pingFinder = pingFinder;
  }

  handle(message: Message): Promise<Message | Message[]> {
    if (this.pingFinder.isPing(message.content)) {
      return message.reply('pong!');
    }

    return Promise.reject();
  }
}