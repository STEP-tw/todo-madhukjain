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
}

module.exports = TodoApp;
