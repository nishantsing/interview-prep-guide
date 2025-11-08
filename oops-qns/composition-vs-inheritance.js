/* 
Composition VS Inheritance

 Demonstrate the difference between composition and inheritance using a `Vehicle` class and a `Car`
 class.

Use inheritance when one class is a specialized type of another.

Use composition when one class uses another as part of its behavior.
*/

// Composition
class Vehicle {
    constructor(make) {
        this.make = make;
    }
    start() {
        return `${this.make} is starting.`
    }
}

class Car {
    constructor(make, model) {
        this.vehicle = new Vehicle(make);
        this.model = model;
    }
    start() {
        return `${this.vehicle.start()} It's a ${this.model}.`;
    }
}

const car = new Car('Toyota', 'Corolla');
console.log(car.start()); // "Toyota is starting. It's a Corolla."
// There’s no prototype chain connection between Car and Vehicle.

// Inheritance
class CarInherit extends Vehicle {
    constructor(make, model) {
        super(make); // call Vehicle's constructor
        this.model = model;
    }
    start() {
        return `${super.start()} It's a ${this.model}.`;
    }
}

const car1 = new CarInherit('Toyota', 'Corolla');
console.log(car.start());