/* 
Simple Undo/ Redo Stack

Create a class that manages a stack for undo and redo operations.
*/

class History {
    constructor() {
        this.undoStack = [];
        this.redoStack = [];
    }
    execute(command) {
        this.undoStack.push(command);
        this.redoStack = []; // Clear redo stack
        command.execute();

    }
    undo() {
        if (this.undoStack.length) {
            const command = this.undoStack.pop();
            command.undo();
            this.redoStack.push(command);
        }
    }
    redo() {
        if (this.redoStack.length) {
            const command = this.redoStack.pop();
            command.execute();
            this.undoStack.push(command);
        }
    }
}
// Usage
class Command {
    constructor(action) {
        this.action = action;
    }
    execute() {
        console.log(`Executing: ${this.action}`);
    }
    undo() {
        console.log(`Undoing: ${this.action}`);
    }
}
const history = new History();
const command1 = new Command('Action 1');
const command2 = new Command('Action 2');
history.execute(command1);
history.execute(command2);
history.undo();
history.redo();