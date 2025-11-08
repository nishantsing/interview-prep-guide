/* 
Context API

Implement a simple Context API to share data across components.
*/

class Context {
    constructor(value) {
        this.value = value;
        this.subscribers = [];
    }
    subscribe(callback) {
        this.subscribers.push(callback);
    }
    update(value) {
        this.value = value;
        this.subscribers.forEach(callback => callback(this.value));
    }
}
// Usage
const themeContext = new Context('light');
themeContext.subscribe(value => {
    console.log(`Theme updated: ${value}`);
});
themeContext.update('dark'); // Theme updated: dark