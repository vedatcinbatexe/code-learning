const f1 = (a, b) => a + b;
const f2 = (a) => a * 2;
const f3 = a => a * 2;
const f4 = () => 42;
const f5 = (a, b) => { return a + b }; 

//const makeUser = (name) => { name, active: true}; // BROKEN

const makeUser = (name) => ({ name, active: true});
console.log(makeUser("Vedat")); // { name: "Vedat", active: true};,

class Counter {
    count = 0;

    increment() {
        [1, 2, 3].forEach(() => {
            this.count++; // `this` = the Counter instance, inherited from increment()
        })
    }
}

/*
[1,2,3].forEach(function() {
    this.count++; this is undefined
})

*/

/*
const counter1 = new Counter();

counter1.increment();
counter1.increment();

console.log('Counter: ', counter1.count);
*/

function outer() {
    const inner = () => console.log(arguments[0]);
    inner();
}

outer("hi"); // "hi" -- arguments came from outer()

const users = [
    {
        name: "vedat",
        active: true
    },
    {
        name: "Alice",
        active: true
    },
    {
        name: "john",
        active: false
    }
]
users.map(({name}) => name.toUppserCase());
users.filter(u => u.active)

const obj = {
  value: 42,
  getValue: () => this.value    // BROKEN — `this` is lexical, inherited from
                                // whatever scope `obj` was defined in (often module/global),
                                // not `obj` itself
};

// Use getValue() { return this.value } instead

button.addEventListener("click", function () { console.log(this); }); // `this` = button
button.addEventListener("click", () => console.log(this));            // `this` = enclosing scope, NOT button

function greet(name = "stranger", greeting = `Hello, ${name}`) {
    console.log(greeting)
}

greet();
greet(undefined, "Hi There");
greet(null);