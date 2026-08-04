/*
function example() {
    if(true) {
        var a = 'I am var'
        let b = 'I am let'
    }

    console.log(a) // I am var
    // console.log(b) // ReferenceError: b is not defined
}

example()

const name = 'Alice'
// name = 'Bob' // TypeError: Assignment to constant variable.


function example2() {
    for(let i = 0; i < 3; i++) {
        const count = i * 2
    }
    console.log(count) // ReferenceError: count is not defined
}

example2()
 */

{
    let z = 10;
    console.log(typeof z);
}

for (let i = 0; i < 3; i++) {
    setTimeout(() => console.log(i), 1000);
}