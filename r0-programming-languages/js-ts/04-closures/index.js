function greet() {
    const name = "Alice";
    
    function sayHi() {
        console.log(`Hi, ${name}!`);
    }

    return sayHi; // returns the inner function without executing it
}

const myFunc = greet(); // greet() is called, returning sayHi
myFunc(); // sayHi() is called, logging "Hi, Alice!"

/* 
A closure = a function + the variables it remembers from where it was created, kept
alive even after the outer function is done

*/

const makeCounter = () => {
    let count = 0;

    const increment = () => {
        count = count + 1;
        console.log(count);
    }

    return increment;
}

const counter = makeCounter();

counter(); // 1
counter(); // 2
counter(); // 3

const counterA = makeCounter();
const counterB = makeCounter();

counterA(); // 1
counterA(); // 2
counterB(); // 1
counterA(); // 3
counterB(); // 2

console.log(counterA.count); // undefined, count is not accessible outside of makeCounter