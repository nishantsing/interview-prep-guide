/* 
    Deep clone of an Obejct

    Write a function that creates a deep clone of an object.
    structuredClone(obj)
    JSON.parse(JSON.stringify(obj))
*/

function deepClone(obj) {
    return JSON.parse(JSON.stringify(obj));
}
// Usage
const original = { name: 'Alice', age: 30, nested: { active: true } };
const clone = deepClone(original);
clone.nested.active = false;
console.log(original.nested.active); // true


// Deep clone using structuredClone
const original1 = {
    name: 'Alice',
    date: new Date(),
    map: new Map([['a', 1]]),
};

const clone = structuredClone(original1);

console.log(clone.date instanceof Date); // true
console.log(clone.map instanceof Map);   // true