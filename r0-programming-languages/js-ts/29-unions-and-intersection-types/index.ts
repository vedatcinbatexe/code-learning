type ID = number | string;

function printId(id: ID) {
    console.log(id);
}

printId(101); // fine
printId("abc-101"); // fine
//printId(true); // Error: 'boolean' is not assignable to type 'ID'


function printLength(id: ID) {
    if (typeof id === "string") {
        console.log(id.length); // fine -- narrowed to string here
    }else {
        console.log(id.toFixed(0)); // fine -- narrowed to number here
    }
}

interface Circle {
    kind: "circle";
    radius: number;
}

interface Square {
    kind: "square";
    sideLength: number;
}

/*
function getArea(shape: Circle | Square) {
  console.log(shape.radius);
  // Error: Property 'radius' does not exist on type 'Circle | Square'.
  //   Property 'radius' does not exist on type 'Square'.
}
*/

function getArea(shape: Circle | Square) {
    if(shape.kind === "circle") {
        return Math.PI * shape.radius ** 2; // TS narrows to Circle here
    }

    return shape.sideLength ** 2; // TS narrows to Square here
}

// INTERSECTIONS

interface HasName {
    name: string;
}

interface HasAge {
    age: number;
}

type Person = HasName & HasAge;

const p: Person = {
    name: "Vedat",
    age: 25
}; // must satisfy BOTH shapes

//const bad: Person = { name: "Vedat"}
// Error: Property 'age' is missing in type '{ name: string; }' but required in type 'Person'

type A = { x: number };
type B = { x: string };

type AB = A & B; // x must be number AND string simultaneously -> collapses to 'never'

//const val: AB = { x: 5 }; // Type 'number' is not assignable to type 'never'.

interface Timestamped {
  createdAt: Date;
}

interface Loggable {
  log(): void;
}

// intersection: an object that's BOTH timestamped AND loggable
type AuditableEvent = Timestamped & Loggable;

// union: a function parameter that accepts EITHER a raw string OR an already-parsed Date
function formatDate(input: string | Date): string {
  const date = typeof input === "string" ? new Date(input) : input;
  return date.toISOString();
}

interface Admin {
  role: "admin";
  permissions: string[];
}

interface Guest {
  role: "guest";
}

type AppUser = Admin | Guest;

/*
function describeUser(user: AppUser) {
  console.log(user.permissions);   
    // Property 'permissions' does not exist on type 'AppUser'.
    // Property 'permissions' does not exist on type 'Guest'.
}
 */
type Merged = Admin & Guest;
// Merged resolves to:
// {
//   role: never;          // "admin" & "guest" → no value can be both literals simultaneously → never
//   permissions: string[]; // unique to Admin, carries through fine
// }

//const m: Merged = { role: "admin", permissions: [] };
// Error: Type '"admin"' is not assignable to type 'never'