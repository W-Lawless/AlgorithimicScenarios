

//! Memento Pattern
//! Example Case: Bank Account 

class BankAccount {
    constructor(balance = 0) {
        this.balance = balance;
    }

    deposit(amount) {
        this.balance += amount
        return new Memento(this.balance)
    }

    rollbackBalance(memento){
        this.balance = memento.balance
    }

    toString() {
        return `Balance: ${this.balance}`
    }
}

class Memento {
    constructor(balance){
        this.balance = balance
    }
}

const ba = new BankAccount(100);
const memento1 = ba.deposit(20)
const memento2 = ba.deposit(35)

console.log(ba.toString())

ba.rollbackBalance(memento1)
console.log(ba.toString())

ba.rollbackBalance(memento2)
console.log(ba.toString())
