const Item = require('./item');
class TodoList {
  constructor(title,toDoId,description) {
    this.title = title;
    this.toDoId = toDoId;
    this.description = description;
    this.items = {};
    this.itemId = 0;
  }

  getTitle(){
    return this.title;
  }
  getDescription(){
    return this.description;
  }
  getItems(){
    return this.items;
  }
  getItemById(itemId){
    return this.items[itemId];
  }
  addItem(objective){
    this.items[++this.itemId] = new Item(objective,this.itemId);
  }
  deleteItem(itemID){
    delete this.items[itemID];
  }
  updateTitle(title){
    this.title = title;
  }
  updateDescription(description){
    this.description = description;
  }
  getId(){
    return this.toDoId;
  }
}

module.exports = TodoList;
