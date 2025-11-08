# Concepts/ Questions

## Console

#### To print an object
console.log({obj}) // obj: {}

## Falsy values in JS

```js

const result = 0 || null || undefined || '' || false || NaN || 'Hello';
 console.log(result); // Hello

```
- The `||`operator returns the first truthy value it encounters. All the values before `'Hello'`are falsy, so `'Hello'`is returned.

## Short Circuit Evaluation with &&

```js
 const result = true && 'JavaScript' && 42 && null && 'End';
 console.log(result) // null

```
- The `&&`operator returns the first falsy value it encounters, or the last truthy value if all are truthy. In this case, `null`is falsy, so it's returned.

## Optional Chaining

```js
const person = {
  name: 'Alice',
  address: {
    city: 'Wonderland'
  }
};

console.log(person.address?.city); // Wonderland
console.log(person.contact?.phone); // undefined

const obj = {
 greet() {
    return 'Hello';
 }
};
console.log(obj.greet?.()); // Hello
console.log(obj.nonExistentFunction?.()); // undefined

```
- The optional chaining (`?.`) operator allows you to access deeply nested properties safely. If `contact`is `undefined`, it won’t throw an error, and `undefined`will be returned.

- Optional chaining (`?.`) can be used for safe function calls. In `obj.greet?.()`, since `greet` exists, the function is called, and "Hello" is returned. For `obj.nonExistentFunction?.()`, the function does not exist, so `undefined`is returned instead of throwing an error.

#### Optional Chaining with Arrays
```js
const arr = [[1, 2], [3, 4]];
console.log(arr[1]?.[1]); // 4
console.log(arr[2]?.[1]); // undefined

```
- Optional chaining (`?.`) allows you to safely access deeply nested properties without causing a runtime error if any part of the chain is `null`or `undefined`. In this example, `arr[1]?.[1]` evaluates to `4`because the value exists, but `arr[2]?.[1]`is `undefined`because `arr[2]`is `undefined`(no third element in the array).

## Nullish Coalescing Operator (??)
```js
let a = null;
 let b = 'default';
console.log(a ?? b); // default

```
-  The nullish coalescing operator (`??`) returns the right-hand side operand when the left-hand side operand is `null`or `undefined`. In this case, since `a`is `null`, `b`(`'default'`) is returned. This operator is useful when handling potential `null`or `undefined`values.

## Difference between `null`and `undefined`
```js
let a;
let b = null;
console.log(a == b); // true
console.log(a === b); // false

```
- `a`is `undefined`because it has been declared but not initialized, while `b`is explicitly assigned the value `null`.
- In the loose equality comparison (`==`), `undefined`and `null`are considered equal. However, in the strict equality comparison (`===`), they are different types, so `false`is returned.

## Scope

```js

if (true) {
 var x = 5;
 }
 console.log(x); // 5


var x = 10;
 if (true) {
 let x = 20;
 console.log(x); // 20
 }
 console.log(x); // 10
```
- Variables declared with `var`are function-scoped, not block-scoped. Even though `x`is inside
 the `if`block, it’s accessible outside of it.

#### Hoisting
```js
// Fn Hoisting
hoisted();
 function hoisted() {
 console.log('Hoisted function'); // Hoisted function
 }

//  Hoisting with `let`and `var`
console.log(a); // undefined
 var a = 5;
 console.log(b); // ReferenceError
 let b = 10;

 console.log(foo()); // 'Hello'
 function foo() {
 return 'Hello';
 }
```
-  Function declarations are hoisted to the top of their scope, meaning you can call the function before it is defined in the code.
  
-  Variables declared with `var`are hoisted to the top of their scope and initialized as `undefined`, so `console.log(a)`works but logs `undefined`.
- Variables declared with `let`and `const`are also hoisted, but they are placed in the "temporal dead zone" (TDZ) until they are initialized. Therefore, `console.log(b)`throws a `ReferenceError` because `b`is in the TDZ when accessed.

- In JavaScript, function declarations are hoisted to the top of their scope. This means the entire function `foo()`is available before it is invoked, even if it appears later in the code. Therefore, calling `foo()`before its declaration works as expected and returns `'Hello'`.


## Currying
```js
 function multiply(a) {
    return function(b) {
        return a * b;
    };
 }
 const double = multiply(2);
 console.log(double(5)); // 10

function multiply(a) {
  return function(b) {
    return function(c) {
      return a * b * c;
    };
  };
}

console.log(multiply(2)(3)(4)); // 24


```
- Currying is a functional programming technique where a function with multiple arguments is
 broken down into a series of functions that each take one argument. Here, `multiply(2)`returns a new function that multiplies its argument by `2`. When `double(5)`is called, it returns `10`.

 - Currying is a technique where a function with multiple arguments is transformed into a
 sequence of functions, each taking one argument. In this example, `multiply(2)(3)(4)`
 successively applies the values `2`, `3`, and `4`to the curried functions, eventually returning the product `24`.

## this Binding

```js
 function show() {
 'use strict';
 console.log(this);
}
 show(); //  undefined

```
- In strict mode, `this`inside a regular function (not bound to any object) is `undefined`. Without strict mode, `this`would default to the global object (`window`in browsers).

#### Arrow Functions

```js
const person = {
  name: 'John',
  greet: function() {
    setTimeout(() => {
      console.log(`Hello, ${this.name}`); //  Hello, John
    }, 1000);
  }
};

person.greet();

const obj = {
  value: 42,
  getValue: function() {
    return () => this.value; // arrow function
  }
};

const getValue = obj.getValue();
console.log(getValue()); // 42


```
- Arrow functions don’t have their own `this`context. They capture `this`from the surrounding
 lexical scope, which is the `person`object in this case.  In this case, the `this`inside the arrow function in `setTimeout`refers to the `person`object, allowing it to access `this.name`and log `'Hello, John'`.
- Therefore, `this.name`correctly refers to `John`.

-  Arrow functions do not have their own `this`context; they inherit `this`from the parent scope where they are defined. In this example, the arrow function inside `getValue`captures `this` from the `getValue`method, which points to `obj`, thus allowing `getValue()`to access
 `obj.value`and return `42`

#### Using `this`in Different Contexts

```js
 const person = {
    name: 'Alice',
     greet() {
        console.log(`Hello, my name is ${this.name}`);
    }
 };
 const greet = person.greet;
 greet(); //Hello, my name is undefined

```
- When a method is called without an explicit object context (like in `greet()`), `this`defaults to the global object (or `undefined`in strict mode). In this case, `this.name`is `undefined`because `this`does not refer to `person`. This demonstrates how `this`is determined by how a function `is called, not where it is defined.

#### Function Binding with `bind()`
```js
const person = {
  name: 'Alice',
  greet: function() {
    console.log(`Hello, ${this.name}`);
  }
};

const greet = person.greet.bind({ name: 'Bob' });
greet(); // Hello, Bob


 const obj = {
    value: 42
 };
 function getValue() {
    return this.value;
 }
 const boundGetValue = getValue.bind(obj);
 console.log(boundGetValue()); // 42
```
-  The `bind()`method creates a new function that, when called, has its `this`value set to the provided argument. In this case, the `greet`function is bound to the object `{ name: 'Bob' }`, so when `greet()`is called, it logs `"Hello, Bob"`, even though the original function was associated with `person`.
  
- The `bind()`method creates a new function that, when called, has its `this`keyword set to the provided value. In this example, `boundGetValue`is created by binding `getValue`to `obj`, allowing it to access `obj.value`and return `42`.


## Event Loop

```js
console.log('Start');
setTimeout(() => {
  console.log('Timeout');
}, 0);
console.log('End');

