const User = require('./user.js');

class TodoApp {
  constructor() {
    this.users = {};
  }
  addUser(userName,password){
    this.users[userName] = new User(userName,password);
    return this;
  }
  getUser(userName){
  return this.users[userName]?this.users[userName]:false;
  }
  addTodo(userName,title,desc){
    this.users[userName].addTodo(title,desc);
  }
  getTodos(userName){
    return this.users[userName].getTodos();
  }
  deleteTodo(userName,todoID){
    this.users[userName].deleteTodo(todoID);
  }
  updateTodo(userName,toDoID,objective,description){
    this.users[userName].updateTodoTitle(toDoID,objective);
    this.users[userName].updateTodoDescription(toDoID,description);
  }
  addItem(userName,todoID,text){
    this.users[userName].addItem(text,todoID);
  }
  getItems(userName,todoID){
    return this.users[userName].getItemsByID(todoID);
  }
  deleteItem(userName,todoID,itemID){
    this.users[userName].deleteItem(todoID,itemID);
  }
}

module.exports = TodoApp;
