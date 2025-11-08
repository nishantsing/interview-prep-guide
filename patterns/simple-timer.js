/* 
Simple Timer

Create a timer function that returns a promise.
*/

function timer(seconds) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(`Timer finished after ${seconds} seconds`);
        }, seconds * 1000);
    })
}
// Usage
timer(3).then(console.log); // Timer finished after 3 seconds