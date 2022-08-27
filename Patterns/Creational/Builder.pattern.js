
//! Builder designer pattern example:: 
//! HTML Tree 

//* Basic
const hello = 'hello';
let html = [];

html.push('<p>')
html.push(hello)
html.push('<p>')

console.log(html.join(''));
//* -> <p>hello</p>



//* More complex:

const words = ['hello', 'world'];
html = []; //? Empty array
html.push('<ul>\n')
for (let word of words)
    html.push(`    <li>${word}</li>\n`);
html.push('</ul>');

console.log(html.join(''));
//* ->
//* <ul>
//*     <li>hello</li>
//*     <li>world</li>
//* </ul>


//* BUILDER PATTERN: 

class Element {
    constructor(name='', text='') {
        this.name = name
        this.text = text
        this.children = []
    }
    static get indentSize() { return 2; }
    toString() {
        return this.toStringImpl(0)
    }
    toStringImpl(indent) {
        let html = []
        let i = ' '.repeat(indent * Element.indentSize)
        html.push(`${i}<${this.name}>\n`)
        if(this.text.length > 0) { 
            html.push(' '.repeat(Element.indentSize * (indent+1)))
            html.push(this.text)
            html.push('\n')
        }
        for (let child of this.children){
            html.push(child.toStringImpl(indent+1))
        }
        html.push(`${i}</${this.name}>\n`)
        return html.join('')
    }
}

class HtmlTreeBuilder {
    constructor(rootName) {
        this.root = new Element(rootName)
        this.rootName = rootName
    }
    addChild(childName, childText) {
        let child = new Element(childName, childText)
        this.root.children.push(child)
    }
    addChildFluent(childName, childText) {
        let child = new Element(childName, childText)
        this.root.children.push(child)
        return this
    }
    toString() {
        return this.root.toString();
    }
    build() {
        return this.root
    }
    clear() {
        this.root = new Element(this.rootName)
    }

}

//! Builder
let builder = new HtmlTreeBuilder('ul')
for (let word of words) builder.addChild('li', word)

console.log(builder.build().toString())

/* 
//* ->
//* <ul>
//*   <li>
//*     hello
//*   </li>
//*   <li>
//*     world
//*   </li>
//* </ul> 
*/

builder.clear()

builder.addChildFluent('li', 'hi')
       .addChildFluent('li', 'planet')
       //return builder in chain

console.log(builder.toString())

/* 
//* ->
//* <ul>
//*   <li>
//*     hello
//*   </li>
//*   <li>
//*     world
//*   </li>
//* </ul> 
*/

//!: Faceted Builder


//* Base node 
class Person {
    constructor() {
        //Address 
        this.streetAddress = 
            this.postCode = 
                this.city = ''
        
        //Employment
        this.companyName = 
            this.position = ''
        this.annualIncome = 0
    }
    toString() {
        return `Person lives at ${this.streetAddress}, ${this.city}, ${this.postCode} \n`
        + `and works at ${this.companyName} as a ${this.position} earning ${this.annualIncome}`
    }
}

//* Top-level builder
class PersonBuilder {
    constructor(person = new Person()) {
        this.person = person
    }
    get lives() {
        return new PersonAddressBuilder(this.person)
    }
    get works() {
        return new PersonJobBuilder(this.person)
    }
    build() {
        return this.person
    }
}


//* Faceted Builder
class PersonJobBuilder extends PersonBuilder {
    constructor(person) {
        super(person);
    }
    at(companyName) {
        this.person.companyName = companyName
        return this
    }
    asA(position) {
        this.person.position = position
        return this
    }
    earning(annualIncome) {
        this.person.annualIncome = annualIncome
        return this
    }
}


//* Faceted Builder
class PersonAddressBuilder extends PersonBuilder {
    constructor(person) {
        super(person)
    }
    at(streetAddress) {
        this.person.streetAddress = streetAddress
        return this
    }
    withPostCode(postCode) {
        this.person.postCode = postCode
        return this
    }
    in(city){
        this.person.city = city
        return this
    }
}

//* Implementation

let pb = new PersonBuilder()
let person = pb
    .lives.at('123 Abc Road').in('Narnia').withPostCode('77777')
    .works.at('NodeJS').asA('Engineer').earning('123,000')
    .build()

console.log(person.toString())
//* -> Person lives at 123 Abc Road, Narnia, 77777 
//*    and works at NodeJS as a Engineer earning 123,000