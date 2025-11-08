/* 
 Basic Generator Function

  Create a basic generator that yields numbers from 1 to 5.
*/

function* numberGenerator() {
    for (let i = 1; i <= 5; i++) {
        yield i;
    }
}
const generator = numberGenerator();
for (let num of generator) {
    console.log(num); // 1, 2, 3, 4, 5
}

/*  Fibonacci Sequence with Generators */
function* fibonacci() {
    let a = 0, b = 1;
    while (true) {
        yield a;
        [a, b] = [b, a + b];
    }
}
const fib = fibonacci();
console.log(fib.next().value); // 0
console.log(fib.next().value); // 1
console.log(fib.next().value); // 1
console.log(fib.next().value); // 2

/*  Infinite Sequence Generator */
function* naturalNumbers() {
    let num = 1;
    while (true) {
        yield num++;
    }
}
const natural = naturalNumbers();
console.log(natural.next().value); // 1
console.log(natural.next().value); // 2

/* Generator with `return` */
function* limitedGenerator() {
    yield 1;
    yield 2;
    return 'No more values';
    yield 3; // This will never execute
}
const gen = limitedGenerator();
console.log(gen.next()); // { value: 1, done: false }
console.log(gen.next()); // { value: 2, done: false }
console.log(gen.next()); // { value: 'No more values', done: true }

/*  Generator for Lazy Evaluation -   produces squares of numbers lazily.*/
function* squareGenerator() {
    let num = 1;
    while (true) {
        yield num * num;
        num++;
    }
}
const squares = squareGenerator();
console.log(squares.next().value); // 1
console.log(squares.next().value); // 4
console.log(squares.next().value); // 9

/* 
Yielding Promises

Create a generator that yields promises and handles them using `async/await`.
*/

function* asyncGenerator() {
    const data1 = yield new Promise(resolve =>
        setTimeout(() => resolve('First value'), 1000)
    );

    const data2 = yield new Promise(resolve =>
        setTimeout(() => resolve('Second value'), 1000)
    );

    return `${data1} and ${data2}`;
}

async function handleAsyncGenerator(gen) {
    const iterator = gen();

    const res1 = await iterator.next().value; // wait for first yield
    const res2 = await iterator.next(res1).value; // pass res1 back in
    const finalResult = iterator.next(res2).value; // get return value

    console.log(finalResult); // "First value and Second value"
}

handleAsyncGenerator(asyncGenerator);

/* 
Using Generators for Asynchronous Flow Control

*/

function* asyncFlow() {
    const data1 = yield fetch('https://api.example.com/data1')
        .then(res => res.json());

    const data2 = yield fetch(`https://api.example.com/data2/${data1.id}`)
        .then(res => res.json());

    return data2;
}

async function handleAsyncFlow(gen) {
    const iterator = gen();

    const res1 = await iterator.next().value;  // wait for first yield (data1)
    const res2 = await iterator.next(res1).value; // pass data1 back into generator

    console.log(res2); // final data
}

handleAsyncFlow(asyncFlow);


/* 
Using Generators to Implement Iterators

 Create an iterator using a generator for a custom data structure.
*/

class CustomArray {
    constructor(...elements) {
        this.elements = elements;
    }
    *[Symbol.iterator]() {
        for (const element of this.elements) {
            yield element;
        }
    }
}
const arr = new CustomArray(1, 2, 3, 4);
for (const num of arr) {
    console.log(num); // 1, 2, 3, 4
}


/* 

Combining Generators with Promises

Create a generator that yields promises and resolves them sequentially.
*/

function* fetchData() {
    const res1 = yield fetch('https://api.example.com/data1').then(res => res.json());
    console.log('Data 1:', res1);

    const res2 = yield fetch('https://api.example.com/data2').then(res => res.json());
    console.log('Data 2:', res2);
}

async function handleFetchData(gen) {
    const iterator = gen();
    let result = iterator.next();

    while (!result.done) {
        const promiseResult = await result.value;
        result = iterator.next(promiseResult);
    }
}

handleFetchData(fetchData);
