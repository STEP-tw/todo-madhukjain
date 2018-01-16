const Item = require('../lib/item.js');

class List {
  constructor(title,description) {
    this.title = title;
    this.description = description;
    this.items = {};
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
  addItem(itemText){
    let item = new Item(itemText);
    this.items[itemText] = item;
  }
  getItem(itemText){
    return this.items[itemText];
  }
  deleteItem(itemText){
    delete this.items[itemText];
  }
  editListTitle(newTitle){
    this.title = newTitle;
  }
  editListDescription(newDescription){
    this.description = newDescription;
  }
}

module.exports = List;
