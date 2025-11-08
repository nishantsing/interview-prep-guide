/*
Custom `bind` Implementation

Implement your own version of `bind`
*/

// Adding something to the Function Class directly - should be avoided. We can add our methods to prototype of global classes directly like this, Array.prototype.myFn / Object.prototype.myFn

Function.prototype.myBind = function (context, ...args) {
    const fn = this; // whichever fn is calling this method.
    return function (...newArgs) {
        return fn.apply(context, args.concat(newArgs))
    }
}


const user = {
    name: 'Mike',
    greet: function () {
        console.log(`Hello, my name is ${this.name}.`);
    }
};

const greetMike = user.greet.myBind(user);
greetMike(); // "Hello, my name is Mike.

const greetMikeError = user.greet
greetMikeError(); // "Hello, my name is undefined.