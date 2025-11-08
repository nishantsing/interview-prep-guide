/* 
Partial Application with Custom Function

Create a function that allows for partial application of multiple arguments.
*/


function partial(fn, ...presetArgs) {
    return function (...laterArgs) {
        return fn(...presetArgs, ...laterArgs)
    }
}

function multiply(x, y) {
    return x * y
}

const double = partial(multiply, 2)
console.log(double(5)) // 10