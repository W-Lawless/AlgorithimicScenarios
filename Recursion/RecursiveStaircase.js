// There's a staircase with N steps, and you can climb 1 or 2 steps at a time. 
//Given N, write a function that returns the number of unique ways you can climb the staircase.
// The order of the steps matters.

// For example, if N is 4, then there are 5 unique ways:

// 1, 1, 1, 1
// 2, 1, 1
// 1, 2, 1
// 1, 1, 2
// 2, 2

// What if, instead of being able to climb 1 or 2 steps at a time, you could climb any number from a set of positive integers X? 
//For example, if X = {1, 3, 5}, you could climb 1, 3, or 5 steps at a time. 
//Generalize your function to take in X.

class Node {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
}

class Tree {
    constructor() {
        this.root = null
    }
    insert(value) {
        const nodeToInsert = new Node(value)
        
        if (this.root === null) this.root = nodeToInsert
        else this.insertNode(this.root, nodeToInsert)
    }
    insertNode(parent, child) {
        if (child.value < parent.value) {
            if(parent.left === null){ 
                parent.left = child 
            }
            else this.insertNode(node.left, child)
        }
        if (child.value > parent.value) {
            if (parent.right === null) {
                 parent.right = child 
            }
            else this.insertNode(node.right, child)
        }
    }
}

const recursiveStaircaseArrayOut = (n, x) => {

    let solutions = {}
    let solutionsFound = {}
    let memo = {}
    let solutionCount = 0

        for(let i = 0; i < x.length; i++) {
        //     console.log('Loop begin', i)

            const subtrahend =x[i]
            // console.log('Subtrahend', subtrahend)

            recursiveSubtraction(n, subtrahend)

            let remainingSteps = n - subtrahend
            
            if(remainingSteps > 0) {
                // solutionCount++ 
                // console.log('still remaining steps')
                x.forEach((val, i) => {
                    if(val === subtrahend) { return }
                    if(solutionsFound[val]) { return }

                    if(n - val > 0) { 
                        recursiveSubtraction(remainingSteps, val)
                    }
                })
            }
            

        }

        function recursiveSubtraction (n ,subtrahend) {
            console.log('rx entered - - - n:',n,'   subtrahend:',subtrahend)
            if (n - subtrahend < 0) { return }

            if (n - subtrahend === 0) {
                console.log('Rx Exited', solutionCount, '\n', solutions, '\n\n')
                if(solutions[solutionCount]){ 
                    solutions[solutionCount].push(subtrahend) 
                } else {
                    solutions[solutionCount] = new Array()
                    solutions[solutionCount].push(subtrahend)
                }
                    
                solutionCount++
                return
            }

            console.log('Solution #: ', solutionCount,' \n Difference:', n - subtrahend)
            
            solutions[solutionCount] 
            ? solutions[solutionCount].push(subtrahend) 
            : solutions[solutionCount] = new Array(1).fill(subtrahend)
            
            console.log('Current solution array: ', solutions[solutionCount])
            
            // x.forEach((val, i) => {
            //     if(val === subtrahend) { return }
            //     if(n - val > 0) { 
            //         console.log('For Each loop', val)
            //         const newRoot = n - val
            //         solutionCount++
            //         recursiveSubtraction(newRoot, val)
            //         // const existingSubtrahends = [...solutions[solutionCount]]
            //         // console.log('existing:', existingSubtrahends)
            //         // solutionCount++
            //         // solutions[solutionCount] = existingSubtrahends
            //         // solutions[solutionCount].push(val)
            //         // console.log('>>>',solutions)
            //     }
            // })

            // console.log(solutions)
            
            const nextPass = n - subtrahend
            memo[n] = solutions[solutionCount]

            recursiveSubtraction(nextPass, subtrahend)
        }
    
    return solutions
}

const recursiveStaircaseTreeOut = (n, x) => {

    let solutions = {}
    let memo = {}

        for(let i = 0; i <= x.length - 1; i++) {
        //     console.log('Loop begin', i)

            const subtrahend =x[i]
            console.log('Subtrahend', subtrahend, i)

            recursiveSubtraction(n, subtrahend, i)

        }

        function recursiveSubtraction (n ,subtrahend, index) {
            if (n - subtrahend < 0) { return }

            if (n - subtrahend === 0) {
                console.log('solution count', index, '\n', solutions, '\n\n')
                solutions[index].insert(subtrahend) 
                return
            }

   
            solutions[index] 
                ? solutions[index].insert(subtrahend) 
                : solutions[index] = new Tree(subtrahend)

            x.forEach((val, i) => {
                if(val === subtrahend) { return }
                if(n - val > 0) { 
                    solutions[index].insert(val)
                }
            })

            // console.log(solutions)
            
            const nextPass = n - subtrahend

            recursiveSubtraction(nextPass, subtrahend, index)
        }
    
    return solutions
}

const recursiveStaircase = (n, x) => {

    let solutions = {}
    let solutionsFound = {}
    let memo = {}
    let solutionCount = 0

        for(let i = 0; i < x.length; i++) {
        //     console.log('Loop begin', i)

            const subtrahend =x[i]
            // console.log('Subtrahend', subtrahend)

            recursiveSubtraction(n, subtrahend)
            solutionsFound[subtrahend] = true

            let remainingSteps = n - subtrahend

            if(remainingSteps > 0) {
                // solutionCount++ 
                // console.log('still remaining steps')
                x.forEach((val, i) => {
                    if(val === subtrahend) { return }
                    if(solutionsFound[val]) { return }

                    if(n - val > 0) { 
                        recursiveSubtraction(remainingSteps, val)
                    }
                })
            }

        }

        function recursiveSubtraction (n ,subtrahend) {
            console.log('rx entered - - - n:',n,'   subtrahend:',subtrahend)

            const id = `${n} - ${subtrahend}`
            if (solutions[id]) { 
                console.log('already solved')
                return 
            }

            if (n - subtrahend < 0) { return }

            if (n - subtrahend === 0) {
                solutions[id] 
                ? solutions[id].push(subtrahend) 
                : solutions[id] = new Array(1).fill(subtrahend)
                console.log('Rx Exited', id, '\n', solutions, '\n\n')
                return
            }

            console.log('Solution #: ', id,' \n Difference:', n - subtrahend)
            
            solutions[id] 
            ? solutions[id].push(subtrahend) 
            : solutions[id] = new Array(1).fill(subtrahend)
            
            console.log('Current subtrahend array: ', solutions[id])
            
            const nextPass = n - subtrahend
            memo[id] = solutions[id]

            recursiveSubtraction(nextPass, subtrahend)
        }
    
    return solutions


}


// const out = recursiveStaircaseArrayOut(4,[1,2])

// console.log(out)




const recursiveStaircaseFib = (n, x) => {
    let memo = {}

    function rx (n){
        let value 
        if (n in memo) { value = memo[n] }
        else { 
            if(n  === 0 || n === 1) value = 1
            else value = rx(n-1) + rx(n-2)
            memo[n] = value
        }
        return value
    }
    // let result 
    // for (val in x) {
    //     result += rx(val-1)
    // }

    return rx(n)
}

const iterativeStaircase = (n) => {
    let steps = new Array(n ? n+1 : 1).fill(0)
    
    steps[0] = 1
    steps[1] = 1

    for(let i = 2; i < n+1; i++) {
        steps[i] = steps[i-1] + steps[i-2]
    }

    return steps[steps.length-1]
}

const slidingWindowStaircase = (n) => {

}

console.log(recursiveStaircaseFib(5))