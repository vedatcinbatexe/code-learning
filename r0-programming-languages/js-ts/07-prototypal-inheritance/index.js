/*
const animal = {
    eats: true,
    walk() {
        console.log('animal walking');
    }
};

const rabbit = {
    jumps: true,
    __proto__: animal
};

console.log(rabbit.eats);
console.log(rabbit.jumps);
rabbit.walk(); */

/*
const animal = {
    eats: true,
}

const rabbit = {
    jumps: true,
    __proto__: animal
};

console.log(rabbit.eats);

animal.eats = false;

console.log(rabbit.eats); */

/*
const animal = {
    eats: true,
    walk() {
        console.log('animal walking');
    }
};

const rabbit = Object.create(animal);
rabbit.jumps = true;

console.log(rabbit.eats);
console.log(Object.keys(rabbit));
console.log(rabbit.hasOwnProperty('eats'));
console.log(rabbit.hasOwnProperty('jumps')); */




/*
function Animal(name) {
    this.name = name;
    this.walk = function() {
        console.log(`${this.name} is walking`);
    }
}

Animal.prototype.walk = function() {
}
*/

/*

const dog = new Animal('Rex');
const cat = new Animal('Whiskers');

dog.walk();
cat.walk();

console.log(dog.walk === cat.walk); // Output: false (each instance has its own walk method) */

/*

class Animal {
    constructor(name) {
        this.name = name;
    }

    walk() {
        console.log(`${this.name} is walking`);
    }
}

const dog = new Animal('Rex');

console.log(typeof Animal);
console.log(Object.getPrototypeOf(dog) === Animal.prototype);
console.log(dog.hasOwnProperty('walk'));
console.log(Animal.prototype.hasOwnProperty('walk'));
 */

/*
class Animal {
  constructor(name) {
    this.name = name;
  }
  walk() {
    console.log(`${this.name} is walking`);
  }
}

class Dog extends Animal {
    bark() {
        console.log(`${this.name} says woof`);
    }
}

const rex = new Dog('Rex');

rex.walk();
rex.bark();
console.log(rex instanceof Dog);
console.log(rex instanceof Animal);
console.log(Object.getPrototypeOf(Dog.prototype) === Animal.prototype);
 */

class Animal {
    constructor(name) {
        this.name = name;
        console.log('Animal constructor ran');
    }
}

class Dog extends Animal {
    constructor(name, breed) {
        super(name);
        this.breed = breed;
        console.log('Dog constructor ran');
    }
}

const rex = new Dog('Rex', 'Labrador');
console.log(rex.name, rex.breed);
