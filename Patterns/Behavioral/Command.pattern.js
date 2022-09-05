

//! Command Pattern
//! Example case: Bank Account 


class BankAccount {
    constructor(balance = 0){
        this.balance = balance
    }

    static overdraftLimit = -500

    deposit(amount) {
        this.balance += amount
        console.log(`Deposited ${amount}. Updated balance: ${this.balance}`)
    }

    withdraw(amount){
        if(this.balance - amount >= BankAccount.overdraftLimit) {
            this.balance -= amount
            console.log(`Withdrew ${amount}. Updated balance: ${this.balance}`)
            return true
        }
        return false
    }

    toString(){
        return `Balance: ${this.balance}`
    }
}

//* Enumeration Values
const EventActions = Object.freeze({
    deposit: 1,
    withdraw: 2
})

//* Command Pattern: Event Bus Class
class BankAccountEventBus {
    constructor(account, action, amount){
        this.account = account
        this.action = action
        this.amount = amount
        this.success = false
    }

    call() {
        switch(this.action){
            case EventActions.deposit:
                this.account.deposit(this.amount)
                this.success = true
                break;
            case EventActions.withdraw:
                this.success = this.account.withdraw(this.amount)
                break;
        }
    }

    undo() {
        if(!this.success) return
        switch(this.action){
            case EventActions.deposit:
                this.account.withdraw(this.amount)
                break;
            case EventActions.withdraw:
                this.account.deposit(this.amount)
                break;
        }
    }
}

const checking = new BankAccount(100)
const command = new BankAccountEventBus(checking, EventActions.deposit, 50)
command.call()
command.undo()

console.log(checking.toString())