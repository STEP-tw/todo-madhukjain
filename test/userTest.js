const chai = require('chai');
const assert = chai.assert;
const ToDo = require('../lib/toDo.js');
const Item = require('../lib/item.js');
const User = require('../lib/user.js');

describe('user',()=>{
  describe('#getName',()=>{
    it('Should return name of the user',()=>{
      let user = new User('Madhuri');
      assert.equal(user.getName(),'Madhuri');
    });
  });

  describe('#getToDos',()=>{
    it('should return empty toDos',()=>{
      let user = new User('Madhuri');
      assert.deepEqual(user.getToDos(),{});
    });
    it('should return all toDos',()=>{
      let user = new User('Madhuri');
      user.addToDo("Today's Work",1001,"Planning of the day");
      user.addToDo("Tomorrow's Work",1002,"Planning of the day");
      let expected = {
        1001:{title:"Today's Work",description:"Planning of the day",
        itemId:0,items:{},toDoId:1001},
        1002:{title:"Tomorrow's Work",description:"Planning of the day",
        itemId:0,items:{},toDoId:1002}}
      assert.deepEqual(user.getToDos(),expected);
    })
  });

  describe('#addToDo',()=>{
    it('should add List to do toDo', ()=>{
      let user = new User('Madhuri');
      user.addToDo("Today's Work",1001,"Planning of the day");
      let expected = {1001:{title:"Today's Work",
                      description:"Planning of the day",
                      itemId:0,items:{},toDoId:1001}}
      assert.deepEqual(user.getToDos(),expected);
    });
  });

  describe('#getToDoId',()=>{
    it('should return toDoId',()=>{
      let user = new User('Madhuri');
      assert.equal(user.getToDoId(),1000);
    });
  });

  describe('#deleteToDo',()=>{
    it('should delete list from toDos',()=>{
      let user = new User('Madhuri');
      user.addToDo("Today's Work",1001,"Planning of the day");
      user.deleteToDo(1001);
      assert.deepEqual(user.getToDos(),{});
    });
  });

  describe('#getToDo',()=>{
    it('should return toDo from toDos',()=>{
      let user = new User('Madhuri');
      user.addToDo("Today's Work",1001,"Planning of the day");
      user.addToDo("Tomorrow's Work",1002,"Planning of the day");
      let expected = {
        title:"Today's Work",description:"Planning of the day",
        itemId:0,items:{},toDoId:1001}
      assert.deepEqual(user.getToDo(1001),expected);
    });
  });

  describe('#editToDo',()=>{
    it('should edit title of the toDo', ()=>{
      let user = new User('Madhuri');
      user.addToDo("Today's Work",1001,"Planning of the day");
      user.editToDoTitle(1001,"Tomorrow's Work");
      let expected = {
        title:"Tomorrow's Work",description:"Planning of the day",
        itemId:0,items:{},toDoId:1001}
      assert.deepEqual(user.getToDo(1001),expected);
    });
  });

  describe('#editToDoDescription',()=>{
    it('should edit description of the toDo', ()=>{
      let user = new User('Madhuri');
      user.addToDo("Today's Work",1001,"Planning of the day");
      user.editToDoDescription(1001,"Planning");
      let expected = {
        title:"Today's Work",
        description:"Planning",
        itemId:0,
        items:{},
        toDoId:1001}
      assert.deepEqual(user.getToDo(1001),expected);
    });
  });

  describe('#addItem',()=>{
    it('should add item in the toDo', ()=>{
      let user = new User('Madhuri');
      user.addToDo("Today's Work",1001,"Planning of the day");
      user.addItem("Reading",1001);
      let expected = {1:{itemText:"Reading",status:false,itemId:1}}
      assert.deepEqual(user.getItems(1001),expected);
    });
  });

  describe('#deleteItem',()=>{
    it('should delete item from the toDos', ()=>{
      let user = new User('Madhuri');
      user.addToDo("Today's Work",1001,"Planning of the day");
      user.addItem("Reading",1001);
      user.deleteItem(1001,1);
      let expected = {}
      assert.deepEqual(user.getItems(1001),expected);
    });
  });

  describe('#editItem',()=>{
    it('should edit item from the ToDo',()=>{
      let user = new User('Madhuri');
      user.addToDo("Today's Work",1001,"Planning of the day");
      user.addItem("Reading",1001);
      user.editItem(1001,1,"Running");
      let expected = {itemText:"Running",status:false,itemId:1}
      assert.deepEqual(user.getItem(1001,1),expected);
    });
  });

  describe('#markItemAsDone',()=>{
    it('should mark item as true',()=>{
      let user = new User('Madhuri');
      user.addToDo("Today's Work",1001,"Planning of the day");
      user.addItem("Reading",1001);
      user.markItemAsDone(1001,1);
      let expected = {itemText:"Reading",status:true,itemId:1}
      assert.deepEqual(user.getItem(1001,1),expected);
    });
  });

  describe('#markItemAsNotDone',()=>{
    it('should mark item not done',()=>{
      let user = new User('Madhuri');
      user.addToDo("Today's Work",1001,"Planning of the day");
      user.addItem("Reading",1001,true);
      user.markItemAsNotDone(1001,1);
      let expected = {itemText:"Reading",status:false,itemId:1}
      assert.deepEqual(user.getItem(1001,1),expected);
    });
  });

  describe('#getItem',()=>{
    it('should return item of given itemId',()=>{
      let user = new User('Madhuri');
      user.addToDo("Today's Work",1001,"Planning of the day");
      user.addItem("Reading",1001);
      user.addItem("Running",1001);
      let expected = {itemText:"Running",itemId:2,status:false}
    assert.deepEqual(user.getItem(1001,2),expected);
    });
  });

  describe('#getItems',()=>{
    it('should return all items from given toDo',()=>{
      let user = new User('Madhuri');
      user.addToDo("Today's Work",1001,"Planning of the day");
      user.addItem("Reading",1001);
      user.addItem("Running",1001);
      let expected = {
        1:{itemText:"Reading",itemId:1,status:false},
        2:{itemText:"Running",itemId:2,status:false}}
      assert.deepEqual(user.getItems(1001),expected);
    });
  });
});
