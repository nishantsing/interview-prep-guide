/* 
LocalStorage wrapper

Create a simple wrapper around local storage.
*/

class Storage {
    static set(key, value) {
        localStorage.setItem(key, JSON.stringify(value));
    }
    static get(key) {
        const value = localStorage.getItem(key);
        return value ? JSON.parse(value) : null;
    }
    static remove(key) {
        localStorage.removeItem(key);
    }
}
// Usage
Storage.set('user', { name: 'Alice', age: 30 });
console.log(Storage.get('user')); // { name: 'Alice', age: 30 }
Storage.remove('user');