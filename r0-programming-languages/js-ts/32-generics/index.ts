/*
function identityAny(value: any): any {
  return value;
}

const x = identityAny("hello");
x.toUpperCase(); // fine, but... x.toFixed(2) would ALSO compile, and crash at runtime

function identity<T>(value: T): T {
  return value;
}

const a = identity("hello"); // TS infers T = string, so `a` is typed string
const b = identity(42); // TS infers T = number, so `b` is typed number

a.toUpperCase(); // fine — TS knows a is string
a.toFixed(2); // Error — string has no toFixed

const c = identity<string>("hello"); // explicit — T is pinned to string
const d = identity<number>(42); // explicit — T is pinned to number

function pair<A, B>(first: A, second: B): [A, B] {
  return [first, second];
}

const p = pair("Vedat", 30); // inferred as [string, number]

interface Array<T> {
  map<U>(callback: (item: T) => U): U[];
}

interface ApiResponse<T> {
  data: T;
  status: number;
  timestamp: Date;
}

interface User {
  id: number;
  name: string;
}

const userResponse: ApiResponse<User> = {
  data: { id: 1, name: "Vedat" },
  status: 200,
  timestamp: new Date(),
};

const listResponse: ApiResponse<User[]> = {
  data: [
    { id: 1, name: "Vedat" },
    { id: 2, name: "Test" },
  ],
  status: 200,
  timestamp: new Date(),
};

function fetchUser(id: number): Promise<User> {
  return fetch(`/api/users/${id}`).then((res) => res.json());
}

async function loadUser() {
  const user = await fetchUser(1); // TS knows: user is `User`, not just 'any'
}

class Box<T> {
  private contents: T;

  constructor(value: T) {
    this.contents = value;
  }

  getValue(): T {
    return this.contents;
  }
}

const stringBox = new Box("hello"); // Box<string>
const numberBox = new Box(42); // Box<number>

stringBox.getValue().toUpperCase(); // fine

// Constraints (extends)
function getLength<T>(value: T): number {
  return value.length;
  // Error: Property 'length' does not exist on type 'T'
  // T is completely unconstrained — could be a number, a boolean, anything without .length
}

// Without a constraint, T could be anything, so TS can't assume .length exists. Add a constraint to say "T must be at least this shape":
interface HasLength {
  length: number;
}

function getLengthWithExtends<T extends HasLength>(value: T): number {
  return value.length;
}

getLength("hello"); // fine — string has .length
getLength([1, 2, 3]); // fine — array has .length
getLength({ length: 10 }); // fine — matches the shape structurally
getLength(42);

function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

const user = {
  id: 1,
  name: "Vedat",
  email: "v@example.com",
};

getProperty(user, "name"); // fine -- TS knows this returns 'string'
getProperty(user, "id"); // fine -- TS knows this returns 'number'
getProperty(user, "invalid"); // Error: Argument of type '"invalid"' is not assignable to parameter of type '"id" | "name" | "email"'

*/

// Default generic types
interface User {
  id: number;
  name: string;
}

interface ApiResponse<T = unknown> {
  data: T;
  status: number;
}

const generic: ApiResponse = {
  data: "anything",
  status: 200,
};

const specific: ApiResponse<User> = {
  data: {
    id: 1,
    name: "Vedat",
  },
  status: 200,
};

interface PaginatedResponse<T extends object = Record<string, unknown>> {
  items: T[];
  page: number;
  totalPages: number;
}

/*
Here T must be some kind of object (constraint), 
and if unspecified, defaults to a generic object 
shape (Record<string, unknown> — a built-in generic utility type meaning "an object with string keys 
and unknown-typed values," 
another one you'll see constantly).

*/

interface HasId {
  id: number;
}

function findById<T extends HasId>(items: T[], id: number): T | undefined {
  return items.find((item) => item.id === id);
}

interface Product {
  id: number;
  name: string;
  price: number;
}

const products: Product[] = [
  { id: 1, name: "Widget", price: 9.99 },
  { id: 2, name: "Gadget", price: 19.99 },
];

const found = findById(products, 1);
console.log(found.name); // predict: does this line compile cleanly, error, or something in between?

const numbers = [1, 2, 3];
const badFind = findById(numbers, 1); // predict: does this call itself compile?
