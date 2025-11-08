/* 
Module Pattern

Create a module that maintains a private variable and exposes methods to interact with it.
*/

const CounterModule = function () {
    let count = 0;

    return {
        increment: function () {
            count++
            return count
        },
        decrement: function () {
            count--
            return count
        },
        getCount: function () {
            return count;
        },
    }
}

/* 
console.log(CounterModule.increment()); // 1
console.log(CounterModule.increment()); // 2
console.log(CounterModule.getCount()); // 2 
*/

let CounterModule1 = CounterModule()
console.log(CounterModule1.increment()); // 1
console.log(CounterModule1.increment()); // 2
console.log(CounterModule1.getCount()); // 2

let CounterModule2 = CounterModule()
console.log(CounterModule2.getCount()); // 0

/* 
Class based Module Pattern
*/

class CounterModuleClass {
    // Private field (#count)
    #count = 0; // if you made this static count = 0; it will be shared between all the instances and in methods you can access using CounterModuleClass.count++

    increment() {
        this.#count++;
        return this.#count;
    }

    decrement() {
        this.#count--;
        return this.#count;
    }

    getCount() {
        return this.#count;
    }
}

const counter1 = new CounterModuleClass();
const counter2 = new CounterModuleClass();

counter1.increment(); // 1
counter1.increment(); // 2
console.log(counter1.getCount())

console.log(counter2.getCount()); // ✅ 0 (separate instance)

/* 

Mixing Singleton and Module pattern 
*/

class CounterModuleSingleton {
    static #instance;    // private static instance
    #count = 0;          // private field

    constructor() {
        // Prevent multiple instances
        if (CounterModuleSingleton.#instance) {
            return CounterModuleSingleton.#instance;
        }
        CounterModuleSingleton.#instance = this;
    }

    increment() {
        this.#count++;
        return this.#count;
    }

    decrement() {
        this.#count--;
        return this.#count;
    }

    getCount() {
        return this.#count;
    }
}

// Usage
const counter11 = new CounterModuleSingleton();
const counter22 = new CounterModuleSingleton();

counter11.increment(); // 1
counter11.increment(); // 2

console.log(counter22.getCount()); // ✅ 2 (same instance)
console.log(counter11 === counter22); // ✅ true