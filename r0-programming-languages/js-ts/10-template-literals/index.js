/*
const name = "Vedat";
const greeting = `Hello, ${name}!`;      // interpolation
const multiline = `line1
line2`;                                   // real newlines, no \n needed


// Anything inside ${} is a full JS expression, evaluated and coerced to a string: 
const condition = 10;
const user = {
    name: "Vedat",
    address: { city: "Giresun" }
}

console.log(`Result ${1 + 2}`);
console.log(`${condition ? "yes" : "no"}`);
console.log(`${user.address.city}`);

console.log(`${{a: 1}}`);
console.log(`${[1, 2, 3]}`); // "1,2,3" — Array.prototype.toString joins with commas

class Point {
    constructor(x, y) {this.x = x; this.y = y}
    toString() { return `(${this.x}, ${this.y})` }
}

console.log(`${new Point(1, 2)}`);
*/

/*
function tag(strings, ...values) {
    console.group(strings);
    console.log(values);
}

const name = "Vedat";
const age = 30;

tag`Hello ${name}, you are ${age} years old.`;

*/

// Output:
//strings = ["Hello ", ", you are ", " years old"]
//values = ["Vedat", 30]


function tag(strings, ...values) {
  return strings.reduce((result, str, i) => 
    result + str + (values[i] !== undefined ? values[i] : ''), '');
}

const name = "Vedat";
const age = 30;

tag`Hello ${name}, you are ${age} years old.`;

console.log(`Line1\nLine2`);       // actual newline
console.log(String.raw`Line1\nLine2`); // literal "Line1\nLine2" text
