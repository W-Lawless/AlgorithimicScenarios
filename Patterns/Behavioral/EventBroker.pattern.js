

//! Event Broker Pattern 

class Event { 
    constructor() {
        this.handlers = new Map()
        this.count = 0
    }

    subscribe(handler){
        console.log(`Subscribing ${handler.name}`)
        this.handlers.set(++this.count, handler)
        return this.count
    }

    unsubscribe(idx){
        this.handlers.delete(idx)
    }

    fire(sender, args){
        this.handlers.forEach( (v,k) => {
            console.log(`Sending ${JSON.stringify(args)} into callback ${v.name}`)
            v(sender, args)
        })
    }
}

class Query {
    constructor(creatureName, queryTarget, value){
        this.creatureName = creatureName
        this.queryTarget = queryTarget
        this.value = value
    }
}

const whatToQuery = Object.freeze({
    'attack': 1,
    'defense': 2
})

class Game {
    constructor() {
        this.queries = new Event()
    }

    performQuery(sender, query) { 
        this.queries.fire(sender, query)
    }
}

class Creature {
    constructor(game, name, attack, defense){
        this.game = game
        this.name = name
        this.initialAttack = attack
        this.initialDefense = defense
    }

    get attack() {
        let q = new Query(this.name, whatToQuery.attack, this.initialAttack)
        this.game.performQuery(this, q)
        // console.log(`What is ${q.value}`)
        return q.value
    }

    get defense() {
        let q = new Query(this.name, whatToQuery.defense, this.initialDefense)
        this.game.performQuery(this, q)
        return q.value
    }

    toString() {
        return `${this.name} ( ${this.attack} / ${this.defense})`
    }
}

class CreatureModifier {
    constructor(game, creature) {
        this.creature = creature
        this.token = game.queries.subscribe(this.handler.bind(this))
    }

    handler(sender, query) {
        //abstract class
    }

    dispose() { this.game.queries.unsubscribe(this.token)}
}

class MagicItem extends CreatureModifier {
    constructor(game, creature){
        super(game, creature)
    }

    handler(sender, query) {
        // console.log(`Expose: ${query.creatureName}  ${query.queryTarget}`);
        if(query.creatureName === this.creature.name && query.queryTarget === whatToQuery.attack) query.value *= 2
    }
}

const gameSession = new Game()
const goblin = new Creature (gameSession, 'Strong Goblin', 2 , 2)

console.log(goblin.toString())

const itemApplied = new MagicItem (gameSession, goblin)
console.log(goblin.toString())
