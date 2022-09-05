

//! Interpreter Pattern 
//! Example Case: Simple Math Expressions 

//* Enumeration Tables
const TokenType = Object.freeze({
    integer: 0,
    plus: 1,
    minus: 2,
    Lparen: 3,
    Rparen: 4
})

const Operation = Object.freeze({
    addition: 5,
    subtraction: 6
})

//* Token Type

class Token {
    constructor(type, text){
        this.type = type
        this.text = text
    }

    toString() {
        return ` \`${this.text}\` `
    }
}

//* Token Type Definitions 

class Integer {
    constructor(value){
        this.value = value
    }
}


class BinaryOperation
{
  constructor()
  {
    this.type = null;
    this.left = null;
    this.right = null;
  }

  get value()
  {
    switch (this.type)
    {
      case Operation.addition:
        return this.left.value + this.right.value;
      case Operation.subtraction:
        return this.left.value - this.right.value;
    }
    return 0;
  }
}

//* Lexing Function

const lex = input => {
    let result = []
    
    for(let i = 0; i < input.length; i++) {
        switch(input[i]) {
            case '+':
                result.push(new Token(TokenType.plus, '+'))
                break;
            case '-':
                result.push(new Token(TokenType.minus, '-'))
                break;
            case '(':
                result.push(new Token(TokenType.Lparen, '('))
                break;
            case ')':
                result.push(new Token(TokenType.Rparen, ')'))
                break;     
            default:
                let buffer = [input[i]]
                for(let j = i + 1; j < input.length; j++) {
                    if('0123456789'.includes(input[j])) {
                        buffer.push(input[j])
                        i++
                    } else {
                        result.push(new Token(TokenType.integer, buffer.join('')))
                        break;
                    }
                }
                break;
        }
    }
    return result
}

//* Parsing Function

function parse(tokens)
{
  let result = new BinaryOperation();
  let haveLHS = false;

  for (let i = 0; i < tokens.length; ++i) {
    let token = tokens[i];

    switch (token.type) {
      case TokenType.integer:
        let integer = new Integer(parseInt(token.text));
        if (!haveLHS) {
          result.left = integer;
          haveLHS = true;
        } else {
          result.right = integer;
        }
        break;
      case TokenType.plus:
        result.type = Operation.addition;
        break;
      case TokenType.minus:
        result.type = Operation.subtraction;
        break;
      case TokenType.Lparen:
        let j = i;
        for (; j < tokens.length; ++j)
          if (tokens[j].type === TokenType.Rparen)
            break; // found it!
        // process subexpression
        let subexpression = tokens.slice(i + 1, j);
        let element = parse(subexpression);
        if (!haveLHS) {
          result.left = element;
          haveLHS = true;
        } else result.right = element;
        i = j; // advance
        break;
    }
  }
  return result;
}

const input = '(13+4)-(12+1)'
const tokens = lex(input)

console.log(tokens.join(''))

const parsed = parse(tokens)
console.log(`${input} = ${parsed.value}`)
