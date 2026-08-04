/*
    Two categories of values in JS
    - Javascript has two kinds of data types
    - Primitive types:
        - string
        - number
        - boolean
        - null
        - undefined
        - symbol
        - bigint
    
    - Reference types:
        - object
        - array
        - function

    The difference that actually matters: primitives are copied by value
    reference types are copied by reference
*/



/*
let a = 5;
let b = a; // copy by value
b = 10;

console.log(a); // 5
console.log(b); // 10

let obj1 = { count: 5};
let obj2 = obj1; // copy by reference
obj2.count = 10;

console.log(obj1.count); // 10
console.log(obj2.count); // 10

let arr1 = [1, 2, 3];
let arr2 = arr1;
arr2.push(4);

console.log(arr1); // [1, 2, 3, 4]
console.log(arr2); // [1, 2, 3, 4] */


/*
let arr1 = [1, 2, 3];
let arr2 = arr1;

arr2 = [9, 9, 9]; // reassignment, not mutation

console.log(arr1); // [1, 2, 3]
console.log(arr2); // [9, 9, 9]

let obj1 = { name: 'Alice' };
let obj2 = obj1;

obj1 = { name: 'Bob' }; // reassignment, not mutation

console.log(obj1); // { name: 'Bob' }
console.log(obj2); // { name: 'Alice' } */

console.log(1 === 1); // true
console.log(1 === '1'); // false
console.log(1 == '1'); // true

console.log("-----------------------------");

console.log(0 == false);
console.log('' == false);
console.log(null == undefined);
console.log(null === undefined);
console.log(NaN == NaN);