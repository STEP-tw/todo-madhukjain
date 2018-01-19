const chai = require('chai');
const assert = chai.assert;
const TodoList = require('../lib/todoList.js');
const Item = require('../lib/item.js');

describe("TodoList",()=>{
  describe("#getTitle",()=>{
    it("should return title of the todo",()=>{
      let todo = new TodoList("Today's Work",1001,"Planning of the day");
      assert.equal(todo.getTitle(),"Today's Work");
    });
  });

  describe("#getDescription",()=>{
    it("should return description of the todo",()=>{
      let todo = new TodoList("Today's Work",1001,"Planning of the day");
      assert.equal(todo.getDescription(),"Planning of the day");
    });
  });

  describe("#getItems",()=>{
    it("should return empty item list from the todo",()=>{
      let todo = new TodoList("Today's Work",1001,"Planning of the day");
      assert.deepEqual(todo.getItems(),{});
    });
    it("should return whole item list from the todo",()=>{
      let todo = new TodoList("Today's Work",1001,"Planning of the day");
      todo.addItem("Planning");
      todo.addItem("Reading");
      let expected = {
        1:new Item('Planning',1),
        2:new Item('Reading',2)
      };
      let actual=todo.getItems();
      assert.deepEqual(actual,expected);
    });
  });

  describe("#getItemById",()=>{
    it("should return item from the todo",()=>{
      let todo = new TodoList("Today's Work",1001,"Planning of the day");
      todo.addItem("Planning");
      todo.addItem("Reading");
      assert.deepEqual(todo.getItemById(2),new Item("Reading",2));
    });
  });

  describe("#addItem",()=>{
    it("should add item in the items",()=>{
      let todo = new TodoList("Today's Work",1001,"Planning of the day");
      todo.addItem("Planning");
      assert.deepEqual(todo.getItems(),{1: new Item("Planning",1)});
    });
  });

  describe("#deleteItem",()=>{
    it("should delete item from the items",()=>{
      let todo = new TodoList("Today's Work",1001,"Planning of the day");
      todo.addItem("Planning");
      todo.addItem("Reading");
      let expected = {
        1:new Item('Planning',1),
        2:new Item('Reading',2)
      };
      assert.deepEqual(todo.getItems(),expected);
      todo.deleteItem(1);
      assert.deepEqual(todo.getItems(),{2: new Item("Reading",2)});
    });
  });

  describe('#updateTitle',()=>{
    it('should edit title of the todo',()=>{
      let todo = new TodoList("Today's Work",1001,"Planning of the day");
      todo.updateTitle("Tomorrow's Work");
      assert.deepEqual(todo.getTitle(),"Tomorrow's Work");
    });
  });

  describe('#updateListDescription',()=>{
    it('should update description of the todo title',()=>{
      let todo = new TodoList("Today's Work",1001,"Planning of the day");
      todo.updateDescription("Planning for tomorrow");
      assert.deepEqual(todo.getDescription(),"Planning for tomorrow");
    });
  });


  describe('#getId',()=>{
    it('should return id of todo', ()=>{
      let todo = new TodoList("Today's Work",1001,"Planning of the day");
      assert.equal(todo.getId(),1001);
    });
  });
});