/* 
Output:
Start
End
Timeout
*/
```
- The `setTimeout`with `0ms`delay doesn’t execute immediately. It is pushed to the event loop's queue, meaning it will be executed after the synchronous code is done.
- First, "Start" is logged, followed by "End". Once the stack is clear, the `setTimeout`callback is executed, logging "Timeout".

```js
console.log('Start');
const promise = new Promise((resolve) => {
console.log('Promise');
resolve();
});
promise.then(() => console.log('Resolved'));
console.log('End');

// Output:
//  Start
//  Promise
//  End
//  Resolved
```
- The `Promise`constructor runs synchronously, so "Promise" is logged immediately after "Start".
- However, `.then()`callbacks are asynchronous and are placed in the microtask queue. Thus,
 End" is logged first, and only after the synchronous code is finished, "Resolved" is logged.

```js
console.log('Start');
setTimeout(() => console.log('Timeout'), 0);
Promise.resolve().then(() => console.log('Promise'));
console.log('End');


```
- JavaScript's event loop handles execution order. First, synchronous code (`console.log('Start')` and `console.log('End')`) runs. Promises (`Promise.resolve().then(...)`) are added to the microtask queue, which has higher priority than the task queue (where `setTimeout`callbacks are placed). Therefore, `"Promise"`is logged before `"Timeout"`.

## typeof 

```js
 console.log(typeof null); // object
 console.log(typeof []); // object
 console.log(typeof function() {}); // function

```
- In JavaScript, `typeof null`is a known quirk and returns `"object"`, even though `null`is not an object.
- Arrays are also considered objects, so `typeof []`returns `"object"`.
- Functions, however, have their own type, so `typeof function() {}`returns `"function"`

## Closure

```js
for (var i = 0; i < 3; i++) {
 setTimeout(() => console.log(i), 1000); // 3 3 3 
}

function outerFunction() {
  let outerVariable = 'I am outside!';

  function innerFunction() {
    console.log(outerVariable);
  }

  return innerFunction;
}

const closureFunction = outerFunction();
closureFunction(); // logs: 'I am outside!'



```
- The `var`keyword has function scope, meaning by the time the `setTimeout`callbacks run, the
 loop has completed, and `i`is `3`.
- The solution would be to use `let`(which has block scope) or an IIFE (Immediately Invoked
 Function Expression) to capture the value of `i`at each iteration.

 - A closure is a function that retains access to its lexical scope, even when the function is executed outside that scope. In this example, `innerFunction`is returned from `outerFunction`, allowing it to access `outerVariable`, which exists in the outer function's scope. Calling `closureFunction` logs `'I am outside!'`despite `outerFunction`having finished executing.

#### Closure with Lexical Environment
```js
function outer() {
  let count = 0;
  return function inner() {
    count++;
    return count;
  };
}

const counter = outer();

console.log(counter()); // 1
console.log(counter()); // 2
console.log(counter()); // 3


 function makeCounter() {
    let count = 0;
    return function() {
        count += 1;
        return count;
    };
 }
 const counter = makeCounter();
 console.log(counter()); // 1
 console.log(counter()); // 2

```
- Closures allow a function to remember and access variables from its lexical environment even after it has returned. The `inner`function maintains access to the `count`variable from `outer`, so each time `counter()`is called, `count`is incremented, and the new value is returned.
  
-  A closure is a function that retains access to its lexical scope even when the function is executed outside that scope. Here, `makeCounter`creates a private variable `count`. Each call to `counter()`increments and returns `count`, demonstrating how closures maintain state between function calls.

## Destructuring

#### Array Destructuing 
```js
const [a, ...b] = [1, 2, 3, 4];
console.log(a, b) // 1 [2, 3, 4]
```
-  Array destructuring allows extracting values from arrays. The first value `1`is assigned to `a`.
- The rest of the array `[2, 3, 4]`is captured by the `...b`rest operator.

#### Destructuring with Default values
```js
 const {a = 10, b = 20} = {a: 5};
 console.log(a, b); // 5 20

 const [a = 5, b = 10] = [1];
 console.log(a); // 1
 console.log(b); // 10


const user = { name: 'John' };
 const { name, age = 30 } = user;
 console.log(name); // John
 console.log(age); // 30

```
-  Destructuring allows for setting default values. The value of `a`is already provided as `5`, so the default `10`is ignored. Since `b`is not provided, it defaults to `20`.

- In array destructuring, default values can be provided for variables if there is no value in the array at that position. Here, `a`gets the value `1`from the array, but `b`does not have a corresponding value in the array, so it uses the default value of `10`.

-  When destructuring an object, you can assign default values to variables. In this case, `age`is not present in the `user`object, so it defaults to `30`. This provides a fallback value in case the property is `undefined`or missing.

### Rest and Spread with Object Destructuring

```js
 const person = {name: 'John', age: 30, job: 'Developer'};
 const {name, ...rest} = person;
 console.log(name); // John
 console.log(rest); // {age: 30, job: 'Developer'}

 const numbers = [1, 2, 3];
 const maxNumber = Math.max(...numbers);
 console.log(maxNumber); // 3
```
-  In object destructuring, the rest operator (`...rest`) allows you to collect the remaining
 properties of the object into a new object. In this case, `name`is extracted, and the rest of the properties (`age`and `job`) are gathered into a new object `rest`, which contains `{ age: 30, job: 'Developer' }`

 -  The spread operator `...`allows an iterable (like an array) to be expanded in places where zero or more arguments are expected. In this example, it spreads the elements of the `numbers`array into `Math.max()`, effectively finding the maximum number in the array, which is `3`.
  

#### Object Destructuring
```js
 const person = { name: 'Alice', age: 25, location: 'Wonderland' };
 const { name, age } = person;
 console.log(name, age); //  Alice 25
```
-  Object destructuring allows you to unpack properties from objects into distinct variables. In this example, `name`and `age`are extracted from the `person`object, allowing direct access to these properties without needing to reference the object itself.

## Object

#### Default methods on empty object or any object
- when you create an object like {} or new Object() it has constructor, hasOwnProperty(), isPrototypeOf(), propertyIsEnumerable(), toString(), toLocaleString(), valueOf(), __proto__ as default in Object.prototype

`const obj = Object.create(null);` 
- the new object’s prototype is null, meaning:
Characteristics of an object with a null prototype:

- It does **not inherit** from `Object.prototype`.  
  → So it has **no** methods like:
  - `.toString()`
  - `.hasOwnProperty()`
  - `.valueOf()`
  - `.isPrototypeOf()`

- It’s a **pure dictionary object**, great for key-value maps where you want:
  - No accidental key collisions with inherited properties.
  - Cleaner iteration with `for...in`.

#### Object Property Shortcuts
```js
 const name = 'Alice';
 const age = 25;
const person = { name, age };
console.log(person); // { name: 'Alice', age: 25 }

```
-  When the variable name is the same as the object property name, you can use the shorthand
 syntax in object literals. Instead of writing `name: name`, you can simply write `{ name }`. This is a concise way to create objects when the property names match the variable names

#### Dynamic Object Keys
```js
const key = 'name';
const person = {
  [key]: 'Alice', // computed property
  age: 25
};

console.log(person.name); // Alice


```

- You can define object keys dynamically using computed property names. By wrapping an
 expression in square brackets, you can use the value of a variable (`key`in this case) as the property name. Here, `person`has a property named `'name'`with the value `'Alice'`, which is accessed using `person.name`

 #### Object Iteration with `for...in`

 ```js
const car = {
  make: 'Toyota',
  model: 'Camry',
  year: 2021
};

for (const key in car) {
  console.log(`${key}: ${car[key]}`);
}

