import "reflect-metadata";
import {Container} from "inversify";
import {TYPES} from "./types";
import {Bot} from "./bot";
import {Client} from "discord.js";
import {MessageResponder} from "./services/message-responder";
import {WordFinder} from "./services/word-finder";
import {Giphy} from "./services/giphy";


let container = new Container();

container.bind<Bot>(TYPES.Bot).to(Bot).inSingletonScope();
container.bind<Client>(TYPES.Client).toConstantValue(new Client());
container.bind<string>(TYPES.Token).toConstantValue(process.env.TOKEN);
container.bind<string>(TYPES.GiphyKey).toConstantValue(process.env.GIPHY_KEY);
container.bind<MessageResponder>(TYPES.MessageResponder).to(MessageResponder).inSingletonScope();
container.bind<WordFinder>(TYPES.WordFinder).to(WordFinder).inSingletonScope();
container.bind<Giphy>(TYPES.Giphy).to(Giphy).inSingletonScope();

export default container;