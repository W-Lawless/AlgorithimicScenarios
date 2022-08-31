

//! Flyweight pattern
//! Example case: text formating


class TextFormatter {
    constructor(text) {
        this.text = text;
        this.caps = new Array(text.length).map(() => false)
    }

    capitalize(start, end) {
        for (let i = start; i < end; i++) {
            this.caps[i] = true
        }
    }

    toString() {
        let buffer = [];
        for (let i in this.text){
            let c = this.text[i]
            buffer.push( this.caps[i] ? c.toUpperCase() : c )
        }
        return buffer.join('')
    }
}

const text = 'hello world this is my input, wow, so amazing!'
const formatted = new TextFormatter(text)

formatted.capitalize(5,15)

//* -> hello worlD THIS IS MY INput, wow, so amazing!

console.log(formatted.toString())


//! *** Flyweight pattern:
//! Reduces space complexity by storing the range of the 
//! formatted numbers vs a boolean flag for each individual character

class FlyweightFormatter {
    constructor(text) {
        this.text = text
        this.formatting = []
    }

    getRange(start, end) {
        let range = new TextRange(start, end)
        this.formatting.push(range);
        return range
    }

    toString() {
        let buffer = [];
        for (let i in this.text) {
            let c = this.text[i]
            for(let range of this.formatting) {
                if (range.covers(i) && range.capitalize) c = c.toUpperCase()
            }
            buffer.push(c)
        }
        return buffer.join('')
    }
}

class TextRange {
    constructor(start, end) {
        this.start = start
        this.end = end
        this.capitalize = false
    }

    covers(position) {
        return position >= this.start && position <= this.end
    }
}

const bft = new FlyweightFormatter(text)
bft.getRange(15,30).capitalize = true 

console.log(bft.toString())