/*  make: Toyota
 model: Camry
 year: 2021 */

 ```

 - The `for...in`statement iterates over the enumerable properties of an object. In this case, it goes through each property in the `car`object, logging both the key and the corresponding value. It's important to note that `for...in`may also iterate over properties inherited through the prototype chain unless filtered with `hasOwnProperty()`.

#### Object.entries() and Object.fromEntries()
```js
const obj = { a: 1, b: 2, c: 3 };
 const entries = Object.entries(obj);
 console.log(entries); // [['a', 1], ['b', 2], ['c', 3]]
 const newObj = Object.fromEntries(entries);
 console.log(newObj); // { a: 1, b: 2, c: 3 }

 /* 
  [['a', 1], ['b', 2], ['c', 3]]
 {a: 1, b: 2, c: 3 }
 */

 const obj = { x: 1, y: 2, z: 3 };
 Object.entries(obj).forEach(([key, value]) => {
    console.log(`${key}: ${value}`);
 });

 /* 
 x: 1
 y: 2
 z: 3
 */
```

- `Object.entries()`converts an object into an array of its key-value pairs. `Object.fromEntries()` does the reverse, transforming an array of key-value pairs back into an object. In this case, `Object.entries(obj)`produces an array of entries, which can be converted back to an object using `Object.fromEntries()`.
  
- `Object.entries()`returns an array of a given object's own enumerable string-keyed property `[key, value]`pairs. The `forEach()`method is then used to iterate over these entries, logging each key-value pair in the format `key: value`.

#### Using `Object.keys()`to Retrieve Keys
```js
 const obj = { a: 1, b: 2, c: 3 };
 const keys = Object.keys(obj);
 console.log(keys); //  ['a', 'b', 'c']

```

-  `Object.keys()`returns an array of a given object's own enumerable property names (keys). In this example, it retrieves the keys of the `obj`object, resulting in `['a', 'b', 'c']`.

#### Freezing and Mutation

```js
 const obj = Object.freeze({a: 1});
 obj.a = 2;
 console.log(obj.a); // 1

```
- `Object.freeze()`makes an object immutable. Any attempts to modify its properties are silently ignored (in non-strict mode).
- Since the object is frozen, `obj.a`remains `1`.

#### Object Shallow Copy with `Object.assign`

```js
const original = {a: 1, b: {c: 2}};
const copy = Object.assign({}, original);
copy.b.c = 3;
console.log(original.b.c); // 3

```
-  `Object.assign()`creates a shallow copy of an object, meaning only the top-level properties are copied. Nested objects (like `b`) still reference the same object. Changing `copy.b.c`affects `original.b.c`, as both `copy.b`and `original.b`refer to the same object.
  
#### Using `Object.assign()`for Merging Objects
```js
const obj1 = { a: 1, b: 2 };
 const obj2 = { b: 3, c: 4 };
 const mergedObj = Object.assign({}, obj1, obj2);
 console.log(mergedObj); //  { a: 1, b: 3, c: 4 }
```
- `Object.assign()`is used to copy the values of all enumerable own properties from one or more source objects to a target object. In this example, properties from `obj1`and `obj2`are merged into a new object. If a property exists in both source objects (like `b`), the last object's value is used, resulting in `b: 3`.

#### Object Shallow vs Deep Copy
```js
const obj1 = {a: 1, b: {c: 2}};
const obj2 = JSON.parse(JSON.stringify(obj1));
obj2.b.c = 3;
console.log(obj1.b.c); // 2


const obj1 = {a: 1, b: {c: 2}};
 const obj2 = {...obj1};
 obj2.b.c = 3;
 console.log(obj1.b.c); // 3

```
- `JSON.parse(JSON.stringify(obj1))`creates a deep copy of `obj1`. It converts the object to a JSON string and back, ensuring that nested objects are cloned. When `obj2.b.c`is changed to
3`, it doesn’t affect `obj1.b.c`because they are no longer referencing the same object in
memory.

- The spread operator (`{...obj1}`) creates a shallow copy of `obj1`. This means that while the top-level properties are copied, nested objects (`b`in this case) still reference the same object in memory. Thus, modifying `obj2.b.c`also changes `obj1.b.c`because they share the same reference for `b`.
  
```js
const obj = {};
Object.defineProperty(obj, 'prop', {
  value: 42,
  writable: false
});

obj.prop = 100;
console.log(obj.prop); // 42

```
-  `Object.defineProperty()`allows control over the attributes of object properties. In this case, writable`is set to `false`, meaning the `prop`value cannot be changed. Even though `obj.prop = 100`is attempted, the change does not occur, and `obj.prop`remains `42`
  
```js
const obj = {
    value: 100,
    getValue(){
        return this.value
    }
}

const getValue = obj.getValue;
console.log(getValue()); // undefined
console.log(obj.getValue()); // 100

```
- In JavaScript, `this` refers to the object from which the method was called. In `obj.getValue()`, `this` refers to `obj`, so it correctly returns `100`.
- However, when `getValue()`is called as a standalone function, `this`defaults to the global
 object (`window`in browsers). Since `value`is not defined globally, it returns `undefined`. To fix this, you can bind `getValue`to `obj`using `.bind()`or use arrow functions, which do not have their own `this`.

#### Object Freezing with `Object.freeze()`
```js
const obj = {name: 'John'};
 Object.freeze(obj);
 obj.name = 'Jane';
 console.log(obj.name); // John

```
- `Object.freeze()`makes an object immutable. Once an object is frozen, its properties cannot be modified, added, or deleted. In this case, trying to change `obj.name`to `'Jane'`has no effect, and `obj.name`remains `'John'`.

#### Understanding `instanceof`Operator

```js
function Animal() {}
 function Dog() {}
 Dog.prototype = Object.create(Animal.prototype);
 const myDog = new Dog();
 console.log(myDog instanceof Dog); // true
 console.log(myDog instanceof Animal); // true

```
- The `instanceof`operator checks if an object is an instance of a constructor or its prototype chain. Since `Dog.prototype`is created from `Animal.prototype`, `myDog`is an instance of both `Dog`and `Animal`. Therefore, both `instanceof`checks return `true`.

## Math
#### Math.PI - static property

#### Math.round() - static Methods
```js
const numbers = [1.5, 2.8, 3.2];
 const roundedNumbers = numbers.map(Math.round);
 console.log(roundedNumbers); //  [2, 3, 3]

```
- The `Math.round()`method rounds a number to the nearest integer. In this example, `map()`is used to apply `Math.round`to each element in the `numbers`array, resulting in a new array of rounded values: `[2, 3, 3]`.

#### Math.random() and Math.floor() / ceil() / min()/ max() / abs() / sqrt() / trunc() / pow()

```js
function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

console.log(getRandomInt(3));
// Expected output: 0, 1 or 2

console.log(getRandomInt(1));
// Expected output: 0

console.log(Math.random());
// Expected output: a number from 0 to <1


```



## String

#### split
```js
 const str = 'Hello,World,JavaScript';
 const result = str.split(',');
 console.log(result); //  ['Hello', 'World', 'JavaScript']

```
-  The `split()`method splits a string into an array of substrings based on a specified separator. In this case, the string is split by commas, resulting in an array containing the substrings `'Hello'`, `'World'`, and `'JavaScript'`.

#### Using `String.prototype.includes()`
```js
const str = 'Hello, World!';
 console.log(str.includes('World')); // true
 console.log(str.includes('JavaScript')); // false
