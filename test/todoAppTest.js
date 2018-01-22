const chai = require('chai');
const assert = chai.assert;
const TodoApp = require('../lib/TodoApp.js');

describe('todoApp',()=>{
  describe('accesing data',()=>{
    describe('#getUser',()=>{
      it('should get user of given name from users',()=>{
        let todoApp = new TodoApp();
        assert.deepEqual(todoApp.getUser('madhuri'),false);
      });
    });
    describe('#getItems',()=>{
      it('should return all items from given user of given todoId',()=>{
        let todoApp = new TodoApp();
        todoApp.addUser('madhuri','admin@123');
        todoApp.addTodo('madhuri',"Today","Planning");
        todoApp.addItem('madhuri',1001,'good morning');
        let expected = {
          1:{objective:'good morning',itemId:1,status:false}
        }
        assert.deepEqual(todoApp.getItems('madhuri',1001),expected);
      });
    });
  });
  describe('updating data',()=>{
    describe('#addUser',()=>{
      it('should add given user in users',()=>{
        let todoApp = new TodoApp();
        todoApp.addUser('madhuri','admin@123');
        let expected = {
          name : 'madhuri',
          password : 'admin@123',
          todos : {},
          todoID :1000
        }
        assert.deepEqual(todoApp.getUser('madhuri'),expected);
      });
    });
    describe('#addTodo',()=>{
      it('should add todo to given user',()=>{
        let todoApp = new TodoApp();
        todoApp.addUser('madhuri','admin@123');
        todoApp.addTodo('madhuri',"Today","Planning");
        let expected = {
          name : 'madhuri',
          password : 'admin@123',
          todos : {
            "1001":{
              title:"Today",
              description:"Planning",
              items :{},
              itemId :0,
              toDoId :1001
          }
        },
          todoID :1001
        }
        assert.deepEqual(todoApp.getUser('madhuri'),expected);
      });
    });
    describe('#deleteList',()=>{
      it('should delete todo from given todoId of given user',()=>{
        let todoApp = new TodoApp();
        todoApp.addUser('madhuri','admin@123');
        todoApp.addTodo('madhuri',"Today","Planning");
        todoApp.deleteTodo('madhuri',1001);
        let expected = {
          name : 'madhuri',
          password : 'admin@123',
          todos : {},
          todoID :1001
        }
        assert.deepEqual(todoApp.getUser('madhuri'),expected);
      });
    });
    describe('#updateTodo',()=>{
      it('should update with given objective and description',()=>{
        let todoApp = new TodoApp();
        todoApp.addUser('madhuri','admin@123');
        todoApp.addTodo('madhuri',"Today","Planning");
        todoApp.updateTodo('madhuri',1001,'tommorow','Reading');
        let expected = {
          name : 'madhuri',
          password : 'admin@123',
          todoID :1001,
          todos : {
            "1001":{
              title:"tommorow",
              description:"Reading",
              items :{},
              itemId :0,
              toDoId :1001
          },
        }
      }
        assert.deepEqual(todoApp.getUser('madhuri'),expected);
      });
    });
    describe('#addItem',()=>{
      it('should add item to given todoID of todos of given user',()=>{
        let todoApp = new TodoApp();
        todoApp.addUser('madhuri','admin@123');
        todoApp.addTodo('madhuri',"Today","Planning");
        todoApp.addItem('madhuri',1001,'Good morning');
        let expected = {
          1:{objective:'Good morning',itemId:1,status:false}
        }
        assert.deepEqual(todoApp.getItems('madhuri',1001),expected);
      });
    });
    describe('#deleteItem',()=>{
      it('should delete item from given todoID of given user',()=>{
        let todoApp = new TodoApp();
        todoApp.addUser('madhuri','admin@123');
        todoApp.addTodo('madhuri',"Today","Planning");
        todoApp.addItem('madhuri',1001,'Good morning');
        todoApp.deleteItem('madhuri',1001,1);
        let expected = {}
        assert.deepEqual(todoApp.getItems('madhuri',1001),expected);
      })
     })
  });
});
