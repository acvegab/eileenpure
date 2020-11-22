export const TYPES ={
    Bot: Symbol("Bot"),
    Client: Symbol("Client"),
    Token: Symbol("Token"),
    MessageResponder: Symbol("MessageResponder"),
    WordFinder: Symbol("WordFinder"),
    Giphy: Symbol("Giphy"),
    GiphyKey: Symbol("GiphyKey"),
};

function exist(board: string[][], word: string): boolean {
    let current_char=0;
    let board_width=board.length;
    let board_height=board[0].length;


    function search(x,y,d:number){
        let next_position;
        if(x>=this.board_width || x<0 || y>=this.board_height || word.charAt(d) != board[x][y]){ return false;}
        let temp = board[x][y];
        board[x][y]="0";
        let found=search(x,y-1,d+1) || search(x,y+1,d+1) || search(x-1,y,d+1) || search(x+1,y,d+1);
        board[x][y]=temp;
        return found;
    }

    for(let y=0;y<board.length;y++){
     for(let x=0; x<board[y].length;x++){
        if(search(x,y,0)){
            return true;
        }
     }
    }
};
