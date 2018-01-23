const chai = require('chai');
const assert = chai.assert;
const TodoList = require('../lib/todoList.js');
const Item = require('../lib/item.js');
const User = require('../lib/user.js');

describe('user',() => {
  describe('#getName',() => {
    it('should return name of the user',() => {
      const user = new User('Madhuri',"admin@123");
      assert.equal(user.getName(),'Madhuri');
    });
  });

  describe('#getTodos',() => {
    it('should return empty todos',() => {
      const user = new User('Madhuri',"admin@123");
      assert.deepEqual(user.getTodos(),{});
    });
    it('should return all todos',() => {
      const user = new User('Madhuri',"admin@123");
      user.addTodo("Today's Work","Planning of the day");
      user.addTodo("Tomorrow's Work","Planning of the day");
      const expected = {
        1001:new TodoList("Today's Work",1001,"Planning of the day"),
        1002:new TodoList("Tomorrow's Work",1002,"Planning of the day")};
      assert.deepEqual(user.getTodos(),expected);
    });
  });

  describe('#addTodo',() => {
    it('should add list to todos', () => {
      const user = new User('Madhuri',"admin@123");
      user.addTodo("Today's Work","Planning of the day");
      const expected = {
        1001:new TodoList("Today's Work",1001,"Planning of the day")};
      assert.deepEqual(user.getTodos(),expected);
    });
  });

  describe('#deleteTodo',() => {
    it('should delete list from todos',() => {
      const user = new User('Madhuri',"admin@123");
      user.addTodo("Today's Work",1001,"Planning of the day");
      user.deleteTodo(1001);
      assert.deepEqual(user.getTodos(),{});
    });
  });

  describe('#getTodoByID',() => {
    it('should return todo from todos',() => {
      const user = new User('Madhuri',"admin@123");
      user.addTodo("Today's Work","Planning of the day");
      user.addTodo("Tomorrow's Work","Planning of the day");
      const expected =new TodoList("Today's Work",1001,"Planning of the day");
      assert.deepEqual(user.getTodoByID(1001),expected);
    });
  });

  describe('#updateTodoTitle',() => {
    it('should edit title of the toDo', () => {
      const user = new User('Madhuri',"admin@123");
      user.addTodo("Today's Work","Planning of the day");
      user.updateTodoTitle(1001,"Tomorrow's Work");
      const expected = new TodoList("Tomorrow's Work",1001,"Planning of the day");
      assert.deepEqual(user.getTodoByID(1001),expected);
    });
  });

  describe('#updateTodoDescription',() => {
    it('should edit description of the toDo', () => {
      const user = new User('Madhuri',"admin@123");
      user.addTodo("Today's Work",1001,"Planning of the day");
      user.updateTodoDescription(1001,"Planning");
      const expected = new TodoList("Today's Work",1001,"Planning");
      assert.deepEqual(user.getTodoByID(1001),expected);
    });
  });

  describe('#addItem',() => {
    it('should add objective in the toDo', () => {
      const user = new User('Madhuri',"admin@123");
      user.addTodo("Today's Work",1001,"Planning of the day");
      user.addItem("Reading",1001);
      const expected = {1:new Item("Reading",1)};
      assert.deepEqual(user.getItemsByID(1001),expected);
    });
  });

  describe('#deleteItem',() => {
    it('should delete item from the todos', () => {
      const user = new User('Madhuri',"admin@123");
      user.addTodo("Today's Work",1001,"Planning of the day");
      user.addItem("Reading",1001);
      user.deleteItem(1001,1);
      const expected = {};
      assert.deepEqual(user.getItemsByID(1001),expected);
    });
  });

  describe('#updateItem',() => {
    it('should edit item from the Todo',() => {
      const user = new User('Madhuri',"admin@123");
      user.addTodo("Today's Work",1001,"Planning of the day");
      user.addItem("Reading",1001);
      user.updateItem(1001,1,"Running");
      const expected = new Item("Running",1);
      assert.deepEqual(user.getItemByID(1001,1),expected);
    });
  });

  describe('#updateItemStatus',() => {
    it('should mark item as true',() => {
      const user = new User('Madhuri',"admin@123");
      user.addTodo("Today's Work",1001,"Planning of the day");
      user.addItem("Reading",1001);
      user.updateItemStatus(1001,1);
      const expected = new Item("Reading",1,true);
      assert.deepEqual(user.getItemByID(1001,1),expected);
    });
    it('should mark item as false',() => {
      const user = new User('Madhuri',"admin@123");
      user.addTodo("Today's Work",1001,"Planning of the day");
      user.addItem("Reading",1001,true);
      user.updateItemStatus(1001,1);
      const expected = new Item("Reading",1);
      assert.deepEqual(user.getItemByID(1001,1),expected);
    });
  });


  describe('#getItemByID',() => {
    it('should return item of given itemID from given listID',() => {
      const user = new User('Madhuri',"admin@123");
      user.addTodo("Today's Work",1001,"Planning of the day");
      user.addItem("Reading",1001);
      user.addItem("Running",1001);
      const expected = new Item("Running",2);
      assert.deepEqual(user.getItemByID(1001,2),expected);
    });
  });

  describe('#getItemsByID',() => {
    it('should return all items from given todoID',() => {
      const user = new User('Madhuri',"admin@123");
      user.addTodo("Today's Work",1001,"Planning of the day");
      user.addItem("Reading",1001);
      user.addItem("Running",1001);
      const expected = {
        1:new Item("Reading",1),
        2:new Item("Running",2)};
      assert.deepEqual(user.getItemsByID(1001),expected);
    });
  });

  describe('#getTodoDescription',() => {
    it('should return toDo description of given toDoID',() => {
      const user = new User('Madhuri',"admin@123");
      user.addTodo("Today's Work","Planning of the day");
      const expected = "Planning of the day";
      assert.deepEqual(user.getTodoDescription(1001),expected);
    });
  });

  describe('#isValidPassword',() => {
    it('should return true if password is same as  the user password',() => {
      const user = new User('Madhuri',"admin@123","admin@123");
      assert.isOk(user.isValidPassword("admin@123"));
    });
  });
});
