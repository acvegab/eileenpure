
import { TYPES } from "../types";
import {inject, injectable} from "inversify";
import giphyApi = require('giphy-api');

@injectable()
export class Giphy{
    
    constructor(
        @inject(TYPES.GiphyKey) giphyKey: string
    ){      
        let apiOptions: giphyApi.GiphyOptions = { https: true };  
        giphyApi(giphyKey);
        giphyApi(apiOptions);
        giphyApi({ timeout: 60 });
    }
    public async search(q,rating){
        const giphy: giphyApi.Giphy = giphyApi();
        let res= await giphy.search({ q: q, rating: rating });
        return res.data;
    }
    private cb(err: Error, res: any){

    }
}