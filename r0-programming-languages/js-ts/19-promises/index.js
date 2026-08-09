/*
console.log('1: sync start');

const promise = new Promise((resolve, reject) => {
    console.log('2: executor runs');
    resolve('resolved value');
    console.log('3: after resolve call');
});

promise.then((value) => {
    console.log('4: then handler -> ', value);
});

setTimeout(() => {
    console.log('5: timeout');
}, 0);

console.log('6: sync end');
*/

console.log('start');

Promise.resolve(1)
  .then((val) => {
    console.log('first then:', val);
    return val + 1;
  })
  .then((val) => {
    console.log('second then:', val);
    throw new Error('oops');
  })
  .then((val) => {
    console.log('third then:', val);
  })
  .catch((err) => {
    console.log('caught:', err.message);
  })
  .then(() => {
    console.log('after catch');
  });

console.log('end');

/*
  promiseA
    .then(handlerB)
    .then(handlerC) // if handlerB throws, this is SKIPPED entirely
    .then(handlerD) // this is SKIPPED too
    .catch(handlerE) // execution jumps straight here
    .then(handlerF) // runs normally after catch, since catch "recovers"
*/

// Promise.all()

Promise.all([p1, p2, p3]) // resolves: [resul1, result2, result3]

// Promise.allSettled()
//{ status: 'fulfilled', value: ... }
//{ status: 'rejected', value: ...}

/*
Quick comparison table
Method	Settles when	On rejection(s)
all	all resolve	rejects immediately on first failure
allSettled	all settle (success or fail)	never rejects, reports everything
race	first one settles (any outcome)	resolves or rejects with whichever came first
any	first one resolves	only rejects if ALL reject (AggregateError)
*/