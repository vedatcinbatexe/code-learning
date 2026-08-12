let age: number = 30;
let nameexp: string = "Vedat";
let isActive: boolean = true;
let tags: string[] = ["backend", "typescript"];
let coords: [number, number] = [41.0, 28.9];
let anything: any = "escape hatch, avoid this";
let anythingReturned: void = undefined;
let neverHappens: never;

let city = "Istanbul"; // inferred as 'string', no annotation needed
//city = 42; // Error: Type 'number' is not assignable to type 'string'

interface User {
    id: number;
    name: string;
    email: string;
    isAdmin?: boolean;
}

function printUser(user: User): void {
  console.log(`${user.name} (${user.email})`);
}

printUser({ id: 1, name: "Vedat", email: "vedat@gmail.com"});
//printUser({ id: 2, name: "Test"}); // Error: missing property 'email'

type ID = number | string;
type Status = "pending" | "active" | "banned";
type Point = {
    x: number,
    y: number
}

type Comparator<T> = (a: T, b: T) => number;