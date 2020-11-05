import {injectable} from "inversify";

@injectable()
export class WordFinder{
    private regexp = 'ping';


    public isGuau(stringToSearch: string): boolean{
        return stringToSearch.search(/^[G|g]uau$/g) >=0;
    }
    public isPing(stringToSearch: string): boolean {
        return stringToSearch.search(this.regexp) >= 0;
    }

}
