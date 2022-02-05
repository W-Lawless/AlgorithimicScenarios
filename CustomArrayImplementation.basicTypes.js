//********************************************* */
//********************************************* */

//CUSTOM IMPLEMENTATION OF DEFAULT ARRAY MEMORY STRUCTURE

//********************************************* */
//********************************************* */
//********************************************* */


/*

ARRAYS ARE A FUNDAMENTAL DATA TYPE THAT CREATES A SIMPLE 'BOX' WITHIN MEMORY STRUCTURE

EMPTY ARRAY OF LENGTH 9 

| _ | _ | _ | _ | _ | _ | _ | _ | _ |

POPULATED ARRAY OF LENGTH 3

| 'ABC' | 5 | {} |

ARRAYS ARE WEAKLY TYPED IN JAVASCRIPT AND MAY CONTAIN VARIOUS PRIMITIVES

ARRAYS ARE DYNAMICALLY ALLOCATED IN MEMORY IN JAVASCRIPT BY NODE/V8 


*/


/* FUNDAMENTAL METHODS - 

LOOK-UP (GET)
PUSH
INSERT (SET)
DELETE

*/

    //
//SYNTAX / DEFINITION
    //

const emptyLengthNine = [,,,,,,,,,]
const validArray = ['a','',,[],[],]
    console.log('Empty Array Length',emptyLengthNine.length)

    //
//FUNDAMENTAL NATIVE METHODS
    //

let basicArray = ['a','b','c','d'];
    console.log('\nInit:',basicArray)

//PUSH
//- >           Adds element to end of array

basicArray.push() // O(1) OPERATION
// -> ['a','b','c','d','e']
    console.log('\nAfter push:',basicArray)


//POP 
//- >           Removes last element from array

basicArray.pop() // O(1) OPERATION
// -> ['a','b','c','d']
    console.log('After pop:',basicArray)

//UNSHIFT 

basicArray.unshift('A') // O(n) OPERATION
// -> ['A','a','b','c','d']
    console.log('\nAfter unshift:',basicArray)

//SHIFT

basicArray.shift() // O(n) OPERATION
//-> [ 'b', 'c', 'd' ]
    console.log('After shift:',basicArray);


//SPLICE

basicArray = ['a','b','c','d','e','f','g']

basicArray.splice(1,5,'over-written') //O(n) OPERATION
//-> [ 'a', 'over-written', 'g' ]
    console.log('\nAfter splice:',basicArray);



/* CUSTOM IMPLEMENTATION - 
*/

class CustomArray {
    constructor(){
        this.length = 0;
        this.data = {}
    }

    //ACCESS
    get(index){
        return this.data[index]
    } // O(1)

    //APPEND TO END OF ARRAY
    push(item){
        //set the data for key 0 equal to item
        this.data[this.length] = item  
        //increment length to 1
        this.length++
    }  // O(1)

    //REMOVE FROM END OF ARRAY
    pop(){ 
        delete this.data[this.length-1]  
        this.length--
    } // O(1)

    //REMOVE INDEX WITHIN ARRAY
    delete(index){
        // const target = this.data[index]
        this.shift(index)
    } //O(N)

    //RE-ORDER INDEXES
    shift(index){
        for( let i = index; i < this.length-1; i++){
            //UPDATE EXISTING MEMORY WITH VALUE NEXT IN LINE
            this.data[i] = this.data[i+1]
        }
        //REMOVE PRIOR ENDING VALUE
        delete this.data[this.length-1]
        this.length--
    } // O(N)
}

const customArray = new CustomArray();

customArray.push('abc')
customArray.push('def')
customArray.push('ghi')
console.log('\n ::',customArray)

customArray.pop()
customArray.delete(0)
console.log('\n ::',customArray)