```
- The `includes()`method determines whether one string can be found within another string, returning `true`or `false`. In this case, it checks for the presence of `'World'`, which returns `true`, and checks for `'JavaScript'`, which returns `false`.

#### Using `String.prototype.replace()`
```js
 const str = 'Hello, World!';
 const newStr = str.replace('World', 'JavaScript');
 console.log(newStr); //  Hello, JavaScript!
```
-  The `replace()`method returns a new string with some or all matches of a pattern replaced by a replacement. In this case, `'World'`is replaced with `'JavaScript'`, producing the new string `'Hello, JavaScript!'`.

#### String Methods - `slice()`vs. `substring()`
```js
 const str = 'Hello, World!';
 console.log(str.slice(0, 5)); // Hello
 console.log(str.substring(0, 5)); // Hello
console.log(str.slice(-6));// World!
 console.log(str.substring(-6));// Hello
```
- The `slice()`method extracts a section of a string and returns it as a new string. It can accept negative indices, which count back from the end of the string. The `substring()` method, on the other hand, does not support negative indices and treats them as `0`. In this example, `slice(-6)`correctly extracts `'World!'`, while `substring(-6)`returns the full string from the start, which is `'Hello, World!'`.

## Array

#### Using the `slice()`Method

```js
const arr = [1, 2, 3, 4, 5];
 const slicedArr = arr.slice(1, 4);
 console.log(slicedArr); // [2, 3, 4]

 const array = [1, 2, 3, 4, 5];
 const newArray = array.slice(-3);
 console.log(newArray); // [3, 4, 5]

```
- The `slice()`method returns a shallow copy of a portion of an array into a new array object
 selected from `start`to `end`(end not included). In this example, it extracts elements from
 index `1`to `4`, producing a new array `[2, 3, 4]`.

- The `slice()`method can accept negative indices, which count back from the end of the array. In this example, `slice(-3)`retrieves the last three elements of the `array`, resulting in `[3, 4, 5]`.

#### Using `forEach()`Method
```js
 const numbers = [1, 2, 3, 4, 5];
 let sum = 0;
 numbers.forEach(num => {
    sum += num;
 });
 console.log(sum); // 15

```
 -The `forEach()`method executes a provided function once for each array element. In this case, it iterates through the `numbers`array and accumulates the sum of all elements. The result is `15`, as it adds up `1 + 2 + 3 + 4 + 5`.

#### `for...in`vs `for...of`

```js
const arr = ['a', 'b', 'c'];

for (const index in arr) {
  console.log(index); // logs indices
}

for (const value of arr) {
  console.log(value); // logs values
}


```
- for...in Iterates over the keys (or indices) of an object or array. For the array arr = ['a', 'b', 'c'], it logs the indices:(`0`, `1`, `2`).
- for...of Iterates over the values of an iterable. For the same array, it logs the values:  (`a`, `b`,`c`).

#### Using `Array.prototype.unshift()`
```js
 const arr = [2, 3, 4];
 arr.unshift(1);
 console.log(arr); //  [1, 2, 3, 4]
```
- The `unshift()`method adds one or more elements to the beginning of an array and returns the new length of the array. In this example, `1`is added to the front of `arr`, resulting in `[1, 2, 3, 4]`.

#### Using `Array.prototype.shift()`
```js
const arr = [1, 2, 3, 4];
 const firstElement = arr.shift();
 console.log(firstElement); // 1
 console.log(arr); //  [2, 3, 4]
```
- The `shift()`method removes the first element from an array and returns that removed
 element. Here, `1`is removed from `arr`, and the modified array becomes `[2, 3, 4]`.

#### reverse
```js
const str = 'Javascript'
const reverseArray = str.split('').reverse()
console.log(reverseArray) 

```

#### `Array.prototype.concat()`

```js
const arr1 = [1, 2];
 const arr2 = [3, 4];
const combined = arr1.concat(arr2);
 console.log(combined); // [1, 2, 3, 4]

console.log([...arr1, ...arr2])
```

-  The `concat()`method is used to merge two or more arrays. It returns a new array containing the values from the original arrays without modifying them. In this case, it combines `arr1`and arr2`into a new array `[1, 2, 3, 4]`.

#### join

```js
const str = 'Javascript'
const reverseStr = str.split('').reverse().join('')
console.log(reverseStr)  // tpircSavaJ

```

#### Using `Array.from()`to Create Arrays

```js
const set = new Set(['a', 'b', 'c']);
 const arr = Array.from(set);
 console.log(arr); //  ['a', 'b', 'c']

```
- `Array.from()`creates a new Array instance from an array-like or iterable object. In this example, a `Set`is passed to `Array.from()`, converting it into an array. This method is particularly useful for transforming data structures into arrays.

#### Using `Array.prototype.includes()`
```js
 const numbers = [1, 2, 3, 4, 5];
 console.log(numbers.includes(3)); // true
 console.log(numbers.includes(6)); // false

 const fruits = ['apple', 'banana', 'mango'];
 console.log(fruits.includes('banana')); // true
 console.log(fruits.includes('grape')); // false

```
- The `includes()`method determines whether an array includes a certain value among its
 entries, returning `true`or `false`as appropriate. In this example, `numbers.includes(3)`
 returns `true`, while `numbers.includes(6)`returns `false`, indicating the absence of `6`in the array.

- The `includes()`method determines whether an array includes a certain value among its
 entries, returning `true`or `false`. In this case, it checks for the presence of `'banana'`and `'grape'`, returning `true`for `'banana'`and `false`for `'grape'`.

#### Using `Array.prototype.splice()`

```js
const fruits = ['apple', 'banana', 'cherry', 'date'];
 fruits.splice(2, 1, 'blueberry');
 console.log(fruits); //  ["apple", "banana", "blueberry", "date"]


 const arr = [1, 2, 3, 4, 5];
 const removed = arr.splice(2, 1)
 console.log(arr); // [1, 2, 4, 5]
 console.log(removed); // [3]
```
-  The `splice()`method changes the contents of an array by removing or replacing existing
 elements and/or adding new elements in place. In this case, it starts at index `2`, removes `1` element (`'cherry'`), and adds `'blueberry'`in its place. The resulting array is `['apple', 'banana', 'blueberry', 'date']`.

- The `splice()`method changes the contents of an array by removing or replacing existing elements and/or adding new elements in place. In this example, it removes one element at index 2`(the value `3`), modifying `arr`to `[1, 2, 4, 5]`and returning the removed elements in a ` new array `[3]`.

####  Array `sort`with Numbers
```js
const arr = [10, 1, 5, 2];
 arr.sort();
 console.log(arr); //  [1, 10, 2, 5]

const users = [
  { name: 'John', age: 30 },
  { name: 'Alice', age: 25 },
  { name: 'Bob', age: 35 }
];

users.sort((a, b) => a.age - b.age);

console.log(users);


const fruits = ['banana', 'apple', 'orange'];
 fruits.sort();
 console.log(fruits); // ["apple", "banana", "orange"]


```
-  By default, `sort()`converts array elements to strings and compares their UTF-16 code unit
 values. Hence, the order is based on the string representation (`'1'`, `'10'`, `'2'`, `'5'`). To sort numbers properly, you need to pass a compare function like `(a, b) => a - b`.

- The `sort()`method sorts the elements of an array in place. In this case, it compares the `age` properties of the objects in the `users`array and sorts them in ascending order. The callback function `a.age - b.age`ensures that the array is sorted by the `age`values of the user objects.

- The `sort()`method, when called on an array of strings, sorts the elements in lexicographical (alphabetical) order by default. In this case, `['banana', 'apple', 'orange']`is sorted as `['apple', 'banana', 'orange']`.


