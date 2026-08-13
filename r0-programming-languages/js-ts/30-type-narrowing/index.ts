// 1. typeof guars - for primitives
function formatValue(value: string | number | boolean): string {
  if (typeof value === "string") {
    return value.toUpperCase(); // narrowed: string
  } else if (typeof value === "number") {
    return value.toFixed(2); // narrowed: number
  } else {
    return value ? "yes" : "no"; // narrowed: boolean (only option left)
  }
}

/*
typeof only works cleanly for JS primitives ("string", "number", "boolean", "undefined", "function", "object", "symbol", "bigint") — notably typeof null === "object", a well-known JS quirk that TS inherits, so typeof alone can't distinguish null from a real object.
*/

// 2. instanceof guars - for class instances
class ApiError extends Error {
  constructor(
    public statusCode: number,
    message: string,
  ) {
    super(message);
  }
}

class ValidationError extends Error {
  constructor(
    public field: string,
    message: string,
  ) {
    super(message);
  }
}

function handleError(err: Error) {
  if (err instanceof ApiError) {
    console.log(`API error ${err.statusCode}: ${err.message}`); // narrowed: ApiError
  } else if (err instanceof ValidationError) {
    console.log(`Invalid ${err.field}: ${err.message}`); // narrowed: ValidationError
  } else {
    console.log(`Unknown error: ${err.message}`);
  }
}

// 3. in guards - for structural property checks
interface Bird {
  fly(): void;
}

interface Fish {
  swim(): void;
}

function move(animal: Bird | Fish) {
  if ("fly" in animal) {
    animal.fly(); // narrowed: Bird
  } else {
    animal.swim(); // narrowed: Fish
  }
}

// 4. Discriminated unions - the pattern, formalized
interface LoadingState {
  status: "loading";
}

interface SuccessState {
  status: "success";
  data: string[];
}

interface ErrorState {
  status: "error";
  message: string;
}

type FetchState = LoadingState | SuccessState | ErrorState;

function render(state: FetchState): string {
  switch (state.status) {
    case "loading":
      return "Loading...";
    case "success":
      return `Got ${state.data.length} items`; // narrowed: SuccessState — .data is safely accessible
    case "error":
      return `Error: ${state.message}`; // narrowed: ErrorState — .message is safely accessible
  }
}

// The switch exhaustiveness check - typing back to never
function assertNever(x: never): never {
  throw new Error(`Unhandled case: ${JSON.stringify(x)}`);
}

function render(state: FetchState): string {
  switch (state.status) {
    case "loading":
      return "Loading...";
    case "success":
      return `Got ${state.data.length} items`;
    case "error":
      return `Error: ${state.message}`;
    default:
      return assertNever(state); // if every case above is handled, `state` here has type `never`
  }
}

// Custom type guards functions - the new piece: is predicates
interface Cat {
  meow(): void;
}

interface Dog {
  bark(): void;
}

function isCat(animal: Cat | Dog): animal is Cat {
  return typeof (animal as Cat).meow === "function";
}

function makeSound(animal: Cat | Dog) {
  if (isCat(animal)) {
    animal.meow(); // narrowed: Cat — because isCat said so
  } else {
    animal.bark(); // narrowed: Dog
  }
}
