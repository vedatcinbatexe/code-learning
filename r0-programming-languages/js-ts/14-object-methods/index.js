const user = {
    name: "Vedat",
    role: "engineer",
    level: 5
};

Object.keys(user); // ['name', 'role', 'level']
Object.values(user); // ['Vedat', 'engineer', 5]
Object.entries(user); // [['name', 'vedat'], ['role', 'engineer'], ['level', 5]]



const entries = [['a', 1], ['b', 2]]
Object.fromEntries(entries); // { a: 1, b: 2}

const doubled = Object.fromEntries(
    Object.entries(user).map(([k, v]) => [k, typeof v === 'number' ? v * 2 : v])
);

Object.fromEntries(new Map([['x', 1]])); // { x: 1}

const target = { a: 1, b: 2};
const source = { c: 3, d: 4};

Object.assign(target, source); 
// target is now { a: 1, b: 3, c: 4 } — MUTATES target!

const merged = { ...target, ...source};
// same result, no mutation

const original = { name: 'Vedat', address: { city: 'Istanbul'}};
const copy = Object.assign({}, original); // or { ...original }

copy.name = 'Someone else'; // fine, doesn't touch original
copy.address.city = 'Ankara'; // MUTATES original.address too !

console.log(original.address.city);

// Why original address updated too ? 
// Object.assign and spread only copy top-level properties.
// If a property's value is reference (object/array), you copy the reference
// not the data --b oth original.address and copy.address point to the same object in memory


const deep = structuredClone(original);
deep.address.city = 'Bursa';
console.log(original.address.city); // still 'Ankara' - real independence


const withFn = { a: 1, greet() {}};
JSON.parse(JSON.stringify(withFn)); // { a: 1} - function silently dropped

const circular = { a: 1};
circular.self = circular;
JSON.parse(JSON.stringify(circular)); // throws ! Converting circular structure to JSON
structuredClone(circular); // works fine


const frozen = Object.freeze({a: 1, nested: { b: 2}});
frozen.a = 99; // silently fails (throws in strict mode)
console.log(frozen.a); // still 1

frozen.nested.b = 99;
console.log(frozen.nested.b); // 99 - nested object was NOT frozen

const sealed = Object.seal({ a: 1 })
sealed.a = 2; // works -- can modify existing props
sealed.b = 3; // fails -- can't add new props
delete sealed.a; // fails -- can't delete either

Object.getOwnPropertyNames(user);
Object.getPrototypeOf(user);
Object.defineProperty(user, 'id', {
    value: 123,
    enumerable: false
});
Object.getOwnPropertyDescriptor(user, 'name');