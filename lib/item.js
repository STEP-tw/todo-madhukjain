class Item {
  constructor(text,status = false) {
    this.itemText = text;
    this.status = status;
  }

  getItemText(){
    return this.itemText;
  }
  getStatus(){
    return this.status;
  }
  markAsDone(){
    this.status = true;
  }
  markAsNotDone(){
    this.status = false;
  }
  editItemText(newText){
    this.itemText = newText;
  }
}

module.exports = Item;
