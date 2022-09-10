

//! Observer Pattern: Event Based
//! Example Case: Sims Game

class Event {
    constructor() {
        this.handlers = new Map();
        this.count = 0
    }

    subscribe(handler) {
        this.handlers.set(++this.count, handler)
        return this.count
    }

    unsubscribe(index) {
        this.handlers.delete(index)
    }

    fire(source, args){
        this.handlers.forEach( handler => {
            handler(source, args)
        })
    }
}

class Person {
    constructor(address, name){
        this.name = name
        this.address = address;
        this.fallsIll = new Event()
    }

    catchCold() {
        this.fallsIll.fire(this, new medicalArgs(this.address))
    }
}

class medicalArgs {
    constructor(address) {
        this.address = address;
    }
}

class Doctor {

}

const simOne = new Person('123 Abc Road', 'Tim');
const sub = simOne.fallsIll.subscribe( (source, args) => {
    console.log(`A Doctor has been called to ${args.address} for ${source.name}`)
})

simOne.catchCold()
//* -> A Doctor has been called to 123 Abc Road for Tim
simOne.catchCold()
//* -> A Doctor has been called to 123 Abc Road for Tim

simOne.fallsIll.unsubscribe(sub)
simOne.catchCold()
//* -> No Output 



//! Property Observers
//! Example Case: Driver's License

class Teen {
    constructor(age) { 
        this._age = age
        this.propertyChanged = new Event()
    }

    get age() { return this._age }
    set age(value) {
        if ( value === null || value === this._age ) return 
        this._age = value
        this.propertyChanged.fire(this, new PropertyChangedArgs('age', value))
    }
}

class PropertyChangedArgs { 
    constructor(propertyName, newValue) {
       this.propertyName = propertyName
       this.newValue = newValue
    }
}

class DMV { 
    constructor(teen) {
        this.teen = teen
        this.token = teen.propertyChanged.subscribe(
            this.ageChanged.bind(this)
        )
    }

    ageChanged(source, args) {
        if( source === this.teen && args.propertyName === 'age') {
            if ( args.newValue < 16 ) console.log(`No driver's license for you!`)
            else {console.log(`Driver's license awarded!`); source.propertyChanged.unsubscribe(this.token)}
        }
    }
}

const newGuy = new Teen('Larry')
const dmv = new DMV(newGuy)

for(let i = 13; i < 19; ++i) {
    console.log(`Larry is now age ${i}`)
    newGuy.age = i
}
/* 
->
Larry is now age 13
No driver's license for you!
Larry is now age 14
No driver's license for you!
Larry is now age 15
No driver's license for you!
Larry is now age 16
Driver's license awarded!
Larry is now age 17
Larry is now age 18
*/