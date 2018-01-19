class Item {
  constructor(text,itemId,status = false) {
    this.objective = text;
    this.itemId = itemId;
    this.status = status;
  }

  getObjective(){
    return this.objective;
  }
  getStatus(){
    return this.status;
  }
  getId(){
    return this.itemId;
  }
  updateStatus(){
    this.status = !this.status;
  }
  updateObjective(objective){
    this.objective = objective;
  }
}

module.exports = Item;
