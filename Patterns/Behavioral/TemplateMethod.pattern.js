

//! Template Method Pattern 
//! Example Case: Board Game


class Game {
    constructor(numberOfPlayers) {
        this.numberOfPlayers = numberOfPlayers
        this.currentPlayer = 0
    }

    //* Template Method:
    run() {
        this.start();
        while (!this.haveWinner){
            this.takeTurn();
        }
        console.log(`Player ${this.winnngPlayer} wins!`)
    }

    start(){}
    takeTurn(){}
    get haveWinner(){}
    get winnngPlayer() {}
}

class Chess extends Game {
    constructor() {
        super(2)
        this.maxTurn = 10
        this.turn = 1
    }

    start(){
        console.log(`Game of Chess begun. ${this.numberOfPlayers} players`)
    }

    get haveWinner(){
        return this.turn === this.maxTurn
    }

    takeTurn(){
        console.log(`Turn ${this.turn++} taken by Player ${this.currentPlayer}`)
        this.currentPlayer = (this.currentPlayer + 1) % this.numberOfPlayers
    }

    get winnngPlayer(){
        return this.currentPlayer
    }
}

const chess = new Chess()
chess.run()