#### Using `filter()`Method
```js
const numbers = [1, 2, 3, 4, 5, 6];
 const evenNumbers = numbers.filter(num => num % 2 === 0);
 console.log(evenNumbers); //  [2, 4, 6]


const numbers = [1, 2, 2, 3, 4, 4, 5];
 const uniqueNumbers = numbers.filter((value, index, self) => self.indexOf(value) ===
 index);
 console.log(uniqueNumbers); //  [1, 2, 3, 4, 5]
```
- The `filter()`method creates a new array with all elements that pass the test implemented by the provided function. In this example, the arrow function checks if each number is even,
resulting in an array containing only the even numbers: `[2, 4, 6]`.

- This code snippet uses `filter()`to create a new array with unique values. The condition checks if the current index of the value matches the first occurrence of that value (`self.indexOf(value)`). This effectively filters out duplicates, resulting in an array of unique numbers.
  
#### `Array.prototype.find()`
```js
const users = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
  { id: 3, name: 'Charlie' }
];

const user = users.find(user => user.id === 2);
console.log(user); //  { id: 2, name: 'Bob' }

```
-  The `find()`method returns the first element in the array that satisfies the provided testing function. In this example, it looks for a user object where `id === 2`. When it finds such a user (`{ id: 2, name: 'Bob' }`), it returns that object.
  
####  `Array.prototype.every()`
```js
const numbers = [1, 2, 3, 4, 5];
 const allPositive = numbers.every(num => num > 0);
 console.log(allPositive); // true


  const numbers = [2, 4, 6, 8];
 const allEven = numbers.every(num => num % 2 === 0);
 console.log(allEven); // true

```
- The `every()`method tests whether all elements in an array pass a provided test. It returns
 `true`if all elements satisfy the condition, and `false`otherwise. In this case, it checks if every number in the `numbers`array is greater than `0`, and since all elements are positive, it returns `true`.


#### Using `Array.prototype.some()`
```js
const numbers = [1, 3, 5, 8];
 const hasEven = numbers.some(num => num % 2 === 0);
 console.log(hasEven); // true

```
- The `some()`method tests whether at least one element in the array passes the provided function's test. In this case, it checks for even numbers. The presence of `8`makes the result `true`, indicating that at least one number satisfies the condition


#### `reduce`with Initial Value
```js
const numbers = [10, 20, 30];
const sum = numbers.reduce((acc, curr) => acc + curr, 0);
console.log(sum); // 60

const data = [
  { id: 1, name: 'John' },
  { id: 2, name: 'Jane' },
  { id: 3, name: 'Doe' }
];

const result = data.reduce((acc, item) => {
  acc[item.id] = item.name;
  return acc;
}, {});

console.log(result); // { 1: 'John', 2: 'Jane', 3: 'Doe' }


```
-  The `reduce()`method executes a reducer function on each element of the array, accumulating a result. In this case, it sums up the numbers in the array. The `0`is the initial value of `acc`. The reducer function adds each element to `acc`, resulting in a sum of `60`.

- The `reduce()`function is used here to transform an array of objects into an object, where the `id`becomes the key and the `name`becomes the value. The `acc`(accumulator) starts as an
empty object (`{}`), and for each iteration, a new property is added, ultimately producing the result `{ 1: 'John', 2: 'Jane', 3: 'Doe' }`.

####  `Array.prototype.reduce()`for Flattening Arrays

```js
 const arrays = [[1, 2], [3, 4], [5, 6]];
 const flatArray = arrays.reduce((acc, curr) => acc.concat(curr), []);
console.log(flatArray); // [1, 2, 3, 4, 5, 6]

```
-  The `reduce()`method applies a function to each element in the array, accumulating the results into a single value. In this example, `reduce()`is used to flatten the nested arrays by concatenating each inner array to the accumulator, resulting in a single flattened array `[1, 2, 3, 4, 5, 6]`

#### Array Flatting
```js
 const arr = [1, [2, [3, [4]]]];
 console.log(arr.flat(2)); //  [1, 2, 3, [4]]


  const nestedArray = [1, [2, [3, 4]]];
 const flatArray = nestedArray.flat(2);
 console.log(flatArray); // [1, 2, 3, 4]
```
- The `flat()`method creates a new array with all sub-array elements concatenated into it
 recursively up to the specified depth (`2`in this case).

#### flatMap 
```js
 const arrays = [[1, 2], [3, 4], [5, 6]];
 const flatArray = arrays.flatMap(arr => arr);
 console.log(flatArray); // [1, 2, 3, 4, 5, 6]
```
-  The `flatMap()`method first applies a mapping function to each element and then flattens the resulting arrays into a single array. In this case, each subarray `[1, 2]`, `[3, 4]`, `[5, 6]`is flattened into one array `[1, 2, 3, 4, 5, 6]`. This is useful when dealing with nested arrays.

## Set vs Array Uniqueness

```js
const array = [1, 2, 2, 3, 4, 4, 5];
 const uniqueSet = new Set(array);
 console.log([...uniqueSet]); //  [1, 2, 3, 4, 5]

```
-  A `Set`in JavaScript automatically removes duplicate values. When the array is passed to the `Set`, it only keeps unique values (`[1, 2, 3, 4, 5]`). Using the spread operator (`[...]`), the `Set`is converted back into an array, maintaining only unique values from the original array
  

#### Using `Set`to Remove Duplicates from Array
```js
const numbers = [1, 2, 2, 3, 4, 4, 5];
 const uniqueNumbers = [...new Set(numbers)];
 console.log(uniqueNumbers); //  [1, 2, 3, 4, 5]

```
- The `Set`object automatically removes duplicate values, as it only stores unique elements. In this example, creating a `Set`from the `numbers`array removes the duplicates. The result is then converted back into an array using the spread operator (`...`), giving `[1, 2, 3, 4, 5]`.

## Symmbol

#### Symbol as Object Property Key
```js
 const sym = Symbol('unique');
 const obj = {
    [sym]: 'Secret value'
 };
 console.log(obj[sym]); // Secret value
 console.log(obj['unique']); // undeined

const sym1 = Symbol('id');
 const sym2 = Symbol('id');
 const obj = {
    [sym1]: 'Symbol 1',
    [sym2]: 'Symbol 2'
 };
 console.log(obj[sym1]); // Symbol 1
 console.log(obj[sym2]); // Symbol 2


 const sym1 = Symbol('description');
 const sym2 = Symbol('description');
 console.log(sym1 === sym2); // false

```
-  Symbols are unique and can be used as property keys in objects. The property key `[sym]`refers to the symbol, so `obj[sym]`returns "Secret value". However, since `sym`is not a string, obj['unique']`returns `undefined`because `'unique'`is not the key.

- Symbols are unique and immutable data types used as object keys in JavaScript. Even though
 `sym1`and `sym2`have the same description (`'id'`), they are different symbols and refer to
 different properties in the object. Each symbol is guaranteed to be unique, so the values in the object are not overwritten.

 - Symbols are a new primitive type in JavaScript introduced in ES6. They are unique and
 immutable, making them ideal for use as object property keys when you want to avoid name
 collisions. In this example, `sym1`and `sym2`have the same description but are different
 symbols, so the comparison returns `false`

## Functions

#### Default Parameters
```js
 function greet(name = 'Stranger') {
 console.log(`Hello, ${name}`);
 }
 greet(); // Hello, Stranger
 greet('John'); //  Hello, John

```
- Default parameters allow you to define default values for function parameters. If no value is passed to `greet()`, it uses `'Stranger'`. When `'John'`is passed, it overrides the default.

####  Immediately Invoked Function Expression (IIFE)

```js
(function() {
  var message = 'Hello World';
  console.log(message); 
})();
console.log(message);

