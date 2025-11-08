/* 
Custom Event Emitter

Create a simple EventEmitter class.
*/

class EventEmitter {
    constructor() {
        this.events = {};
    }
    on(event, listener) {
        if (!this.events[event]) {
            this.events[event] = [];
            this.events[event].push(listener);
        }
    }
    emit(event, ...args) {
        if (this.events[event]) {
            this.events[event].forEach(listener => listener(...args));
        }
    }
}
// Usage
const emitter = new EventEmitter();
emitter.on('data', data => console.log('Data received:', data));
emitter.emit('data', { key: 'value' }); // Data received: { key: 'value' }