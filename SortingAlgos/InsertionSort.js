let item = [5,1,3,2,0,88,22,17]

const bubbleSort = (arg) => {
    let d = arg.length
    let ins, temp;

    for(let i = 0; i < d; i++) {
        ins = i
        temp = arg[i]
        if(arg[i] > arg[i + 1])  { 
            arg[i] = arg[i + 1]
            arg[i + 1] = temp
        }
    }
    return arg
}

const insertionSort = (arg) => {
    let d = arg.length
    let ins, temp;
    let out = []

    for(let i = 0; i < d; i++) {
        
        if(arg[i] > arg[i + 1])  { 
            out.push(arg[i])
        } else if (arg[i] < arg[i + 1]) {
            out.unshift(arg[i])
        }
    }
    
    return out
}

function insertionSort(array) {
    const length = array.length;
      for (let i = 0; i < length; i++) {
          if (array[i] < array[0]) {
        //move number to the first position
        array.unshift(array.splice(i,1)[0]);
      } else {
        // only sort number smaller than number on the left of it. This is the part of insertion sort that makes it fast if the array is almost sorted.
        if (array[i] < array[i-1]) {
          //find where number should go
          for (var j = 1; j < i; j++) {
            if (array[i] >= array[j-1] && array[i] < array[j]) {
              //move number to the right spot
              array.splice(j,0,array.splice(i,1)[0]);
            }
          }
        }
      }
      }
  }
  
  insertionSort(numbers);
  console.log(numbers);


console.log(item)
console.log(insertionSort(item))