// Output:
//  Hello World
//  ReferenceError: message is not defined

```
- An IIFE is a function that runs as soon as it is defined. The function creates its own scope, so `message`is not accessible outside of the function. Inside the function, "Hello World" is logged,`but outside, a `ReferenceError`is thrown because `message`is not defined in the global scope.

#### Rest Parameters in functions
```js
 function sum(...numbers) {
    return numbers.reduce((acc, curr) => acc + curr, 0);
 }
 console.log(sum(1, 2, 3, 4, 5)); // 15

```
- The rest parameter `...numbers`gathers all passed arguments into an array. The `reduce()`
 method then sums them up, starting from `0`.

#### Recursive Function with Default Parameters
```js
 function factorial(n) {
    if (n === 0) return 1;
    return n * factorial(n - 1);
 }
 console.log(factorial(5)); // 120

function factorial(n, acc = 1) {
    if (n <= 1) return acc;
    return factorial(n - 1, n * acc);
 }
 console.log(factorial(5)); // 120


```
-  This is a recursive function that calculates the factorial of a number. The `acc`parameter holds the accumulated value, and each recursive call multiplies `n`with `acc`. The recursion continues until `n`is `1`, at which point the accumulated result is returned. This method is tail-recursive, optimizing the function's memory usage by avoiding stack overflow

```js
// Recursive Fibonacci Function
function fibonacci(n) {
    if (n <= 1) return n;
    return fibonacci(n - 1) + fibonacci(n - 2);
 }
 console.log(fibonacci(5)); // 5

//  Recursive Fibonacci with Memorization
function fibonacci(n, memo = {}) {
  if (n <= 1) return n;
  if (memo[n]) return memo[n];
  return memo[n] = fibonacci(n - 1, memo) + fibonacci(n - 2, memo);
}

// Example usage:
console.log(fibonacci(6)); // 8

```

- The Fibonacci sequence is defined such that each number is the sum of the two preceding ones. This recursive function computes the Fibonacci number for a given `n`. For `fibonacci(5)`, the sequence follows: `0, 1, 1, 2, 3, 5`, and the result is `5`.

-  This is a memoized recursive implementation of the Fibonacci sequence. `memo`stores previously computed Fibonacci numbers to avoid redundant calculations. For `fibonacci(6)`, the function computes `fibonacci(5) + fibonacci(4)`and so on, but memoization ensures that each Fibonacci value is computed only once.


## Prototypes

#### Creating and Using Prototypes
```js
function Person(name) {
     this.name = name;
 }
 Person.prototype.greet = function() {
    console.log(`Hello, my name is ${this.name}`);
 };
 const alice = new Person('Alice');
 alice.greet(); //Hello, my name is Alice
```

- Prototypes allow you to define methods and properties that can be shared among all instances of a constructor function. In this example, `greet`is defined on `Person.prototype`, meaning all instances of `Person`(like `alice`) have access to this method, enabling it to log the greeting.


#### Prototypal Inheritance

```js
function Animal(name) {
  this.name = name;
}

Animal.prototype.speak = function() {
  console.log(`${this.name} makes a noise`); // Dog makes a noise
};

const dog = new Animal('Dog');
dog.speak();

```
-  The `speak`method is attached to the prototype of `Animal`, so all instances of `Animal`inherit it.
- When `dog.speak()`is called, the method logs "Dog makes a noise".
-  In JavaScript, every object has a prototype, and inheritance is achieved through the prototype chain. Here, `speak`is defined on `Animal.prototype`. When we create a `dog`instance, it inherits the `speak`method, allowing us to call `dog.speak()`and get the output.

#### Function Overriding in Prototypes

```js
function Animal() {}
 Animal.prototype.speak = function() {
    return 'Roar';
 };
 function Dog() {}
 Dog.prototype = Object.create(Animal.prototype);
 Dog.prototype.speak = function() {
    return 'Bark';
 };
 const dog = new Dog();
 console.log(dog.speak());

```

-  In this example, `Dog`is a constructor function that inherits from `Animal`. The `Dog.prototype`is set to an object created from `Animal.prototype`, establishing inheritance. However, `Dog.prototype.speak`is overridden to return `'Bark'`, which replaces the inherited `speak()`method from `Animal.prototype`. Therefore, when `dog.speak()`is called, it returns `'Bark'`.

#### Prototype Chain Lookup
```js

function Vehicle() {}
Vehicle.prototype.wheels = 4;
const car = new Vehicle();
console.log(car.wheels); // 4
car.wheels = 2;
console.log(car.wheels); // 2
delete car.wheels;
console.log(car.wheels); // 4
```
- Initially, `car.wheels`is not a direct property of the `car`object but is inherited from the `Vehicle.prototype`. When `car.wheels`is set to `2`, it creates a direct property on the `car` object, shadowing the prototype property. When the property is deleted with `delete`, the lookup goes back to the prototype, so `car.wheels`refers to the inherited value `4`again.

## Prototype vs `__proto__`

```js
function Animal() {}
Animal.prototype.speak = function() {
    return 'Roar';
};
const lion = new Animal();
console.log(lion.speak()); // Roar
console.log(lion.__proto__ === Animal.prototype); // true

```
-  The `speak`method is defined on `Animal.prototype`, so when `lion.speak()`is called, the
method is found on the prototype chain. 
- `__proto__`is an internal property that refers to the prototype of the object. In this case, `lion.__proto__`points to `Animal.prototype`, so the comparison returns `true`.

## Promises

#### Optional Catch Binding

```js
try {
  throw new Error('Oops!');
} catch (error) {
  console.log('Error caught:', error.message);
}


```

- In modern JavaScript (starting from ES2019), you can omit the `catch`binding parameter. This allows you to catch errors without needing to specify the error object if you don’t plan on using it. In this example, the `catch`block runs even without specifying the error variable, logging `'Error caught'`.

#### Promise Chaining
```js
Promise.resolve(1)
  .then(x => x + 1)
  .then(x => { throw new Error('Oops'); })
  .catch(err => console.log(err.message))
  .then(() => console.log('Done'));

  /* 
  Output:
  Oops
  Done
  */

 Promise.resolve('Success')
  .then(value => {
    console.log(value);
    throw new Error('Something went wrong');
  })
  .catch(error => {
    console.log(error.message);
  });

  /* 
  Output:
  Success
 Something went wrong
  */

 const promise = new Promise((resolve, reject) => {
  setTimeout(() => resolve(1), 1000);
});

promise
  .then(result => {
    console.log(result); // 1
    return result * 2;
  })
  .then(result => {
    console.log(result); // 2
    return result * 3;
  })
  .then(result => {
    console.log(result); // 6
  });


```
- The first two `then()`methods modify the value and throw an error. The `catch()`catches the
 error and logs the message.
- The final `then()`executes after the `catch()`, logging "Done".
  
-  A promise chain executes sequentially. The first `then()`block logs "Success" and then throws an error. The error is caught by the `catch()`block, which logs the error message. Throwing an error in a `then()`block causes the promise to reject, which triggers the `catch()`block.
  
- Promises can be chained using the `then()`method. Each `then()`call returns a new promise,
 which can be used to chain further operations. In this example, the promise resolves with the value `1`, and each subsequent `then()`modifies the result and passes it to the next handler. The chain produces the values `1`, `2`, and `6`.


#### Promise.all and Error Handling

