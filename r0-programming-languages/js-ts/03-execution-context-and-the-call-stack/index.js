/*
function first() {
    console.log('In first');
    second();
    console.log('Back in first');
}

function second() {
    console.log('In second');
}

first(); */

function a() {
    console.log('In a');
    b();
    console.log('Back in a');
}

function b() {
    console.log('In b');
    c();
    console.log('Back in b');
}

function c() {
    console.log('In c');
}

a();

/*
a() called       → [Global, a]        logs: 'a start'
b() called       → [Global, a, b]     logs: 'b start'
c() called       → [Global, a, b, c]  logs: 'c'
c() returns/pops → [Global, a, b]     logs: 'b end'
b() returns/pops → [Global, a]        logs: 'a end'
a() returns/pops → [Global]
*/

/*
function recurse() {
    recurse();
}

recurse(); // Maximum call stack size exceeded */


function outer(){
    let a = 'outer var';

    function inner() {
        console.log(a);
    }

    inner();
}

outer();
