

//! Prototype Design Pattern
//! Directory Example


//! Explicit Copying:

// class Person {
//     constructor(name, address) {
//         this.name = name;
//         this.address = address;
//     }
//     deepCopy() {
//         return new Person(this.name, this.address.deepCopy());
//     }

//     toString() {
//         return `${this.name} lives at ${this.address}`;
//     }
// }

// class Address {
//     constructor(street, city, country){
//         this.street = street;
//         this.city = city;
//         this.country = country;
//     }
//     deepCopy() {
//         return new Address(this.street, this.city, this.country);
//     }

//     toString(){
//         return `Address: ${this.street} ${this.city} ${this.country}`
//     }
// }

// const John = new Person('John', new Address('123 Abc Rd', 'London', 'United Kingdom'));
// const Jane = John.deepCopy()

// Jane.name = 'Jane'
// Jane.address.street = '321 Xyz Ln'

// console.log(John.toString());
// console.log(Jane.toString());

//! Serialized Copying 

class Person {
    constructor(name, address) {
        this.name = name;
        this.address = address;
    }
    toString() {
        return `${this.name} lives at ${this.address}`;
    }
    greet() { 
        console.log(`${this.name} says Hi from ${this.address}`);
    }
}

class Address {
    constructor(street, city, country){
        this.street = street;
        this.city = city;
        this.country = country;
    }
    toString(){
        return `Address: ${this.street} ${this.city} ${this.country}`
    }
}

class Serializer {
    constructor(types) {
        this.types = types
    }

    markRx(obj){
        let idx = this.types.findIndex(t => {
            return t.name === obj.constructor.name
        })
        if ( idx !== -1 ) {
            obj['typeIndex'] = idx
            for (let key in obj) {
                if (obj.hasOwnProperty(key) && obj[key] != null) {
                    this.markRx(obj[key])
                }
            }
        }
    }

    reconstructRx(obj) {
        if (obj.hasOwnProperty('typeIndex')) {
            let type = this.types[obj.typeIndex]
            let newObj = new type()
            for (let key in obj) {
                if(obj.hasOwnProperty(key) && obj[key] != null) {
                    newObj[key] = this.reconstructRx(obj[key])
                }
            }
            delete newObj.typeIndex
            return newObj
        }
        return obj
    }

    clone(obj) {
        this.markRx(obj)
        const copy = JSON.parse(JSON.stringify(obj))
        return this.reconstructRx(copy)
    }
}

const John = new Person('John', new Address('123 Abc Rd', 'London', 'United Kingdom'));

//JSON Method , does not copy functions/methods or type Person
// const Jane = JSON.parse(JSON.stringify(John))

const s = new Serializer([Person, Address])
const Jane = s.clone(John)

Jane.name = 'Jane'
Jane.address.street = '321 Xyz Ln'

Jane.greet()
//* -> Jane says Hi from Address: 321 Xyz Ln London United Kingdom


//! Prototype Factory Pattern
//! Employee records example 

class OfficeLocation {
    constructor(suite, addr, city){
        this.suite = suite
        this.addr = addr
        this.city = city
    }
    toString(){
        return `Suite ${this.suite}, Address ${this.addr}, City ${this.city}`
    }
}

class Employee {
    constructor(name, location) {
        this.name = name
        this.location = location
    }
    toString(){
        return `${this.name} works at ${this.location}`
    }
}

class EmployeeFactory {
    static _newEmployee(prototype, name, suite) {
        let copy = EmployeeFactory.serializer.clone(prototype)
        copy.name = name;
        copy.location.suite = suite
        return copy
    }

    static newMainOfficeEmployee(name, suite) {
        return this._newEmployee(EmployeeFactory.main, name, suite)
    }

    static newAuxOfficeEmployee(name, suite) {
        return this._newEmployee(EmployeeFactory.aux, name, suite)
    }
}

EmployeeFactory.serializer = new Serializer([Employee, OfficeLocation])
EmployeeFactory.main = new Employee(null, new OfficeLocation(null, '123 Abc Rd', 'London'))
EmployeeFactory.aux  = new Employee(null, new OfficeLocation(null, '321 Xyz Rd', 'London'))

const Bob = EmployeeFactory.newMainOfficeEmployee('John', '707')
const Stacy = EmployeeFactory.newAuxOfficeEmployee('Stacy', '808')

console.log(Bob.toString())
console.log(Stacy.toString())

//* -> John works at Suite 707, Address 123 Abc Rd, City London
//* -> Stacy works at Suite 808, Address 321 Xyz Rd, City London