
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