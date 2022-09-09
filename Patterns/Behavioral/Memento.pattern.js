

//! Memento (Snapshot) Pattern
//! Example Case: Bank Account 

class BankAccount {
    constructor(balance = 0) {
        this.balance = balance;
        this.changes = [new Memento(balance)]
        this.current = 0
    }

    deposit(amount) {
        this.balance += amount
        const m = new Memento(this.balance)
        this.changes.push(m)
        this.current++
        return m
    }

    rollbackBalance(memento){
        if(memento) {
            this.balance = memento.balance 
            this.changes.push(memento)
            this.current = this.changes.count - 1
        }
    }

    undo() { 
        if (this.current > 0) {
            let memento = this.changes[--this.current]
            this.balance = memento.balance
            return memento
        }
        return null
    }

    redo() {
        if(this.current + 1 < this.changes.length) {
            let memento = this.changes[++this.current]
            this.balance = memento.balance
            return memento
        }
        return null
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
//* -> Balance: 155

// ba.rollbackBalance(memento1)
// console.log(ba.toString())
// //* -> Balance: 120

// ba.rollbackBalance(memento2)
// console.log(ba.toString())
// //* -> Balance: 155

ba.undo()
console.log('Undo 1',ba.toString())
//* -> Undo 1 Balance: 120

ba.undo()
console.log('Undo 2',ba.toString())
//* -> Undo 2 Balance: 100

ba.redo()
console.log('Redo 1',ba.toString())
//* -> Redo 1 Balance: 120
