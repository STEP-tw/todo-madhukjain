const chai = require('chai');
const assert = chai.assert;
const ViewItemsHandler = require('../handlers/viewItemsHandler.js');
const request = require('./handlerRequestSimulator.js');
const th = require('./testHelper.js');
const TodoApp = require('../lib/todoApp');

let todoApp;

describe('ViewItemsHandler',() => {
  beforeEach(() => {
    todoApp=new TodoApp();
    todoApp.addUser('madhuri','admin@123');
    todoApp.addTodo('madhuri','today','planning');
    todoApp.addItem('madhuri',1001,'good morning');
  });
  it('should display all items from given todoID of given user',(done) => {
    const viewItemsHandler = new ViewItemsHandler(todoApp);
    const options = {user:{userName:"madhuri"},body:{todoID:1001}};
    request(viewItemsHandler.getRequestHandler(),options,(res) => {
      assert.equal(res.statusCode,200);
      th.body_contains(res,'good morning');
      done();
    });
  });
  it('body should contain when status of item is true',(done) => {
    todoApp.addItem('madhuri',1001,'good bye',true);
    const viewItemsHandler = new ViewItemsHandler(todoApp);
    const options = {user:{userName:"madhuri"},body:{todoID:1001}};
    request(viewItemsHandler.getRequestHandler(),options,(res) => {
      assert.equal(res.statusCode,200);
      th.body_contains(res,'good bye');
      th.body_contains(res,'line-through');
      done();
    });
  });
});
