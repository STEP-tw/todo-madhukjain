const chai = require('chai');
const assert = chai.assert;
const UpdateTodoHandler = require('../handlers/updateTodoHandler.js');
const request = require('./handlerRequestSimulator.js');
const TodoApp = require('../lib/todoApp');

let todoApp;

describe('UpdateTodoHandler',() => {
  beforeEach(() => {
    todoApp=new TodoApp();
    todoApp.addUser('madhuri','admin@123');
    todoApp.addTodo('madhuri','today','planning');
  });
  it('should edit todo of given todoID of given user',(done) => {
    const updateTodoHandler = new UpdateTodoHandler(todoApp);
    const options = {
      user:{userName:"madhuri"},
      body:{todoID:1001,title:'tomorrow',description:'Reading'}
    };
    request(updateTodoHandler.getRequestHandler(),options,(res) => {
      assert.equal(res.statusCode,200);
      done();
    });
  });
});
