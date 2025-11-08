/* 
Implement a Singleton Pattern

 Create a Singleton class in JavaScript that restricts the instantiation of a class to a single
 instance.
*/

class Singleton {
    constructor() {
        if (!Singleton.instance) {
            Singleton.instance = this;
        }
        return Singleton.instance
    }

    someMethod() {
        console.log("This method belongs to the singleton instance.");
    }
}

const instance1 = new Singleton();
const instance2 = new Singleton();
console.log(instance1 === instance2); // true


/* 
Prototypal based Singleton class
*/


function SingletonF() {
    if (typeof SingletonF.instance === "object") {
        return SingletonF.instance;
    }

    this.name = "Singleton Instance";
    SingletonF.instance = this;

    return this;
}

SingletonF.prototype.sayHello = function () {
    console.log(`Hello from ${this.name}`);
};

// ✅ Test
const s1 = new SingletonF();
const s2 = new SingletonF();

console.log(s1 === s2); // ✅ true
s1.sayHello();          // "Hello from Singleton Instance"