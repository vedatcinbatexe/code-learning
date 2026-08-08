const s1 = Symbol('id');
const s2 = Symbol('id');

console.log(s1 === s2); // false - every Symbol() call creates a unique value,
// even with the same description

const user = {
    name: 'Vedat',
    [Symbol('id')]: 12345 // a symbol-keyed property
};

console.log(Object.keys(user)); // ['name'] - symbol keys are invisible here
console.log(JSON.stringify(user)); // '{"name": "Vedat"}' - invisble to JSON too
console.log(Object.getOwnPropertySymbols(user)); // [Symbol(id)] — this is how you'd actually access them


class Money {
    constructor(amount) {
        this.amount = amount;
    }

    [Symbol.toPrimitive](hint) {
        if(hint === 'number') return this.amount;
        if(hint === 'string') return `$${this.amount}`;
        return `Money($${this.amount})`;
    }
}

const price = new Money(50);
console.log(+price); // 50 - hint: 'number'
console.log(`${price}`); // '$50 - hint: 'string'
console.log(price + ''); // 'Money(50)' - hint: 'default'

// Map - key-value pairs, any type as key
// The critical difference from plan objects: keys can be anything, not just string/symbols
const map = new Map();
const objKey = { id: 1 };

map.set('name', 'Vedat');
map.set(objKey, 'this works as a key');
map.set(42, 'number key');

console.log(map.get(objKey)); // 'this works as a key'
console.log(map.get({ id: 1 })); // undefined — different object reference, back to your reference-equality mental model!
console.log(map.size); // 3

for(const [key, value] of map) {
    console.log(key, value);
}

console.log([...map.keys()]);
console.log([...map.values()]);
console.log([...map.entries()]);

// Set - unique values, no duplicates
const set = new Set([1,2,2,3,3,3]);
console.log(set);

set.add(4);
set.add(4);

console.log(set.has(2)); // true

set.delete(1);
console.log([...set]); // [2, 3, 4]

// Practical pattern - dedupe an array in one line
const nums = [1, 2, 2, 3, 4, 4, 5];
const unique = [...new Set(nums)]; // [1, 2, 3, 4, 5]
console.log(`Unique array: ${unique}`);

// Set equality for objects follows the same reference rule as Map keys:
const set2 = new Set([{ a: 1}, { a: 1}]);
console.log(set2.size); // 2 — two different references, "duplicates" by value but not by reference

// WeakMap / WeakSet - the garbage collection angle
// Same idea as Map/Set, but with three restrictions:
//  1. Keys (WeakMap) / values (WeakSet) must be "objects", never primitives
//  2. Not iterabne - no for...of, no .size, no .keys()
//  3. Weakly held -- if nothing else references the key object, it can be garbage collected, and the
// WeakMap entry dissappears with it

let userObj = { name: 'Vedat' }
const cache = new WeakMap();

cache.set(userObj, { lastLogin: Date.now() });
console.log(cache.get(userObj)); // { lastLogin:...}

userObj = null; // no other references to the original object now

/*
Why this matters practically: if you used a regular Map to attach metadata
to DOM nodes or objects that come and go (e.g., request-scoped caches, private data per-instance), 
the Map keeps a strong reference forever — the object can never be garbage collected as long as the Map holds it,
even if nothing else in your program uses it anymore.
 
That's a memory leak. WeakMap fixes this by design — it never becomes the reason an object stays alive.
*/

// Common real use: private data for class instances before private fields (#field) existed:

const privateData = new WeakMap();

class BankAccount {
    constructor(balance) {
        privateData.set(this, { balance }); // truly private - not accessible outside
    }

    getBalance() {
        return privateData.get(this).balance;
    }
}