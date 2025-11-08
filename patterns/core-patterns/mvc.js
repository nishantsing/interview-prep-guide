/* 
MVC Pattern

Create a simple MVC pattern with a model, view, and controller.
*/

class Model {
    constructor() {
        this.data = [];
    }
    addItem(item) {
        this.data.push(item);
        this.notifyObservers();
    }
    getItems() {
        return this.data;
    }
    notifyObservers() {
        this.observers.forEach(observer => observer.update());
    }
    subscribe(observer) {
        this.observers.push(observer);
    }
}
class View {
    constructor() {
        this.app = document.getElementById('app');
    }
    render(items) {
        this.app.innerHTML = '';
        items.forEach(item => {
            const div = document.createElement('div');
            div.innerText = item;
            this.app.appendChild(div);
        });
    }
}
class Controller {
    constructor(model, view) {
        this.model = model;
        this.view = view;
        this.model.subscribe(this);
    }
    update() {
        this.view.render(this.model.getItems());
    }
    addItem(item) {
        this.model.addItem(item);
    }
}
// Usage
const model = new Model();
const view = new View();
const controller = new Controller(model, view);
controller.addItem('Item 1');
controller.addItem('Item 2');