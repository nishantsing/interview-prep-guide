/* 
Throttling

Create a throttle function that limits the number of times a function can be called over time.
*/

function throttle(func, limit) {
    let lastFunc;
    let lastRan;

    return function (...args) {
        if (!lastRan) {
            func.apply(this, args);
            lastRan = Date.now();
        }
        else {
            clearTimeout(lastFunc);
            lastFunc = setTimeout(() => {
                if (Date.now() - lastRan >= limit) {
                    func.apply(this, args);
                    lastRan = Date.now();
                }
            }, limit - (Date.now() - lastRan));
        }
    };
}




// Usage
const logScroll = throttle(() => {
    console.log("Scrolled!");
}, 1000);
window.addEventListener('scroll', logScroll);