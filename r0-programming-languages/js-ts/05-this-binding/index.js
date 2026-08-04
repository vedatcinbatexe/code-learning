/*
const person = {
    name: 'Alice',
    greet: function() {
        console.log(this.name);
    }
}

person.greet(); // Output: Alice
*/

/*

const person = {
    name: 'Alice',
    greet: function() {
        console.log(this.name);
    }
};

const detachedGreet = person.greet;

detachedGreet(); // Output: undefined (or throws an error in strict mode) */

/*
const person = {
    name: 'Alice',
    greet: function() {
        console.log(this.name);
    }
}

setTimeout(person.greet, 100); // Output: undefined (or throws an error in strict mode) */

/*
const person = {
    name: 'Alice',
    greet: function() {
        console.log(this.name);
    }
};

const boundGreet = person.greet.bind(person);

setTimeout(boundGreet, 100); // Output: Alice
 */


/*
const person = { name: 'Alice' };

function greet() {
    console.log(this.name);
}

greet.call(person); // Output: Alice
greet.apply(person); // Output: Alice
 */

const person = {
    name: 'Alice',
    greet: function() {
        setTimeout(() => {
            console.log(this.name);
        }, 100);
    }
};

person.greet(); // Output: Alice