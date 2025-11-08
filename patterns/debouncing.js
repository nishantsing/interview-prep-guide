/* 
Debouncing

Write a debounce function that limits the rate at which a function can fire.
*/

function debounce(func, delay) {
    let timeoutId;
    return function (...args) {
        clearTimeout(timeoutId)
        timeoutId = setTimeout(() => {
            func.apply(this, args)
        }, delay)
    }
}


// Usage
const handleResize = debounce(() => {
    console.log("Window resized!");
}, 300);
window.addEventListener('resize', handleResize);