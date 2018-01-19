const Item = require('../lib/item.js');
const ToDo = require('../lib/toDo.js');

class User {
  constructor(name){
    this.name = name;
    this.toDos = {};
    this.toDoId = 1000;
  }
  getName(){
    return this.name;
  }
  getToDos(){
    return this.toDos;
  }
  getToDoId(){
    return this.toDoId;
  }
  // ===================================
  getToDo(id){
    return this.toDos[id];
  }
  getToDoDescription(toDoId){
    let toDo = this.toDos[toDoId];
    return toDo.description;
  }
  addToDo(title,toDoId,description){
    this.toDos[++this.toDoId] = new ToDo(title,toDoId,description);
  }
  deleteToDo(id){
    delete this.toDos[id];
  }
  editToDoTitle(id,newToDo){
    let toDo = this.toDos[id];
    toDo.editTitle(newToDo);
  }
  editToDoDescription(id,newDescription){
    let toDo = this.toDos[id];
    toDo.editDescription(newDescription);
  }
  // =================================
  addItem(text,toDoId){
    this.toDos[toDoId].addItem(text);
  }
  deleteItem(toDoId,itemId){
    let toDo = this.toDos[toDoId];
    delete toDo.items[itemId];
  }
  editItem(toDoId,itemId,newText){
    let toDo = this.toDos[toDoId];
    toDo.items[itemId].editText(newText);
  }
  markItemAsDone(toDoId,itemId){
    let toDo = this.toDos[toDoId];
    toDo.items[itemId].markAsDone();
  }
  markItemAsNotDone(toDoId,itemId){
    let toDo = this.toDos[toDoId];
    toDo.items[itemId].markAsNotDone();
  }
  getItem(toDoId,itemId){
    let toDo = this.toDos[toDoId];
    return toDo.items[itemId];
  }
  getItems(toDoId){
    let toDo = this.toDos[toDoId];
    return toDo.items;
  }
}

module.exports = User;
