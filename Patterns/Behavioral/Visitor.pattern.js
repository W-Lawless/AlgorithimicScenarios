
//! Visitor Design Patterns:


//! Intrusive Visitor Pattern
//! Example Case: Arithmetic

class NumberExpression
{
  constructor(value)
  {
    this.value = value;
  }

  print(buffer)
  {
    buffer.push(this.value.toString());
  }

  accept(visitor){
    visitor.visitNumber(this)
  }
}

class AdditionExpression
{
  constructor(left, right)
  {
    this.left = left;
    this.right = right;
  }

  print(buffer)
  {
    buffer.push('(');
    this.left.print(buffer);
    buffer.push('+');
    this.right.print(buffer);
    buffer.push(')');
  }

  accept(visitor){
    visitor.visitAddition(this)
  }
}

// 1 + (2+3)
let e = new AdditionExpression(
  new NumberExpression(1),
  new AdditionExpression(
    new NumberExpression(2),
    new NumberExpression(3)
  )
);

let buffer = [];

//* The buffer is the visitor; ie 'visits' every expression/class and builds a composite output
e.print(buffer);

console.log('*',buffer.join(''));
//* -> * (1+(2+3))

//! Reflective Visitor Pattern 

class ExpressionPrinter {
    print(e, buffer) {
        if(e instanceof NumberExpression) {
            buffer.push(e.value.toString());
        }

        if(e instanceof AdditionExpression) {
            buffer.push('(');
            this.print(e.left, buffer)
            buffer.push('+');
            this.print(e.right, buffer)
            buffer.push(')');
        }
    }
}

let buffer2 = [];

//* Expression Printer is the visitor; evals each class and takes appropiate action
let ep = new ExpressionPrinter()

ep.print(e, buffer2);

console.log('>',buffer2.join(''))
//* -> > (1+(2+3))


//! Classic Visitor Pattern 

class Visitor {
    constructor() { this.buffer = [] }

    visitNumber(e) {}
    visitAddition(e) {}
}

class VisitingPrinter extends Visitor {
    constructor() { super() }
    visitNumber(e) {
        this.buffer.push(e.value.toString());
    }
    visitAddition(e) {
        this.buffer.push('(');
        e.left.accept(this)
        this.buffer.push('+');
        e.right.accept(this)
        this.buffer.push(')');
    }
    toString() {
        return this.buffer.join('')
    }
}

const vp = new VisitingPrinter()
vp.visitAddition(e)

console.log('^',vp.toString())
//* -> ^ (1+(2+3))