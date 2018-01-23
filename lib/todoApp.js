const User = require('./user.js');

class TodoApp {
  constructor() {
    this.users = {};
  }
  addUser(userName,password){
    this.users[userName] = new User(userName,password);
    return this;
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
  addItem(userName,todoID,text,status=false){
    this.users[userName].addItem(text,todoID,status);
  }
  getItems(userName,todoID){
    return this.users[userName].getItemsByID(todoID);
  }
  deleteItem(userName,todoID,itemID){
    this.users[userName].deleteItem(todoID,itemID);
  }
  updateStatus(userName,todoID,itemID){
    this.users[userName].updateItemStatus(todoID,itemID);
  }
  getUser(userName){
    const user=this.users[userName];
    return user;
  }
  updateItem(userName,todoID,itemID,objective){
    this.users[userName].updateItem(todoID,itemID,objective);
  }
}

module.exports = TodoApp;