```js
const p1 = Promise.resolve(1);
const p2 = Promise.reject('Error');
const p3 = Promise.resolve(3);

Promise.all([p1, p2, p3])
  .then(values => console.log(values))
  .catch(error => console.log(error)); // Error

// Next example
const promise1 = Promise.resolve(1);
const promise2 = new Promise((resolve) => setTimeout(() => resolve(2), 1000));
const promise3 = Promise.resolve(3);

Promise.all([promise1, promise2, promise3]).then(values => {
  console.log(values); // [1, 2, 3]
});


const promise1 = Promise.resolve(5);
const promise2 = new Promise((resolve) => setTimeout(resolve, 100, 10));
const promise3 = new Promise((resolve) => setTimeout(resolve, 200, 15));

Promise.all([promise1, promise2, promise3]).then(results => {
  console.log(results); // [5, 10, 15]
});


```
- `Promise.all`executes all promises in parallel and only resolves when all promises are fulfilled. If any of the promises reject, `Promise.all`immediately rejects with that error, and no further promises are considered. In this case, `p2`rejects with `'Error'`, so the `catch()`block catches and logs it.
  
-  `Promise.all()`takes an array of promises and returns a new promise that resolves when all then promises in the array have resolved. The resolved value is an array of results from the input promises. In this example, once all three promises are resolved (after 1 second due to the second promise), the result `[1, 2, 3]`is logged.
  
- `Promise.all()`takes an iterable of promises and returns a single promise that resolves when all of the promises have resolved, or rejects if any promise is rejected. In this example, all three promises are fulfilled, and the resulting array contains their resolved values.
  

#### Promise.allSettled()

```js
const promise1 = Promise.resolve(3);
const promise2 = new Promise((resolve, reject) => setTimeout(reject, 100, 'error'));
const promise3 = Promise.resolve(5);

Promise.allSettled([promise1, promise2, promise3]).then(results => {
  console.log(results);
});

/* 
 [
 {status: 'fulfilled', value: 3 },
 {status: 'rejected', reason: 'error' },
 {status: 'fulfilled', value: 5 }
 ]
*/

const promise1 = Promise.resolve(1);
const promise2 = Promise.reject('Error occurred');
const promise3 = Promise.resolve(3);

Promise.allSettled([promise1, promise2, promise3]).then(results => {
  console.log(results);
});

/* 
[
  { status: 'fulfilled', value: 1 },
  { status: 'rejected', reason: 'Error occurred' },
  { status: 'fulfilled', value: 3 }
]

*/


```
- `Promise.allSettled()`returns a promise that resolves after all of the given promises have either resolved or rejected. It provides an array of objects describing the outcome of each promise. In this example, the results include both fulfilled and rejected statuses, allowing you to handle all promises without failing early.

-  `Promise.allSettled()`takes an array of promises and returns a promise that resolves after all of the given promises have either resolved or rejected. The resulting array contains objects that describe the outcome of each promise, whether fulfilled or rejected, allowing you to handle multiple promises without failing if one or more rejects.

#### Promise.race

```js
const p1 = new Promise((resolve) => setTimeout(() => resolve('First'), 500));
const p2 = new Promise((resolve) => setTimeout(() => resolve('Second'), 100));

Promise.race([p1, p2])
.then(value => console.log(value)) // Second
.catch(err => console.log(err));

```
- `Promise.race`runs multiple promises and resolves or rejects as soon as one of them settles. In this case, `p2`resolves faster (`100ms`), so `"Second"`is logged. Even though `p1`eventually resolves, it’s not considered since `Promise.race`only returns the result of the first settled promise.

#### Using `Promise.any()`
```js
const promise1 = Promise.reject('Error 1');
const promise2 = new Promise((resolve) => setTimeout(resolve, 100, 'Result 2'));
const promise3 = new Promise((resolve) => setTimeout(resolve, 200, 'Result 3'));

Promise.any([promise1, promise2, promise3])
  .then(result => console.log(result)); // 2


```

-  `Promise.any()`takes an iterable of Promise objects and, as soon as one of the promises in the iterable fulfills, returns a single promise that resolves with the value from that promise. If no promises fulfill (i.e., all are rejected), it returns a promise that is rejected with an `AggregateError`, which is an error that groups together multiple errors. In this case, `promise2` fulfills first, logging `'Result 2'`.

#### Async/ Await 
```js
async function fetchData() {
  const data = await new Promise(resolve => setTimeout(() => resolve('Fetched data'), 1000));
  console.log(data);
}

fetchData();
console.log('Waiting...');

/* 
Output:
Waiting...
 Fetched data
*/

function fetchData() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('Data fetched!');
    }, 1000); // corrected: close setTimeout parentheses
  });
}

async function getData() {
  const result = await fetchData();
  console.log(result);
}

getData(); //  Data fetched!


async function fetchData() {
    throw new Error('Data not found');
 }
 fetchData().catch(error => {
    console.log(error.message); //  Data not found
 });

```
-  The `async`keyword makes a function return a promise, and the `await`keyword pauses the
 function's execution until the promise is resolved. In this example, `fetchData`logs "Fetched data" only after waiting for 1000ms. The `console.log('Waiting...')`runs first because `await`  allows the JavaScript engine to handle other tasks while waiting for the promise.

 - The `async`function allows you to use `await`inside it, which pauses the execution of the
 function until the promise is resolved. In this case, `fetchData`simulates an asynchronous
 operation that resolves after 1 second. The `getData`function waits for this promise to resolve before logging the result.

 - `async`functions always return a promise. If an error is thrown inside an `async`function, it returns a rejected promise. In this example, when `fetchData`is called it throws an error which is caught in the `catch()`block, logging `'Data not found'`.


#### Promise Rejection Handling with `catch()`

```js
const promise = new Promise((resolve, reject) => {
  reject('Something went wrong');
});

promise
  .then(() => console.log('Success'))
  .catch(error => console.log(error));


```

- When a promise is rejected, the `catch()`method is used to handle the error. In this case, the promise is immediately rejected with the message `'Something went wrong'`, so the `catch()` block is executed, logging the error message.

#### Async/ Await with Error Handling
```js
async function fetchData() {
  throw new Error('Data not found');
}

async function getData() {
  try {
    await fetchData();
  } catch (error) {
    console.log(error.message);
  }
}

getData(); //  Data not found
```
- The `fetchData()`function throws an error. Inside `getData()`, the `try-catch`block catches the error, and the `error.message`is logged.

## Map

```js
 const map = new Map();
 map.set('name', 'Alice');
 map.set('age', 25);
 console.log(map.get('name')); // Alice
 console.log(map.has('age')); // true

 const map = new Map();
 map.set('a', 1);
 map.set('b', 2);
 console.log(map.get('a'));
 console.log(map.has('b'));
 console.log(map.size);

 /* 
 1
 true
 2
 */

```
- A `Map`object holds key-value pairs where keys can be of any data type. In this example, we use `set()`to add entries to the map and `get()`to retrieve a value by key. The `has()`method checks for the existence of a key. This structure is particularly useful for maintaining the insertion order of elements.
- 
- `Map`is a built-in object that holds key-value pairs, where keys can be of any type. Here, `set()` is used to add key-value pairs, `get()`retrieves the value associated with a key, `has()`checks for the existence of a key, and `size`returns the number of entries in the map.

#### `Map`Object and Iterating Over Entries
```js
const myMap = new Map([
  ['key1', 'value1'],
  ['key2', 'value2']
]);

for (const [key, value] of myMap) {
  console.log(`${key}: ${value}`);
}

// key1: value1
//  key2: value2

```
- A `Map`object stores key-value pairs and preserves the insertion order of the keys. You can
 iterate over a `Map`using a `for...of`loop, which returns an array of `[key, value]`pairs. In
 this example, the map contains two pairs, which are logged in the order they were inserted.


#### Map VS Object

