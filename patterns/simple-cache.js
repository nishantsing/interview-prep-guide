/* 
Simple Cache

Write a caching mechanism using a Map.
*/

class Cache {
    constructor() {
        this.cache = new Map();
    }
    get(key) {
        return this.cache.get(key);
    }
    set(key, value) {
        this.cache.set(key, value);
    }
    clear() {
        this.cache.clear();
    }
}

// Usage
const cache = new Cache();
cache.set('a', 1);
console.log(cache.get('a')); // 1
cache.clear();
console.log(cache.get('a')); // undefined