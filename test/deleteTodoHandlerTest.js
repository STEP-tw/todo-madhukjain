const chai = require('chai');
const assert = chai.assert;
const DeleteTodoHandler = require('../handlers/deleteTodoHandler.js');
const request = require('./handlerRequestSimulator.js');
const th = require('./testHelper.js');
const TodoApp = require('../lib/todoApp');

let todoApp;
describe('DeleteTodoHandler',()=>{
  describe('',()=>{
    beforeEach(()=>{
      todoApp=new TodoApp();
      todoApp.addUser('madhuri','admin@123');
      todoApp.addTodo('madhuri','today','planning');
    });
    it('should delete todo of given todoID of gievn user',()=>{
      let deleteTodoHandler = new DeleteTodoHandler(todoApp);
      request(deleteTodoHandler.getRequestHandler(),{user:{userName:"madhuri"},body:{todoID:1001}},(res) =>{
        assert.equal(res.statusCode,200);
        th.body_does_not_contain(res,'today');
      });
    });
  });
});
