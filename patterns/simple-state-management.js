/* 
simple State Management

Create a simple state management solution.
*/

class Store {
    constructor() {
        this.state = {};
        this.listeners = [];
    }

    setState(newState) {
        this.state = { ...this.state, ...newState };
        this.listeners.forEach(listener => listener(this.state));
    }
    subscribe(listener) {
        this.listeners.push(listener);
    }
}
// Usage
const store = new Store();
store.subscribe(state => {
    console.log('State changed:', state);
});
store.setState({ count: 1 });
store.setState({ count: 2 });