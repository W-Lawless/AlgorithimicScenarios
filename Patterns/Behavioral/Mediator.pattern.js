

//! Mediator Pattern 
//! Example Case: Chat Room

class User {
    constructor(name){
        this.name = name;
        this.chatLog = []
    }

    receive(source, msg) {
        const string = `${source}: ${msg}`
        this.chatLog.push(string)
        console.log(`[${this.name}'s chat session] ${string}`)
    }

    send(msg){
        this.room.broadcast(this.name, msg)
    }

    directMessage(destination, msg){
        this.room.directMessage(this.name, destination.name, msg)
    }
}

class ChatRoom {
    constructor(){
        this.users = []
    }

    join(user) {
        const notification = `${user.name} has joined the chat`
        this.broadcast('room', notification)
        user.room = this
        this.users.push(user)
    }

    broadcast(source, msg) {
        for(let user of this.users){
            if(user.name !== source) {
                user.receive(source, msg)
            }
        }
    }

    directMessage(source, destination, msg) {
        for(let user of this.users){
            if(user.name === destination) {
                user.receive(source, msg)
            }
        }
    }
}

const room = new ChatRoom()

let john = new User('john')
let jane = new User('jane')

room.join(john)
room.join(jane)

john.send('hi room')
jane.send('hey john')

const simon = new User('simon')
room.join(simon)

simon.send('hi everyone')

jane.directMessage(simon, 'hey nice to see you')


//! Mediator Pattern - Event Based
//! Example Case: Football Game

class Event
{
  constructor()
  {
    this.handlers = new Map();
    this.count = 0;
  }

  subscribe(handler)
  {
    this.handlers.set(++this.count, handler);
    return this.count;
  }

  unsubscribe(idx)
  {
    this.handlers.delete(idx);
  }

  fire(sender, args)
  {
    this.handlers.forEach(function (v, k)
    {
      v(sender, args);
    });
  }
}

class Game {
    constructor(){
        this.events = new Event()
    }
}

class Coach {
    constructor(game){
        game.events.subscribe((sender, args) => {
            if(args instanceof ScoreEventArgs && args.goalsScored < 3) console.log(`Coach says well done ${args.playerName}`)
            else if (args instanceof ScoreEventArgs && args.goalsScored > 3) console.log(`Coach says incredible job ${args.playerName}`)
        })
    }
}

class Player {
    constructor(name, game){
        this.name = name
        this.game = game
        this.goalsScored = 0
    }

    score() {
        this.goalsScored++
        const args = new ScoreEventArgs(this.name, this.goalsScored)
        this.game.events.fire(this, args)
    }
}

class ScoreEventArgs {
    constructor(playerName, goalsScored){
        this.playerName = playerName
        this.goalsScored = goalsScored
    }

    print(){
        console.log(`${this.playerName} has scored. Current goals: ${this.goalsScored}`)
    }
}

const game = new Game();
const player = new Player('Bill', game)
const coach = new Coach(game)

player.score()
player.score()
player.score()
player.score()