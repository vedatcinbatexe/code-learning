interface UserInterface {
    id: number
    name: string
}

type UserType = {
    id: number;
    name: string
}

const a: UserInterface = { id: 1, name: "Vedat"};
const b: UserType = { id: 2, name: "Test"};


interface Repo {
    readonly id: number;
    find(id: number): unknown;
}

type RepoType = {
    readonly id: number;
    find(id: number): unknown;
}

// Diff 1: Declaration merging (interfaces only)

interface Config {
    apiUrl: string;
}

interface Config {
    timeout: number;
}

// Config is now effectivelty: {apiUrl: string; timeout: number}
const cfg: Config = {
    apiUrl: "https://api.example.com",
    timeout: 5000
};

/*
type ConfigType = {
    apiUrl: string;
}

type ConfigType = { // Error: TS2300 Duplicate identifier 'ConfigType'
    timeout: number;
}


declare global {
    namespace Express {
        interface Request {
            userId?: string; // merges into the existing Request interface
        }
    }
}


*/


// Diff 2: What each one can express
//interface Status = "pending" | "active"; // Error - this isn't even valid syntax

type ID = number | string;                          // union
type Status = "pending" | "active" | "banned";       // literal union
type Coord = [number, number];                        // tuple
type Predicate = (x: number) => boolean;               // function signature
type Nullable<T> = T | null;                           // generic utility
type Handler = { (req: unknown): void; middleware: true };  // callable + property (rare hybrid)


// Diff 3: Extending
interface Animal {
    name: string;
}

interface Dog extends Animal {
    breed: string;
}

const d: Dog = {
    name: "Rex",
    breed: "Labrador"
};

type AnimalType = {
    name: string;
}

type DogType = AnimalType & {
    breed: string
}

interface A { x: number; }
//interface B extends A { x: string; }  
// Error: Interface 'B' incorrectly extends interface 'A'.
// Property 'x' is incompatible.

type AType = { x: number; };
type BType = AType & { x: string; };  // no error here...

//const val: BType = { x: 5 };   
// Error appears HERE instead: Type 'number' is not assignable to type 'never'


// Interface -> object/class-shaped contracts
// Type -> unions/tuples/function signatures/mapped generic utilities


/*
interface Shape {
  color: string;
}

interface Shape {
  area(): number;
}

type ShapeType = {
  color: string;
};

// predict: does this second declaration cause a merge, an error, or something else?
type ShapeType = { // Duplicate identifier 'ShapeType'
  area(): number;
};

const s: Shape = {
  color: "red",
  area: () => 42
};
*/