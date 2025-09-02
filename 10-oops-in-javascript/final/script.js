// 1. Class & Object

// A class is a blueprint.

// An object is an instance of that blueprint.

// Class (Blueprint)
class Car {
  constructor(brand, model) {
    this.brand = brand;
    this.model = model;
  }

  display() {
    console.log(`Car: ${this.brand} ${this.model}`);
  }
}

// Object (Instance)
const car1 = new Car("Toyota", "Corolla");
car1.display(); // Car: Toyota Corolla

// 2. Encapsulation

// Wrapping data (properties) and methods (functions) inside a class.

// You can make properties private using #.

class BankAccount {
  #balance; // private property

  constructor(owner, balance) {
    this.owner = owner;
    this.#balance = balance;
  }

  deposit(amount) {
    this.#balance += amount;
  }

  getBalance() {
    return this.#balance;
  }
}

const acc = new BankAccount("Vinoth", 1000);
acc.deposit(500);
console.log(acc.getBalance()); // 1500
// console.log(acc.#balance);  Error (private)

// 3. Abstraction

// Hiding implementation details and exposing only essential features.

// Achieved by defining methods that abstract away complexity.

class CoffeeMachine {
  start() {
    console.log("Starting machine...");
  }

  brewCoffee() {
    console.log("Brewing coffee...");
  }

  makeCoffee() {
    this.start();      // hides internal steps
    this.brewCoffee(); // hides internal steps
    console.log("Your coffee is ready!");
  }
}

const myCoffee = new CoffeeMachine();
myCoffee.makeCoffee();
// User doesn’t care about `start()` or `brewCoffee()`

// 4. Inheritance

// A class can inherit properties and methods from another class using extends.

class Animal {
  speak() {
    console.log("Animal makes a sound");
  }
}

class Dog extends Animal {
  speak() {
    console.log("Dog barks");
  }
}

const dog = new Dog();
dog.speak(); // Dog barks

// 5. Polymorphism

// The same method behaves differently depending on the object (method overriding).

class Shape {
  area() {
    return "Area formula not defined";
  }
}

class Circle extends Shape {
  constructor(radius) {
    super();
    this.radius = radius;
  }
  area() {
    return Math.PI * this.radius * this.radius;
  }
}

class Square extends Shape {
  constructor(side) {
    super();
    // super is used in derived (child) classes.
    // It calls the constructor of the parent class (must be called before using this in child constructor).
    // It can also call parent class methods.
    this.side = side;
  }
  area() {
    return this.side * this.side;
  }
}

const shapes = [new Circle(5), new Square(4)];
shapes.forEach(shape => console.log(shape.area()));
// 78.54...
// 16


// Prototype & Prototype Inheritance
// 1. What is a Prototype?

// Every JS object has a hidden property called [[Prototype]] (can be accessed via __proto__ or Object.getPrototypeOf()).

// This forms a prototype chain → if a property/method is not found on the object, JS looks up its prototype.

// 2. Example: Prototypal Inheritance
// Parent object
const animal = {
  type: "Animal",
  speak() {
    console.log(`${this.type} makes a sound`);
  }
};

// Child object inheriting from animal
const cat = Object.create(animal);
cat.type = "cat";
cat.speak(); // cat makes a sound
console.log(cat === animal); // false

/* No inheritance, just copies the reference
const cat = animal;
cat.type = "Cat";

console.log(animal.type); // Cat (changed!)
console.log(cat === animal); // true */

// Here, dog doesn’t have its own speak(), so it looks up to animal’s prototype.

// 3. Prototype in Classes (Under the Hood)
// When you use class, JS actually uses prototypes internally.
// Methods inside a class are added to the prototype.

class Person {
  greet() {
    console.log("Hello!");
  }
}

const p1 = new Person();
p1.greet(); // Hello!

console.log(Object.getPrototypeOf(p1) === Person.prototype); // true


// 4. Prototype Chain
// This chain allows property/method lookups all the way to the base Object

console.log(dog.__proto__ === animal);       // true
console.log(animal.__proto__ === Object.prototype); // true
console.log(Object.prototype.__proto__ === null);   // true

// this in JavaScript OOP
// 1. In a Class

// Inside class methods, this refers to the object instance.

class Personn {
  constructor(name) {
    this.name = name;
  }
  greet() {
    console.log(`Hi, I am ${this.name}`);
  }
}

const person1 = new Personn("Vinoth");
person1.greet(); // Hi, I am Vinoth

// 2. In a Simple Object
const user1 = {
  name: "Nila",
  sayName() {
    console.log(this.name);
  }
};

user1.sayName(); // Nila


// Here this → the object before the dot (user).

// 3. Losing this

// When you extract a method, this can be lost.

const user = {
  name: "Nila",
  sayName() {
    console.log(this.name);
  }
};

const fn = user.sayName;
fn(); // undefined (in strict mode) or global object in non-strict

// 4. Fixing this

// bind → lock this

// arrow functions → use lexical this

class Counter {
  constructor() {
    this.count = 0;
    this.counter = null;
    this.counter = setInterval(() => {
      this.count++;
      if(this.count >= 3)
        clearInterval(this.counter)
      console.log(this.count); // arrow keeps `this`
    }, 1000);
  }
}

new Counter();

// 1. Getters & Setters

// Getters (get) and setters (set) let you control access to properties in an encapsulated way.

class Userr {
  constructor(firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
  }

  // getter
  get fullName() {
    return `${this.firstName} ${this.lastName}`;
  }

  // setter
  set fullName(name) {
    const [first, last] = name.split(" ");
    this.firstName = first;
    this.lastName = last;
  }
}

const userr = new Userr("Vinoth", "Kumar");

console.log(userr.fullName); // Vinoth Kumar (getter looks like a property)

userr.fullName = "Nila Devi"; // calls setter
console.log(userr.firstName); // Nila
console.log(userr.lastName);  // Devi

// Why useful?

// Looks like properties (obj.prop) but actually runs functions behind the scenes.

// Good for validation, computed properties, and encapsulation.

// 2. Static Methods & Properties

// static belongs to the class itself, not instances.

// Useful for utility functions or constants.

class MathUtil {
  static PI = 3.14159;

  static add(a, b) {
    return a + b;
  }
}

console.log(MathUtil.PI);       // 3.14159
console.log(MathUtil.add(5, 3)); // 8

const m = new MathUtil();
// console.log(m.add(5,3));  Error (not accessible via instance)


// Why useful?

// Group utility functions inside a class.

// Shared constants (e.g., PI, conversion rates).

// Factory methods (MyClass.createInstance()).

/* 1. OOP Design Patterns in JavaScript

Singleton → Ensures only one instance of a class exists.
  Useful for things like:
    Configurations
    Database connections
    Logging services

Factory → creates objects without exposing logic.
  Useful when:
    You want flexible object creation
    You don’t want the client code to use new everywhere

Observer → one-to-many dependency, notify observers on changes. 
  Useful for:
    Event handling
    Real-time systems
    Pub/Sub models
*/