/* 
Observer Pattern

Create a simple pub-sub system using the Observer pattern.
*/

class EventEmitter {
    constructor() {
        this.events = {}
    }

    subscribe(event, listener) {
        if (!this.events[event]) {
            this.events[event] = []
        }
        this.events[event].push(listener);
    }

    unsubscribe(event, listener) {
        if (this.events[event]) {
            this.events[event] = this.events[event].filter(l => l !== listener);
        }
    }
    emit(event, data) {
        if (this.events[event]) {
            this.events[event].forEach(listener => listener(data));
        }
    }
}

// Usage
const emitter = new EventEmitter();
const onEvent = (data) => console.log(`Received: ${data}`);
emitter.subscribe('dataReceived', onEvent);
emitter.emit('dataReceived', 'Hello, Observer!'); // Received: Hello, Observer!

/*
this.events  = {
   dataReceived: [onEvent]
}
 
*/