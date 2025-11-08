/* 
Class Method Overriding

 Create a class `Animal` and subclass `Dog`, overriding a method in the subclass.
*/

class Animal {
    speak() {
        return 'Animal makes noise.'
    }
}

class Dog {
    speak() {
        //  below line can be used to call the parent method
        // const parentSound = super.speak();
        //  return parentSound + ' Dog barks.';
        return 'Dog barks'
    }
}

const dog = new Dog();
console.log(dog.speak())// "Dog barks"
// console.log(Animal.prototype.speak.call(dog)); 