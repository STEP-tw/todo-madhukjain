class Item {
  constructor(text,itemId,status = false) {
    this.itemText = text;
    this.itemId = itemId;
    this.status = status;
  }

  getText(){
    return this.itemText;
  }
  getStatus(){
    return this.status;
  }
  getId(){
    return this.itemId;
  }
  markAsDone(){
    this.status = true;
  }
  markAsNotDone(){
    this.status = false;
  }
  editText(newText){
    this.itemText = newText;
  }
}

module.exports = Item;
