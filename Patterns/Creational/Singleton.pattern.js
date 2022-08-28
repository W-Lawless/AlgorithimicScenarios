

//! Singleton Pattern

class Singleton {
    constructor(value) {
        const instance = this.constructor.instance
        if(instance) return instance

        this.constructor.instance = this
        this.constructor.instance.value = value
    }
}

const s1 = new Singleton('Hello World')
const s2 = new Singleton()

s1.value = 'Hi Planet'

console.log(s2.value)
//* -> Hi Planet


//! Monostate Pattern

class UniqueObject {
    get privateData() { return UniqueObject._privateData }
    set privateData(value) { UniqueObject._privateData = value }

    get privateVar() { return UniqueObject._privateVar }
    set privateVar(value) { UniqueObject._privateVar = value }

    toString() { return `Private Data is ${this.privateData}\nPrivate Var is ${this.privateVar}\n`}
}

// UniqueObject._privateData = undefined
// UniqueObject._privateVar = undefined

let myObj = new UniqueObject()
myObj.privateData = 'HEX0001'
myObj.privateVar = 'CONSTANT_STRING'

let myObj2 = new UniqueObject()
myObj2.privateData = 'HEX777002'
myObj2.privateVar = 'URI_STRING'

console.log(myObj.toString())
console.log(myObj2.toString())

//* ->
//* Private Data is HEX777002
//* Private Var is URI_STRING

//* Private Data is HEX777002
//* Private Var is URI_STRING