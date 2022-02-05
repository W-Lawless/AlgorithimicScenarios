//STRING REVERSAL

const reversedString = str => [...str].reverse().join('')

console.log(reversedString('hello'))

function reverseVerbose(str) {
    //GUARD
    if(!str || str.length < 2 || typeof str !== 'string'){
        return str
    }

    const reversal = []
    const length = str.length - 1 //REMOVE ONE TO MAP LEAD CHARACTER TO ZERO

    //LOOP BACKWARDS UNTIL 0
    for( let i = length; i >= 0; i-- ){
        reversal.push(str[i])
    }

    return reversal.join('') //convert array into type string
}

const consoleOut2 = reverseVerbose('hello') 
console.log(consoleOut2)