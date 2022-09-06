

//! Iterator Pattern:
//! Array Backed Properties
//! Example Case: Game Situation

class Creature {
    constructor() {
        this.stats = new Array(3).fill(10)
    }

    get strength() { return this.stats[0] }
    set strength(value) { this.stats[0] = value }

    get agility() { return this.stats[1] }
    set agility(value) { this.stats[1] = value }

    get intelligence() { return this.stats[2] }
    set intelligence(value) { this.stats[2] = value }

    get sumAttributes() { 
        return this.stats.reduce((a,b) => a+b, 0)
    }    

    get averageAttributes() {
        return this.sumAttributes / this.stats.length
    }

    get maxAttribute(){
        return Math.max(...this.stats)
    }
}

const player1 = new Creature();
player1.agility = 12 
player1.intelligence = 14

console.log(`Player 1 has average stat ${player1.averageAttributes} \n 
             With max attribute ${player1.maxAttribute} \n
             And Sum Attribute Points ${player1.sumAttributes}`)