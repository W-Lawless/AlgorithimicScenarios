let item = [5,1,2,3,0,88,11,17]

const selectionSort = (arg) => {
    let d = arg.length 
    let sel;
    for (let i = 0; i < d; i++) {
        if (sel === undefined) { sel = arg[i] }
        for(let j = 0; j < d; j++) {
            if (sel > arg[j]) {
                sel = arg[j]
                arg[j] = arg[i]
                arg[i] = sel
            }
        }
    }
    return arg
}

const selectionSort2 = (arg) => {
    let d = arg.length 
    let sel, temp;

    for (let i = 0; i < d; i++) {

        sel = i
        temp = arg[i]

        for(let j = i + 1; j < d; j++) {
            if (arg[j] < arg[sel]) {
                sel = j
            }
        }

        arg[i] = arg[sel]
        arg[sel] = temp
    }
    return arg
}


console.log(selectionSort(item))
console.log(selectionSort2(item))