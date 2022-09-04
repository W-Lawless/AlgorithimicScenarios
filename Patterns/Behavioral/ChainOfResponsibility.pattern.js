

//! Chain of Responsibility Pattern 
//! Example: Game 

class Creature { 
    constructor(name, attack, defense) {
        this.name = name;
        this.attack = attack;
        this.defense = defense;
    }

    toString() { return `${this.name} (${this.attack} / ${this.defense})` }
}

class CreatureModifier {
    constructor(creature) {
        this.creature = creature
        this.next = null; //Modifier chain, linked list data structure
    }

    add(modifier) {
        if(this.next) this.next.add(modifier);
        else this.next = modifier
    }

    handle() { 
        if (this.next) this.next.handle();
    }
}

class MagicItem extends CreatureModifier {
    constructor(creature) {
        super(creature);
    }

    handle() {
        console.log(`Double ${this.creature.name}'s attack with Amulet`)
        this.creature.attack *= 2
        super.handle()
    }
}

class MagicPotion extends CreatureModifier {
    constructor(creature) {
        super(creature);
    }
    handle(){
        console.log(`Doubling ${this.creature.name}'s defense with Potion`)
        this.creature.defense *= 2
        super.handle()
    }
}

class DeBuff extends CreatureModifier {
    constructor(creature) {
        super(creature);
    }
    handle() {
        console.log(`${this.creature.name} debuffed!`)
    }
}

let goblin = new Creature('Goblin', 1, 1)
console.log(goblin.toString())
//* -> Goblin (1 / 1)

//* Begin method Chain 
let baseClass = new CreatureModifier(goblin)

//* Break method chain
// baseClass.add(new DeBuff(goblin))
//* -> Goblin Debuffed!

baseClass.add(new MagicItem(goblin))
//* -> Double Goblin's attack with Amulet

//* Break method chain
baseClass.add(new DeBuff(goblin))
//* -> Goblin Debuffed!

baseClass.add(new MagicItem(goblin))
//* -> Double Goblin's attack with Amulet

baseClass.add(new MagicPotion(goblin))
//* -> Doubling Goblin's defense with Potion

//* Call method chain
baseClass.handle()

console.log(goblin.toString())
//* -> Goblin (4 / 2)