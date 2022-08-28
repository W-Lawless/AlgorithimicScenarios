
//! Abstract Factory Pattern 
//! Drink Machine Example


//* Requires
const readline = require('readline');
const rl = readline.createInterface({ input: process.stdin, output: process.stdout });


//* Base Class
class HotDrink {
    consume() { /* do nothing */}
}

//* Unique Types
class Tea extends HotDrink {
    consume(){ console.log('A nice chamomille') }
}

class Coffee extends HotDrink {
    consume(){ console.log('Fresh hot coffee') }
}

//* Base Factory
class HotDrinkFactory {
    prepare(amount) { /* do nothing */}
}

//* Type Factories 
class TeaFactory extends HotDrinkFactory { 
    prepare(amount) { console.log(`1. Boil water\n2. Place tea bag\n3. Pour ${amount}ml`); return new Tea()}
}

class CoffeFactory extends HotDrinkFactory {
    prepare(amount) { console.log(`1. Load grounds\n2. Stew pot\n3. Pour ${amount}ml`); return new Coffee()}
}

//* API 

//* Naive Approach:
class HotDrinkMachine {
    makeDrink(type) { 
        switch(type) {
            case 'Tea':
                return new TeaFactory().prepare(200);
                
            case 'Coffee':
                return new CoffeFactory().prepare(100);
                
            default:
                throw new Error(`Drink machine doesn't carry ${type}`)
        }
    }
}

//* Naive Implementation
// let machine = new HotDrinkMachine();
// rl.question('Which drink would you like from the machine? (Tea or Coffee)\n', answer => {
//     let drink = machine.makeDrink(answer);
//     drink.consume();
//     rl.close();
// })


//! Design Pattern::
//* Abstract Factory Pattern

let AvailableDrinks = Object.freeze({
    Coffee: CoffeFactory,
    Tea: TeaFactory
})

class Abstracted_HotDrinkMachine {
    constructor() {
        this.factories = {}
        for (let drink in AvailableDrinks) {
            this.factories[drink] = new AvailableDrinks[drink]()
        }
    }
    interact(consumer) {
        rl.question('Which drink would you like from the machine? And how much in mL? (Tea 50 or Coffee 200)\n', answer => {
            const drink = answer.split(' ')[0]
            const amount = parseInt(answer.split(' ')[1])
            const preparedDrink = this.factories[drink].prepare(amount)
            rl.close();
            consumer(preparedDrink)  
        })
    }
    makeDrink(type) { 
        switch(type) {
            case 'Tea':
                return new TeaFactory().prepare(200);
                
            case 'Coffee':
                return new CoffeFactory().prepare(100);
                
            default:
                throw new Error(`Drink machine doesn't carry ${type}`)
        }
    }
}

//* Abstracted Implementation

const abstractedMachine = new Abstracted_HotDrinkMachine()
abstractedMachine.interact(drink => { drink.consume() })
