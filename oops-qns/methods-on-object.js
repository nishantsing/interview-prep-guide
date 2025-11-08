/* 
Object static methods:

Object.create(originalObject) - creates a new object, using an existing object as the prototype of the newly created object.

Object.assign(target, source) -copies all enumerable own properties from one or more source objects to a target object. It returns the modified target object.

Object.entries(obj) -  returns an array of a given object's own enumerable string-keyed property key-value pairs.

Object.freeze(obj) - static method freezes an object. Freezing an object prevents extensions and makes existing properties non-writable and non-configurable. A frozen object can no longer be changed: new properties cannot be added, existing properties cannot be removed, their enumerability, configurability, writability, or value cannot be changed, and the object's prototype cannot be re-assigned. freeze() returns the same object that was passed in. Throws an error in strict mode

Object.fromEntries(map) -  static method transforms a list of key-value pairs into an object.

Objec.hasOwn("property") - true if the specified object has the indicated property as its own property. If the property is inherited, or does not exist, the method returns false.

Object.setPrototypeOf(target, source) -  change an object's prototype 

Object Instance Methods: 
Object.prototype.hasOwnProperty()
Object.prototype.toString()
Object.prototype.valueOf()

Object Instance Properties:
 Object.prototype.__proto__
 Object.prototype.constructor
*/
/* 
Mixins for shared behavior

Implement a mixin to share behavior between different classes.
*/

// Mixin object
const CanFly = {
    fly() {
        console.log(`${this.name} can fly!`);
    }
};
class Bird {
    constructor(name) {
        this.name = name;
    }
}
// It copies all properties from CanFly into Bird.prototype.
// Bird.prototype.fly = CanFly.fly;
Object.assign(Bird.prototype, CanFly);
const parrot = new Bird('Parrot');
parrot.fly(); // "Parrot can fly!"

/* 
    Object.setPrototypeOf
*/

const animal = {
    speak() {
        return 'Animal noise';
    }
};
const dog = {
    bark() {
        return 'Woof!';
    }
};
Object.setPrototypeOf(dog, animal);
console.log(dog.speak()); // "Animal noise"
console.log(dog.bark()); // "Woof!"