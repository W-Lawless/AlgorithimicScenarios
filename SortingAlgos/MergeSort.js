//MERGE SORTED ARRAYS 

const merge = (a,b) => {
    //GUARD
    if (a.length === 0) { return b }
    if (b.length === 0) { return a }

    const merged = []

    //First array values
    let a1 = a[0]
    let b1 = b[0]

    //Increment value
    let i = 1
    let j = 1

    //While either pointer has value, compare a < b, move pointer reference and increment index
    while (a1 || b1){
        
        if (!b1 || a1 < b1) { 
            merged.push(a1); 
            a1 = a[i];  
            i++ 
            
        } else {
            merged.push(b1); 
            b1 = b[j];  
            j++ 
        }

    }

    //Return
    return merged
}


const output = merge([0,3,4,31],[4,6,30])

console.log(output)
