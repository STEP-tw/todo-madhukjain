const chai = require('chai');
const assert = chai.assert;
const UpdateStatusHandler = require('../handlers/updateStatusHandler.js');
const request = require('./handlerRequestSimulator.js');
const th = require('./testHelper.js');
const TodoApp = require('../lib/todoApp');

let todoApp;

describe('UpdateStatusHandler',() => {
  beforeEach(() => {
    todoApp=new TodoApp();
    todoApp.addUser('madhuri','admin@123');
    todoApp.addTodo('madhuri','today','planning');
    todoApp.addItem('madhuri',1001,'good morning');
  });
  it('should change status as true of given todo of given user',(done) => {
    const updateStatusHandler = new UpdateStatusHandler(todoApp);
    const options = {user:{userName:"madhuri"},body:{todoID:1001,itemID:1}};
    request(updateStatusHandler.getRequestHandler(),options,(res) => {
      assert.equal(res.statusCode,200);
      th.body_contains(res,'');
      done();
    });
  });
});
