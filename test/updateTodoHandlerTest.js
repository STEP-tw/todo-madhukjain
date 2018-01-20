const chai = require('chai');
const assert = chai.assert;
const UpdateTodoHandler = require('../handlers/updateTodoHandler.js');
const request = require('./handlerRequestSimulator.js');
const th = require('./testHelper.js');
const TodoApp = require('../lib/todoApp');

let todoApp;

describe('UpdateTodoHandler',()=>{
  describe('',()=>{
    beforeEach(()=>{
      todoApp=new TodoApp();
      todoApp.addUser('madhuri','admin@123');
      todoApp.addTodo('madhuri','today','planning');
    });
    it('should edit todo of given todoID of given user',done=>{
      let updateTodoHandler = new UpdateTodoHandler(todoApp);
      request(updateTodoHandler.getRequestHandler(),{user:{userName:"madhuri"},body:{todoID:1001,title:'tomorrow',description:'Reading'}},(res) =>{
        assert.equal(res.statusCode,200);
        done();
      });
    });
  });
});
