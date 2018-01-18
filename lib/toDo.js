const Item = require('../lib/item.js');

class ToDo {
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
  getItem(itemId){
    return this.items[itemId];
  }
  addItem(itemText){
    let item = this.items[++this.itemId] = new Item(itemText,this.itemId);
    this.items[this.itemId] = item;
  }
  deleteItem(itemText){
    delete this.items[itemText];
  }
  editTitle(newTitle){
    this.title = newTitle;
  }
  editDescription(newDescription){
    this.description = newDescription;
  }
  getItemId(){
    return this.itemId;
  }
  getId(){
    return this.toDoId;
  }
}

module.exports = ToDo;
