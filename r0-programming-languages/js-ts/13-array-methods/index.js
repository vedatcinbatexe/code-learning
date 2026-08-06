/*
const nums = [1, 2, 3];
const doubled = nums.map(n => { n * 2});

console.log(doubled);
console.log(nums);

// map never mutates the original array.
// it always returns "new" array, built by calling the callback
// once per element and collecting the results.,

const nums2 = [1, 2, 3, 4, 5];
const result = nums2.filter(n => n % 2);

console.log(result);

[0, 1, false, 2, "", 3, null, undefined, NaN].filter(Boolean);
 */
// reduce
/*
let total = 0;
for (const n of [1, 2, 3, 4]) {
    total = total + n;
}

const sum = [1, 2, 3, 4].reduce((acc, n) => acc + n, 0);

const result = [1, 2, 3, 4].reduce((acc, n) => {
    console.log("acc:", acc, "n:", n);
    return acc + n;
}, 10);

console.log("result:", result) */

// array.reduce((accumulator, currentElement) => { .. }, initialValue);

/*
Let's hand-trace [1, 2, 3, 4].reduce((acc, n) => {...}, 10):
Call	acc going in	n	body runs	returns (→ next acc)
1	10 (the initial value)	1	logs acc: 10 n: 1	10 + 1 = 11
2	11	2	logs acc: 11 n: 2	11 + 2 = 13
3	13	3	logs acc: 13 n: 3	13 + 3 = 16
4	16	4	logs acc: 16 n: 4	16 + 4 = 20

*/


/*
const arr = [5, 10, 15];

const result1 = arr.reduce((acc, n) => acc + n); // 30
const result2 = arr.reduce((acc, n) => acc + n, 0); // 30

const empty = [];
const result3 = empty.reduce((acc, n) => acc + n); // TypeError: Reduce of empty array with no initial value
*/


// find: returns the "first element" where the callback
// returns truthy -- not an array of matches, the actual element itself
/*

const users = [
    { id: 1, name: "Ada"},
    { id: 2, name: "Vedat"},
    { id: 3, name: "Grace"},
]

const found = users.find(u => u.id === 2);
console.log(found); // { id: 2, name: "Vedat"}

users.find(u => u.id === 999)?.name ?? "not found"; // optional chaining saves you here


// some / every
// both return a "boolean". Both short-circuit. They're opposites in what
// triggers the short-circuit

const nums = [1, 2, 3, 4, 5];

nums.some(n => n > 4); // true -- short-circuits the moment it finds "ONE" match
nums.every(n => n > 0); // true -- must check ALL, only short-circuits on a FAILURE
nums.every(n => n > 2); // false -- short-circuits as soon as it hits 1 (fails the test)


[].some(n => n > 0); // false
[].every(n => n > 0); // true
//  */

// flat // flatMap
// flat: flattens nested arrays into a single-level array, up to a given depth

const nested = [1, [2, 3], [4, [5,6]]];

nested.flat(); // depth 1 (default)
nested.flat(2); // depth 2
nested.flat(Infinity); // fully flatten, any depth

console.log(nested.flat(Infinity));

// flatMap: is a map immediately followed by flat(1) -- but implemented 
// as a single combined operation, not two separate passes
const words = ["hello world", "foo bar"];
words.map(w => w.split(" "));
console.log(words.flatMap(w => w.split(" ")));

// each word can produce multiple outputs (its characters)
["cat", "dog"].flatMap(w => w.split(""));
// ["c", "a", "t", "d", "o", "g"]

// each user can produce zero outputs (filter-like behavior via empty array)
const users = [{ name: "Ada", tags: ["admin", "dev"] }, { name: "Grace", tags: [] }];
users.flatMap(u => u.tags);
// ["admin", "dev"]  — Grace contributed nothing, no empty slot left behind

// combining filter + map in one pass — very common trick
[1, 2, 3, 4, 5].flatMap(n => n % 2 === 0 ? [n * 10] : []);
// [20, 40] — odd numbers vanish entirely (empty array flattens to nothing),
// even numbers get transformed