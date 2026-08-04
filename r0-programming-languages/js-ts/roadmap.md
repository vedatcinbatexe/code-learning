# JavaScript / TypeScript Recap — 5 Day Plan (25 Hours Total)

**Budget:** 25 hours over 5 days (~5 hrs/day avg). Allocation is weighted toward the topics with the most depth/interview weight (execution model, async) rather than split evenly.

| Day | Topic | Hours |
|---|---|---|
| 1 | JS Core & Execution Model | 6h |
| 2 | Modern JS (ES6+) & Functional Patterns | 5h |
| 3 | Asynchronous JavaScript | 5h |
| 4 | TypeScript Fundamentals | 4h |
| 5 | Advanced TypeScript & Practical Patterns | 5h |
| | **Total** | **25h** |

## Day 1 — JS Core & Execution Model (6h)
- Variables: `var` vs `let` vs `const`, scoping (function/block), hoisting, TDZ — *0.5h*
- Data types: primitives vs reference types, type coercion, `==` vs `===` — *0.5h*
- Execution context, call stack, lexical environment — *1h*
- Closures (deep dive — this trips up almost everyone) — *1.5h*
- `this` binding: implicit, explicit (`call`/`apply`/`bind`), arrow functions vs regular functions — *1h*
- Event loop: call stack, Web APIs/Node APIs, callback queue, microtask queue (Promises) vs macrotask queue (setTimeout) — *1h*
- Prototypal inheritance, prototype chain, `Object.create`, `__proto__` vs `prototype` — *0.5h*

## Day 2 — Modern JS (ES6+) & Functional Patterns (5h)
- Destructuring (arrays/objects, nested, defaults) — *0.5h*
- Spread / rest operators — *0.25h*
- Template literals, tagged templates — *0.25h*
- Arrow functions (recap in context of `this`) — *0.25h*
- Default parameters, optional chaining `?.`, nullish coalescing `??` — *0.25h*
- Array methods: `map`, `filter`, `reduce`, `find`, `some`/`every`, `flat`/`flatMap` — *1.5h*
- Object methods: `Object.keys/values/entries`, `Object.assign`, structured cloning — *0.5h*
- Modules: ESM (`import`/`export`) vs CommonJS (`require`) — *0.5h*
- Iterators & generators (`function*`, `yield`) — *0.5h*
- Symbols, `Map`/`Set`/`WeakMap`/`WeakSet` — *0.5h*

## Day 3 — Asynchronous JavaScript (5h)
- Callbacks and callback hell — *0.5h*
- Promises: states, chaining, `Promise.all/allSettled/race/any` — *1.5h*
- `async`/`await`, error handling with `try/catch` — *1h*
- Microtask vs macrotask ordering (revisit with async/await examples) — *0.75h*
- Common async pitfalls (loops with async, unhandled rejections) — *0.5h*
- Fetch API / AbortController basics — *0.25h*
- Debounce & throttle (classic async/timing interview topics) — *0.5h*

## Day 4 — TypeScript Fundamentals (4h)
- Why TS: static typing, compile-time checks, tsconfig basics — *0.25h*
- Basic types: primitives, arrays, tuples, enums, `any`/`unknown`/`never` — *0.75h*
- Interfaces vs Types (when to use which) — *0.5h*
- Function typing: parameters, return types, optional/default params, overloads — *0.5h*
- Union & intersection types — *0.5h*
- Type narrowing: type guards, `typeof`, `instanceof`, discriminated unions — *1h*
- Classes in TS: access modifiers, `readonly`, abstract classes, implements vs extends — *0.5h*

## Day 5 — Advanced TypeScript & Practical Patterns (5h)
- Generics (functions, interfaces, constraints, default generic types) — *1.5h*
- Utility types: `Partial`, `Pick`, `Omit`, `Record`, `Required`, `Readonly` — *0.75h*
- Mapped types & conditional types (`infer`, `keyof`, `typeof`) — *1h*
- Type inference deep dive — *0.5h*
- Declaration files (`.d.ts`), module augmentation basics — *0.25h*
- Strictness flags (`strict`, `noImplicitAny`, `strictNullChecks`) — *0.25h*
- TS with modern JS features (decorators overview — relevant for NestJS/TypeORM later) — *0.25h*
- Quick recap exercise tying JS async + TS typing together (e.g., typed API call wrapper) — *0.5h*

---

### How we'll work through this
Each day we'll go topic by topic — I'll explain the concept, we'll look at code examples, and I'll give you a few practice snippets or questions to check understanding before moving on. Let me know when you're ready to start **Day 1**.