```js
const map = new Map();
 map.set('key', 'value');
 console.log(map.get('key')); // value
 const obj = {};
 obj['key'] = 'value';
 console.log(obj['key']); // value

```
- Both `Map`and `Object`can store key-value pairs, but `Map`provides more flexible and optimized methods like `.set()`and `.get()`compared to an object’s bracket notation.

##  WeakMap 

#### Using `WeakMap`for Private Data

```js
 const privateData = new WeakMap();
 class User {
    constructor(name) {
         privateData.set(this, { name });
    }
    getName() {
        return privateData.get(this).name;
     }
 }
 const user = new User('Alice');
 console.log(user.getName()); //  Alice

```
-  `WeakMap`is a collection of key-value pairs where keys are objects and values can be any value. The keys are weakly referenced, meaning they can be garbage collected if there are no other references to them. Here, `WeakMap`is used to store private data (the user's name) that is inaccessible from outside the class, demonstrating encapsulation

#### Weak Map for Garbage Collection

```js
let obj = {key: 'value'};
const weakMap = new WeakMap();
weakMap.set(obj, 'metadata');
obj = null; // Remove reference to the object
console.log(weakMap.has(obj)); // false

```
- A `WeakMap`holds "weak" references to its keys, meaning the keys can be garbage-collected if there is no other reference to them. Once the object `obj`is set to `null`, the key in the `WeakMap`is no longer accessible, and it can be garbage collected. Therefore, `weakMap.has(obj)` returns `false`.


## Template Literals
```js
 const firstName = 'John';
 const lastName = 'Doe';
const fullName = `${firstName} ${lastName}`;
 console.log(fullName); // John Doe

 const a = 5;
 const b = 10;
 console.log(`${a} + ${b} = ${a + b}`); // 5 + 10 = 15

```
 - Template literals (backticks \`\`) allow embedded expressions and multiline strings. The expression `${a + b}` is evaluated to `15`within the template string. This makes it easy to construct strings with dynamic values without needing concatenation.

#### Tagged Template Literals

```js
function tag(strings, ...values) {
return strings[0] + values[0] + strings[1] + values[1];
}
const a = 5, b = 10;
console.log(tag`Sum of ${a} and ${b} is ${a + b}`); //  Sum of 5 and 10 is 15

```
- Tagged template literals allow you to parse a template string with a function. The `tag`function receives two arguments: an array of string literals and an array of the interpolated values. It returns a combined string, where the placeholders (`${a}`, `${b}`, etc.) are replaced by the actual values.

## `Proxy`for Object Interception
```js
const target = { message: 'Hello' };

const handler = {
  get: function(obj, prop) {
    if (prop === 'message') {
      return 'Intercepted';
    }
    return obj[prop];
  }
};

const proxy = new Proxy(target, handler);

console.log(proxy.message);       // Intercepted
console.log(proxy.nonExistent);   // undefined
```

- A `Proxy`allows you to intercept and redefine basic operations on an object, such as property access (`get`). In this example, when the `message`property is accessed, the `get`trap returns 'Intercepted'`. For other properties, it defaults to returning the original property from the target object.

## Custom Iterators


```js
const iterable = {
  [Symbol.iterator]() {
    let count = 0;
    return {
      next() {
        if (count < 3) {
          return { value: count++, done: false };
        } else {
          return { done: true };
        }
      }
    };
  }
};

for (const value of iterable) {
  console.log(value); // 0 1 2
}

```
- Custom iterators use the `[Symbol.iterator]()`method to implement iteration behavior. In this example, the iterator returns values from `0`to `2`, then stops when `count`reaches `3`.

## Function Generators

```js
function* generator() {
    yield 1;
    yield 2;
    yield 3;
 }
 const gen = generator();
 console.log(gen.next().value); // 1
 console.log(gen.next().value); // 2
 console.log(gen.next().value); // 3

```
-  A generator function is defined using `function*`. It produces a sequence of values by using `yield`to pause the function’s execution. Each time `gen.next()`is called, the generator
resumes execution until it hits the next `yield`statement, returning the value. When all `yield` statements are exhausted, `done: true`will be returned.


## Debouncing

```js
function debounce(func, delay) {
  let timeout;
  return function(...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), delay);
  };
}

const log = debounce(() => console.log('Debounced!'), 2000);

log(); // Will log "Debounced!" after 2 seconds
log();
 log();
```

-  Debouncing is a technique to limit the rate at which a function is executed. In this example, `log()`is called multiple times in quick succession, but the function inside `debounce`is executed only once after `2000ms`have passed since the last call. This is achieved by resetting the timer each time `log()`is called, ensuring the function only executes after a pause in the rapid calls.
  
## Event Delegation

```html
<ul id="parent">
  <li>Item 1</li>
  <li>Item 2</li>
</ul>

<script>
  const parent = document.getElementById('parent');

  parent.addEventListener('click', function(event) {
    console.log('Clicked:', event.target.textContent);
  });
</script>

<!-- Clicked: Item 1
 Clicked: Item 2 -->

```
-  Event delegation is a technique where a single event listener is added to a parent element to handle events on its child elements. In this example, the `click`event is attached to the `<ul>` element, but when an `<li>`is clicked, `event.target`refers to the `<li>`that was clicked, allowing the event handler to react to clicks on child elements.
  

##  Event Bubbling vs. Event Capturing

```html

<div id="parent" style="padding: 20px; background: lightblue;">
  Parent
  <button id="child">Click me!</button>
</div>

<script>
  // Parent listener in capturing phase
  document.getElementById('parent').addEventListener('click', function() {
    console.log('Parent clicked!');
  }, true); // true = capturing phase

  // Child listener
  document.getElementById('child').addEventListener('click', function(event) {
    console.log('Child clicked!'); 
    event.stopPropagation(); // prevents bubbling
  });
</script>

<!-- Child clicked! -->
```

-  Event bubbling and capturing are two phases of event propagation in the DOM. Bubbling is
 when the event propagates from the target element up to the root, while capturing is when it
 goes from the root down to the target. In this example, the parent element has an event listener set for the capturing phase (`true`). When the button is clicked, the message from the child element is logged first, and `stopPropagation()`prevents the event from reaching the parent.

## Memoization with Functions

```js
function memoize(fn) {
  const cache = {};
  return function(...args) {
    const key = JSON.stringify(args); // create a unique key from arguments
    if (cache[key]) {
      return cache[key]; // return cached result if exists
    }
    const result = fn(...args); // compute result
    cache[key] = result;        // store in cache
    return result;
  };
}

const add = memoize((a, b) => a + b);

console.log(add(1, 2)); // 3 (computed)
console.log(add(1, 2)); // 3 (from cache)
```
- Memoization is a technique used to cache the results of expensive function calls. In this example, the `memoize`function wraps another function (`add`). When the function is called with the same arguments, the result is fetched from the cache instead of recomputing it. This improves performance by avoiding redundant calculations.

## Creating a Simple Event Emitter
```js

class EventEmitter {
  constructor() {
    this.events = {};
  }

  // Register a listener for an event
  on(event, listener) {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push(listener);
  }

  // Emit an event, calling all registered listeners
  emit(event, data) {
    if (this.events[event]) {
      this.events[event].forEach(listener => listener(data));
    }
  }
}

const emitter = new EventEmitter();

// Register a listener
emitter.on('event', data => console.log(data));

// Emit the event
emitter.emit('event', 'Event triggered!'); //  Event triggered!


```
-  This code defines a simple `EventEmitter`class that allows you to subscribe to events and trigger them. The `on`method registers a listener for a specific event, while the `emit`method calls all listeners for that event, passing any data along. Here, the event `'event'`is emitted, triggering the listener and logging `'Event triggered!'`.