/*
CommonJS
const { add } = require('./math.js');

const res = add(1,2);

console.log(res);

*/

import { add } from './math.mjs' 
import add from './math.mjs'; // default import

const fs = require('fs'); // resolved immediately, line by line

import fs from 'fs'; // hoisted, resolved before any module code runs

// Hoisting
console.log(add(1,2)); // works
import { add } from './math.mjs';

// this at module top level
// CJS
console.log(this); // {} (module.exports, effectively)

// ESM
console.log(this); // undefined

// __dirname / __filename
// CJS
console.log(__dirname, __filename);

// ESM: NOT avilable - must derive manually
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// ESM
import { count, increment } from './counter.mjs';
console.log(count) // 0
increment();
console.log(count) // 1 - the import is a LIVE BINDING, it tracks the source

// CJS
const { counter, increment } = require('./counter');
console.log(count); // 0
increment();
console.log(count); // still 0 - you got a COPY of the value at require-time