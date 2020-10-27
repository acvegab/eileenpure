import {injectable} from "inversify";

@injectable()
export class WordFinder{
    private regexp = 'ping';

    public isPing(stringToSearch: string): boolean {
        return stringToSearch.search(this.regexp) >= 0;
    }

}
