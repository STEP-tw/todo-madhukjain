class User {
  constructor(name){
    this.name = name;
    this.toDoLists = {};
  }
  getName(){
    return this.name;
  }

}


module.exports = User;
