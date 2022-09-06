

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