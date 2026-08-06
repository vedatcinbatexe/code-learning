/*
const arr = [10, 20, 30];

const [a, b, c] = arr;

console.log(`a: ${a}, b: ${b}, c: ${c}`);

const [first, , third] = [1, 2, 3];

console.log('first: ', first);
console.log('third: ', third);

const obj = {x: 1, y: 2};
//const {x, y} = obj;

//console.log(x, y);

const {y, x} = obj;
console.log(x, y); // still x = 1 and y = 2

const {x: renamedX} = obj;

console.log(renamedX);

//const {z = 5} = {z: undefined}; // z = 5
//const {z = 5} = {z: null}; // z = null default does NOT fire
//const {z = 5} = {}; // z = 5

const user = {
    name: "Vedat",
    address: {
        city: "Giresun",
        zip: "28000"
    }
}

const { address: { city } } = user;

*/

let x = 1, y = 2;
[x, y] = [y, x];

const [head, ...tail] = [1, 2, 3, 4];
const {a, ...rest} = {a: 1, b: 2, c: 3};

console.log(x, y, head, tail, rest);