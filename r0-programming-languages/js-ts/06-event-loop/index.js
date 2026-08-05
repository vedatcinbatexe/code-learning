/*
console.log('1');

setTimeout(() => {
    console.log('2');
}, 0);

console.log('3'); */

/*
console.log('start');

setTimeout(() => {
    console.log('timeout callback');
}, 0);

for(let i = 0; i < 1000000000; i++) {} // Simulate a long-running task
console.log('end'); */

/*
    - Mactotask queue: settimeout, setInterval, setImmediate, I/O, UI rendering
    - Microtask queue: process.nextTick, Promises, Object.observe, MutationObserver

    First synchronous code is executed, then 
    microtasks are executed, and finally macrotasks are executed.

*/

/*
console.log('1');

setTimeout(() => {
    console.log('2');
}, 0);

Promise.resolve().then(() => {
    console.log('3');
});

console.log('4');
Output:
1
4
3
2
*/

/*
console.log('1');

setTimeout(() => {
    console.log('2');
}, 0);

Promise.resolve().then(() => {
    console.log('3');
    Promise.resolve().then(() => {
        console.log('4');
    });
})

Promise.resolve().then(() => {
    console.log('5');
});

console.log('6');

 */


/*
console.log('1');

async function foo() {
    console.log('2');
    await null;
    console.log('3');
}

foo();

console.log('4');

setTimeout(() => {
    console.log('5');
}, 0);

Promise.resolve().then(() => {
    console.log('6');
}); */

console.log('1');

async function foo() {
  console.log('2');
  await null;
  console.log('3');
}

async function bar() {
  console.log('4');
  await null;
  console.log('5');
}

foo();
bar();

setTimeout(() => {
  console.log('6');
}, 0);

console.log('7');

// Output: 1, 2, 4, 7, 3, 5, 6