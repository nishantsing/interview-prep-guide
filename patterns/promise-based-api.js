/* 
Create a function that returns a promise which resolves after a timeout.
*/

function delayPromise(delay) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve('Resolved after' + delay + 'ms')
        }, delay)
    })
}

delayPromise(2000).then(console.log())

/* 
Async Await based promise delay
*/
function delayPromiseAsync(delay) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve('Resolved after ' + delay + 'ms');
        }, delay);
    });
}

async function runDelay() {
    const result = await delayPromiseAsync(2000);
    console.log(result);
}

runDelay();

/* 
Callback based promise delay
*/

function delayCallback(delay, callback) {
    setTimeout(() => {
        callback('Resolved after ' + delay + 'ms');
    }, delay);
}

// Usage
delayCallback(2000, console.log);
