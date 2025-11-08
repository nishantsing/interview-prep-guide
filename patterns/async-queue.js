class AsyncQueue {
    constructor() {
        this.queue = [];
        this.processing = false;
    }
    async add(task) {
        this.queue.push(task);
        this.processQueue();
    }
    async processQueue() {
        if (this.processing) return;
        this.processing = true;
        while (this.queue.length > 0) {
            const task = this.queue.shift();
            await task();
        }
        this.processing = false;
    }
}
// Usage
const queue = new AsyncQueue();
queue.add(async () => {
    console.log('Task 1 start');
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log('Task 1 end');
});
queue.add(async () => {
    console.log('Task 2 start');
    await new Promise(resolve => setTimeout(resolve, 500));
    console.log('Task 2 end');
});