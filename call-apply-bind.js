/* 
Call, Apply, Bind

*/

/* 
Using `call` to Change Context
how to use `call` to borrow methods from another object.
- calls the function immediately, with arguments passed individually
*/
const person = {
    firstName: 'John',
    lastName: 'Doe'
};

function fullName() {
    return `${this.firstName} ${this.lastName}`;
}
console.log(fullName.call(person)); // "John Doe"

/* 
Using `apply` with an Array
how to use `apply` to invoke a function with an array of arguments.
- calls the function immediately, with arguments passed as an array
*/

function sum(x, y) {
    return x + y;
}

const numbers = [5, 10];
console.log(sum.apply(null, numbers)); // 15

/* 
Using `bind` to Create new function
how to use `bind` to create a new function that has a specific context.
- does not call the function immediately, but returns a new function with bound this
*/

const user = {
    name: 'Jane',
    greet: function () {
        console.log(`Hello, my name is ${this.name}.`);
    }
};
// const greetUser = user.greet
// greetUser() // undefined

// user.greet() // "Hello, my name is Jane."
const greetUser = user.greet.bind(user);
greetUser(); // "Hello, my name is Jane."

/* 
Using Bind for partial application of arguments
*/

function multiply(a, b) {
    return a * b
}

const double = multiply.bind(null, 2); // // Partial application of the first argument
console.log(double(5)); // 10

// Borrowing Methods

const user1 = {
    name: 'Alice',
    age: 25,
};
const user2 = {
    name: 'Bob',
    age: 30,
};
function displayInfo() {
    console.log(`${this.name} is ${this.age} years old.`);
}
displayInfo.call(user1); // "Alice is 25 years old."
displayInfo.call(user2); // "Bob is 30 years old."


/* 
Simple Example to understand all three at once.
*/

const person1 = {
    name: "Nishant",
};

function greet(greeting, punctuation) {
    console.log(`${greeting}, ${this.name}${punctuation}`);
}


greet.call(person1, "Hello", "!");
// Output: Hello, Nishant!


greet.apply(person1, ["Hi", "!!"]);
// Output: Hi, Nishant!!

const boundGreet = greet.bind(person1, "Hey");
boundGreet("?");




/* 
`apply` to convert an array-like object to an array.
*/
// Inside every non-arrow function, arguments is an array-like object containing all the arguments passed to that function. However, it’s not a real array — it doesn’t have array methods like .map() or .forEach().
function logArguments() {
    console.log(Array.from(arguments)); // Convert arguments to an array
}

const arrayLike = {
    0: 'Hello',
    1: 'World',
    length: 2
};

logArguments.apply(null, Array.from(arrayLike)); // ["Hello", "World"]

// Modern Way
// It gathers all arguments into a real array called args. No need for arguments or Array.from(arguments) anymore.
function logArguments(...args) {
    console.log(args);
}

const arrayLike1 = {
    0: 'Hello',
    1: 'World',
    length: 2
};

logArguments(...Array.from(arrayLike1)); // ["Hello", "World"]
// logArguments("Hello", "World")