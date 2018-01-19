const TodoList = require('../lib/todoList.js');

class User {
  constructor(name,password){
    this.name = name;
    this.password = password;
    this.todos = {};
    this.todoID = 1000;
  }
  getName(){
    return this.name;
  }
  getTodos(){
    return this.todos;
  }
  isValidPassword(password){
    return this.password == password;
  }
  // ===================================
  getTodoByID(id){
    return this.todos[id];
  }
  getTodoDescription(todoID){
    let todo = this.todos[todoID];
    return todo.description;
  }
  addTodo(title,description){
    this.todos[++this.todoID] = new TodoList(title,this.todoID,description);
  }
  deleteTodo(id){
    delete this.todos[id];
  }
  updateTodoTitle(id,Todo){
    let todo = this.todos[id];
    todo.updateTitle(Todo);
  }
  updateTodoDescription(id,description){
    let todo = this.todos[id];
    todo.updateDescription(description);
  }
  // =================================
  addItem(text,todoID,status=false){
    this.todos[todoID].addItem(text,status);
  }
  deleteItem(todoID,itemID){
    let todo = this.todos[todoID];
    delete todo.items[itemID];
  }
  updateItem(todoID,itemID,objective){
    let todo = this.todos[todoID];
    todo.updateItem(itemID,objective);
  }
  updateItemStatus(todoID,itemID){
    let todo = this.todos[todoID];
    todo.updateItemStatus(itemID);
  }

  getItemByID(todoID,itemID){
    let todo = this.todos[todoID];
    return todo.items[itemID];
  }
  getItemsByID(todoID){
    let todo = this.todos[todoID];
    return todo.items;
  }
}

module.exports = User;
