// Access modifiers: public, private, protected
class BankAccount {
  public accountHolder: string; // accessible anywhere (default if omitted)
  private balance: number; // accessible only inside this class
  protected accountType: string; // accessible inside this class AND subclasses

  constructor(accountHolder: string, initialBalance: number) {
    this.accountHolder = accountHolder;
    this.balance = initialBalance;
    this.accountType = "standard";
  }

  deposit(amount: number): void {
    this.balance += amount; // fine — inside the class
  }

  getBalance(): number {
    return this.balance;
  }
}

const acc = new BankAccount("Vedat", 1000);
acc.accountHolder; // fine — public
//acc.balance; // Error: Property 'balance' is private and only accessible within class 'BankAccount'

class Example {
  private tsPrivate = "compile-time only";
  #realPrivate = "runtime enforced";
}

const e = new Example();
console.log((e as any).tsPrivate); // works at runtime — TS's `private` didn't survive compilation
//console.log((e as any).#realPrivate); // still a syntax error — genuinely inaccessible

// protected sits between the two — accessible in the declaring class and subclasses, but not from outside:
class SavingsAccount extends BankAccount {
  applyInterest(rate: number): void {
    console.log(this.accountType); // fine — protected, accessible in subclass
  }
}

const sav = new SavingsAccount("Vedat", 1000);
sav.accountType; // Error: Property 'accountType' is protected

// Constructor parameter shorthand
class Product {
  constructor(
    public id: number,
    public name: string,
    private cost: number,
    readonly sku: string,
  ) {} // empty body — TS generates the property declarations AND assignments automatically
}

const p = new Product(1, "Widget", 5.5, "SKU-001");
console.log(p.id, p.name, p.sku); // fine
console.log(p.cost); // Error: private

// readonly on class properties
class Point {
  readonly x: number;
  readonly y: number;

  constructor(x: number, y: number) {
    this.x = x; // fine — still inside constructor
    this.y = y;
  }

  moveX(newX: number) {
    this.x = newX; // Error: Cannot assign to 'x' because it is a read-only property
  }
}

// Abstract classes
// An abstract class can't be instantiated directly — it exists only to be extended, and can declare methods that have no implementation, forcing subclasses to provide one:
abstract class Shape {
  abstract area(): number; // no body — subclasses MUST implement this

  describe(): string {
    // regular method — concrete, inherited as-is
    return `This shape has an area of ${this.area()}`;
  }
}

const s = new Shape();
// Error: Cannot create an instance of an abstract class

class Circle extends Shape {
  constructor(private radius: number) {
    super();
  }
  area(): number {
    // required — TS errors if this is missing
    return Math.PI * this.radius ** 2;
  }
}

const c = new Circle(5);
console.log(c.describe()); // "This shape has an area of 78.53981633974483"

/*
    The value here: abstract lets you share concrete behavior (describe()) across subclasses 
    while guaranteeing at compile time that every subclass provides its own version of whatever varies (area()) — you can't forget to implement it and only find out at 
    runtime when .area() is called and doesn't exist.
*/

/*
implements vs extends

This is the one genuinely new relationship in this chunk. Both connect a class to something else, but the nature of the relationship is fundamentally different:

extends — inherits actual implementation. The subclass gets real, working code (methods, properties, their bodies) from the parent, for free, and can override pieces of it.
implements — commits to a contract only. The class promises to match an interface's shape, but gets zero code from it — every member must be implemented from scratch.

*/

interface Flyable {
  altitude: number;
  fly(): void;
}

interface Swimmable {
  depth: number;
  swim(): void;
}

// a class CAN implement multiple interfaces — no single-inheritance limit here
class Duck implements Flyable, Swimmable {
  altitude = 0;
  depth = 0;

  fly(): void {
    this.altitude = 100;
    console.log("Duck flying");
  }

  swim(): void {
    this.depth = 2;
    console.log("Duck swimming");
  }
}

class Duck extends Animal implements Flyable, Swimmable {
  // gets real inherited behavior from Animal (extends)
  // AND must independently satisfy both Flyable and Swimmable contracts (implements)
}

/*
Why this distinction matters practically: implements 
gives you multiple-interface-style flexibility (a class can honor as many contracts as needed) 
precisely because it demands nothing but a shape match — there's no code 
to conflict between multiple interfaces, since none of them 
contribute any implementation at all. extends can only be singular because actual 
method/property implementations could conflict if you tried to inherit real code from two sources simultaneously (the classic "diamond problem" other languages solve with multiple inheritance rules) — 
TS/JS sidesteps that entirely by not allowing multiple extends.

*/

abstract class Employee {
  constructor(
    protected name: string,
    private baseSalary: number,
  ) {}

  abstract calculateBonus(): number;

  getTotalPay(): number {
    return this.baseSalary + this.calculateBonus();
  }
}

interface Reportable {
  generateReport(): string;
}

class Manager extends Employee implements Reportable {
  constructor(
    name: string,
    baseSalary: number,
    private teamSize: number,
  ) {
    super(name, baseSalary);
  }

  calculateBonus(): number {
    return this.teamSize * 500;
  }

  generateReport(): string {
    return `${this.name} manages ${this.teamSize} people, total pay: ${this.getTotalPay()}`;
  }
}

const mgr = new Manager("Vedat", 60000, 8);
console.log(mgr.generateReport());
console.log(mgr.baseSalary); // predict this line specifically
