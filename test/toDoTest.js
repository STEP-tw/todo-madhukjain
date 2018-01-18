const chai = require('chai');
const assert = chai.assert;
const ToDo = require('../lib/toDo.js');
const Item = require('../lib/item.js');

describe("ToDo",()=>{
  describe("#getTitle",()=>{
    it("Should return title of the toDo",()=>{
      let toDo = new ToDo("Today's Work",1001,"Planning of the day");
      assert.equal(toDo.getTitle(),"Today's Work");
    });
  });

  describe("#getDescription",()=>{
    it("Should return description of the toDo",()=>{
      let toDo = new ToDo("Today's Work",1001,"Planning of the day");
      assert.equal(toDo.getDescription(),"Planning of the day");
    });
  });

  describe("#getItems",()=>{
    it("Should return whole empty ItemList from the toDo",()=>{
      let toDo = new ToDo("Today's Work",1001,"Planning of the day");
      assert.deepEqual(toDo.getItems(),{});
    });
    it("Should return whole ItemList from the toDo",()=>{
      let toDo = new ToDo("Today's Work",1001,"Planning of the day");
      toDo.addItem("Planning");
      toDo.addItem("Reading");
      let expected = {1:{itemText:"Planning",itemId:1,status:false},
                      2:{itemText:"Reading",itemId:2,status:false}}
      assert.deepEqual(toDo.getItems(),expected);
    });
  });

  describe("#getItem",()=>{
    it("Should return item from the toDo",()=>{
      let toDo = new ToDo("Today's Work",1001,"Planning of the day");
      toDo.addItem("Planning");
      toDo.addItem("Reading");
      assert.deepEqual(toDo.getItem(2),new Item("Reading",2));
    });
  });

  describe("#addItem",()=>{
    it("Should add item in the items",()=>{
      let toDo = new ToDo("Today's Work",1001,"Planning of the day");
      toDo.addItem("Planning");
      assert.deepEqual(toDo.getItems(),{1: new Item("Planning",1)});
    });
  });

  describe("#deleteItem",()=>{
    it("Should delete item from the items",()=>{
      let toDo = new ToDo("Today's Work",1001,"Planning of the day");
      toDo.addItem("Planning");
      toDo.addItem("Reading");
      let expected = {1:{itemText:"Planning",status:false,itemId:1},
                      2:{itemText:"Reading",status:false,itemId:2}};
      assert.deepEqual(toDo.getItems(),expected);
      toDo.deleteItem(1);
      assert.deepEqual(toDo.getItems(),{2: new Item("Reading",2)});
    });
  });

  describe('#editTitle',()=>{
    it('should edit title of the toDo',()=>{
      let toDo = new ToDo("Today's Work",1001,"Planning of the day");
      toDo.editTitle("Tomorrow's Work");
      assert.deepEqual(toDo.getTitle(),"Tomorrow's Work");
    });
  });

  describe('#editListDescription',()=>{
    it('should edit description of the toDo title',()=>{
      let toDo = new ToDo("Today's Work",1001,"Planning of the day");
      toDo.editDescription("Planning for tomorrow");
      assert.deepEqual(toDo.getDescription(),"Planning for tomorrow");
    });
  });

  describe('#getItemId',()=>{
    it('should return counter of items', ()=>{
      let toDo = new ToDo("Today's Work",1001,"Planning of the day");
      assert.equal(toDo.getItemId(),0);
    });
  });

  describe('#getId',()=>{
    it('should return id of toDo', ()=>{
      let toDo = new ToDo("Today's Work",1001,"Planning of the day");
      assert.equal(toDo.getId(),1001);
    });
  });
});
