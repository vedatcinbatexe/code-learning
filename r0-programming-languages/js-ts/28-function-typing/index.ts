function add(a: number, b: number): number {
    return a + b;
}

add(2,3); // true
//add(2, "3");       // Error: Argument of type 'string' is not assignable to parameter of type 'number'


function badAdd(a: number, b: number) {   // no return annotation
  if (a < 0) return "invalid";             // TS infers return type as `number | string`
  return a + b;
}

// no error here, but now every caller has to handle a string that "shouldn't" exist

function greet(name: string, greeting?: string): string {
    return `${greeting ?? "Hello"}, ${name}!`;
}

greet("Vedat"); // "Hello, Vedat!"
greet("Vedat", "Hey"); // "Hey, Vedat!"

//Hard rule: optional parameters must come after required ones. This isn't a style suggestion, it's enforced by the compiler:
// A required parameter cannot follow an optional parameter.ts(1016)
/*
function bad(greeting?: string, name: string) {

}
*/

function greetWithDefault(name: string, greeting = "Hello"): string {
  return `${greeting}, ${name}!`;
}

greetWithDefault("Vedat");             // "Hello, Vedat!"
greetWithDefault("Vedat", "Hey");      // "Hey, Vedat!"

function withOptional(x?: number) {
  console.log(x);   // type is `number | undefined` — you must guard before using it numerically
}

function withDefault(x: number = 10) {
  console.log(x);   // type is just `number` — TS knows it's never undefined by this point
}

withDefault(null as any);   // would print `null`, not `10` — default only kicks in for undefined

function sum(...nums: number[]): number {
    return nums.reduce((acc, n) => acc + n, 0);
}

sum(1,2,3,4); // 10

function parseInput(value: string): string[];
function parseInput(value: number): number[];
function parseInput(value: string | number): string[] | number[] {
  if (typeof value === "string") {
    return value.split(",");
  }
  return [value, value * 2, value * 3];
}

//const a = parseInput("a,b,c");   // TS knows: string[]
//const b = parseInput(5);          // TS knows: number[]

// without overloads — every caller deals with the union, even when it's unnecessary
/*
function parseInputNoOverload(value: string | number): string[] | number[] {
  
}
*/
//const result = parseInputNoOverload("a,b,c");
//result.push(5);   // Error — TS doesn't know if this is string[] or number[], so .push's arg type is ambiguous

