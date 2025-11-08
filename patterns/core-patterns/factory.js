/* 
Factory pattern

Create a factory function that generates different types of users.
*/

// --- Factory Class ---
/* 
class UserFactory {
  createUser(type) {
    switch (type.toLowerCase()) {
      case "admin":
        return new Admin();
      case "editor":
        return new Editor();
      case "viewer":
      default:
        return new Viewer();
    }
  }
} 
*/

function UserFactory() {
    this.createUser = function (type) {
        let user;
        if (type === "admin") {
            user = new Admin();
        } else if (type === "editor") {
            user = new Editor();
        }
        else {
            user = new Viewer();
        }
        user.type = type;
        return user;
    };
}
class Admin {
    constructor() {
        this.permissions = ["read", "write", "delete"];
    }
}
class Editor {
    constructor() {
        this.permissions = ["read", "write"];
    }
}
class Viewer {
    constructor() {
        this.permissions = ["read"];
    }
}
const factory = new UserFactory();
const adminUser = factory.createUser("admin");
console.log(adminUser.permissions); // ["read", "write", "delete"]