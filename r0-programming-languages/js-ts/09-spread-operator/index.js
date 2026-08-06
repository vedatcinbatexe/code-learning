// Array spread
/*
const a = [1, 2, 3];
const b = [...a, 4, 5]; // [1,2,3,4,5]
const c = [0, ...a]; // [0,1,2,3]
const combined = [...a, ...b]; // concatenation */


/*
const s = "abc";
console.log([...s]); // ['a', 'b', 'c']

const obj = { x: 1, y: 2 };
const copy = { ...obj };
const merged = { ...obj, z: 3 };
const overridden = { ...obj, x: 99 }; // later keys win: { x: 99, y: 2 }
*/

// Primitives copied by value, objects/arrays copied by reference

const user = {
    name: "Vedat",
    address: { city: "Giresun"}
};

const copy = { ...user };
copy.name = 'Someone Else'; // fine, doesn't touch user
copy.address.city = "Istanbul"; // MUTATES user.address too;

// When we need deep copy of object: structuredClone
const deepCopy = structuredClone(user);

console.log(user);
console.log(copy);

// REST — collecting, left side / parameter position
const [first, ...others] = [1, 2, 3];   // others = [2, 3]
function sum(...nums) { }                // nums = array of all args passed
const { a, ...rest } = { a: 1, b: 2 };  // rest = { b: 2 }

// SPREAD — expanding, right side / value position
const arr = [...others, 99];             // expand others into this array
console.log(Math.max(...nums));          // expand array into individual args
const merged = { ...rest, c: 3 };        // expand rest into this object


function log(...args) {        // rest: gather all call args into `args`
  console.log(...args);        // spread: unpack `args` back into individual arguments
}