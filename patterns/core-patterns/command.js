/* 
Command Pattern

Create a command pattern to manage actions.
*/

class Command {
    constructor(action) {
        this.action = action;
    }
    execute() {
        console.log(`Executing: ${this.action}`);
    }
}
class CommandManager {
    constructor() {
        this.commands = [];
    }
    execute(command) {
        command.execute();
        this.commands.push(command);
    }
}
// Usage
const manager = new CommandManager();
const command1 = new Command('Save');
const command2 = new Command('Load');
manager.execute(command1);
manager.execute(command2);