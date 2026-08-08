const arr = [10, 20, 30];
const it = arr[Symbol.iterator](); // arrays have a built-in iterator

console.log(it.next());
console.log(it.next());
console.log(it.next());
console.log(it.next());

const range = {
    from: 1,
    to: 5,
    [Symbol.iterator]() {
        let current = this.from;
        const last = this.to;
        return {
            next() {
                if(current < last) {
                    return { value: current++, done: false};
                }
                return { value: undefined, done: true};
            }
        };
    }
};

for(const num of range) {
    console.log(num); // 1, 2, 3, 4, 5
}

console.log([...range]); // [1,2,3,4,5] - spread works too, same protocol


function* rangeGen(from, to) {
    for(let i = from; i <= to; i++) {
        yield i;
    }
}

const gen = rangeGen(1,5);
console.log(gen.next()); // { value: 1, done: false }
console.log(gen.next()); // { value: 2, done: false }

for(const num of rangeGen(1,3)) {
    console.log(num); // 1, 2, 3
}

console.log([...rangeGen(1,3)]); // [1, 2, 3]

// yield pauses execution and hands a value out -- the function's local state
// is frozen in place until .next() is called again.
// This is a closure-like mechanism: the generator's execution context persists
// between calls instead of running start-to-finish in one go

function* conversation() {
    const name = yield 'What is your name ?';
    const role = yield `Hi ${name}, what do you do ?`;
    return `${name} is a ${role}`;
}

const convo = conversation();

console.log(convo.next()); // { value: 'What is your name ? ', done: false}
console.log(convo.next('Vedat')); // { value: 'Hi Vedat, what do you do ?', done: false}
console.log(convo.next('engineer')); // value: 'Vedat is a engineer', done: true

// Whatever you pass into .next(x) becomes the result of the yield expression on the line that was paused
// First .next() call's argument is always ignored

// Infinite sequences -- why generators matter pratically
// Because execution pauses, you can model infinite sequences without blowing the stack or memory:

function* naturalNumbers() {
    let n = 1;
    while(true) {
        yield n++;
    }
}

const nums = naturalNumbers();
console.log(nums.next().value); // 1
console.log(nums.next().value); // 2
console.log(nums.next().value); // 3

// [...naturalNumbers()] - never call, infinite loop, spread never sees `done: true`

function* fibonacci() {
  let [a, b] = [0, 1];
  while (true) {
    yield a;
    [a, b] = [b, a + b];
  }
}

const fib = fibonacci();
const first10 = Array.from({ length: 10 }, () => fib.next().value);
console.log(first10); // [0, 1, 1, 2, 3, 5, 8, 13, 21, 34]

// yield** -- delegating to another generator/iterable
function* inner() {
    yield 'a';
    yield 'b';
}

function* outer() {
    yield 1;
    yield* inner(); // delegates -- flattens inner's yields into outer's sequence
    yield 2;
}

console.log([...outer()]); // [1, 'a', 'b', 2]

// return() and early termination
function* gen() {
    try {
        yield 1;
        yield 2;
        yield 3;
    }finally {
        console.log('cleanup ran');
    }
}

const g = gen();
console.log(g.next()); // { value: 1, done: false }
console.log(g.return(99)); // cleanup ran -> { value: 99, done: true }
console.lof(g.next()); // { value: undefined, done: true} - generator is done