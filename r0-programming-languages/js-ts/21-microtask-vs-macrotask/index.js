console.log('1: script start');

setTimeout(() => console.log('7: setTimeout'), 0);

setImmediate(() => console.log('8: setImmediate'));

Promise.resolve().then(() => {
  console.log('4: promise 1');
  process.nextTick(() => console.log('5: nextTick queued from inside a promise'));
});

process.nextTick(() => console.log('2: nextTick 1'));

process.nextTick(() => {
  console.log('3: nextTick 2');
});

Promise.resolve().then(() => console.log('6: promise 2'));

console.log('1b: script end');

// Reasoning walkthrough:
//
// Phase A (synchronous):
//   '1: script start' and '1b: script end' log immediately.
//   setTimeout and setImmediate callbacks are scheduled (macrotasks).
//   Two nextTick callbacks are queued (nextTick 1, nextTick 2).
//   Two Promise .then() handlers are queued (promise 1, promise 2).
//
// Phase B (drain nextTick queue FULLY, in FIFO order):
//   'nextTick 1' logs
//   'nextTick 2' logs
//   (queue is now empty -- nothing new was added to IT specifically)
//
// Phase C (drain Promise microtask queue FULLY, including anything
//          newly added -- but note: a nextTick queued FROM INSIDE a
//          promise handler goes into the nextTick queue, which Node
//          checks again before moving to the NEXT macrotask, not
//          before finishing the CURRENT microtask pass):
//   'promise 1' logs -> queues a new nextTick callback
//   'promise 2' logs
//   (Promise microtask queue is now empty for this pass)
//
// Phase D (Node checks nextTick queue again before moving to timers):
//   'nextTick queued from inside a promise' logs
//
// Phase E (macrotask phase -- timers first, then check/immediate):
//   'setTimeout' logs
//   'setImmediate' logs
//   (setTimeout vs setImmediate ordering can actually vary depending on
//   context -- e.g. inside vs outside an I/O cycle -- so don't treat
//   7-vs-8 as a hard guarantee the way the microtask ordering is)
//
// Expected order:
// 1: script start, 1b: script end, 2: nextTick 1, 3: nextTick 2,
// 4: promise 1, 6: promise 2, 5: nextTick queued from inside a promise,
// 7: setTimeout, 8: setImmediate