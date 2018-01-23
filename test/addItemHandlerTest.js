const chai = require('chai');
const assert = chai.assert;
const AddItemHandler = require('../handlers/addItemHandler.js');
const request = require('./handlerRequestSimulator.js');
const th = require('./testHelper.js');
const TodoApp = require('../lib/todoApp');

let todoApp;

describe('AddItemHandler',() => {
  describe('',() => {
    beforeEach(() => {
      todoApp=new TodoApp();
      todoApp.addUser('madhuri','admin@123');
      todoApp.addTodo('madhuri','today','planning');
    });
    it('should add given item to given todoID of given user',(done) => {
      const addItemHandler = new AddItemHandler(todoApp);
      const options ={
        user:{userName:"madhuri"},
        body:{todoID:1001,title:'good morning'}
      };
      request(addItemHandler.getRequestHandler(),options,(res) => {
        th.should_be_redirected_to(res,'/todoItem.html?todoID=1001');
        done();
      });
    });
  });
});
