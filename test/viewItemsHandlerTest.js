const chai = require('chai');
const assert = chai.assert;
const ViewItemsHandler = require('../handlers/viewItemsHandler.js');
const request = require('./handlerRequestSimulator.js');
const th = require('./testHelper.js');
const TodoApp = require('../lib/todoApp');

let todoApp;

describe('ViewItemsHandler',()=>{
  describe('',()=>{
    beforeEach(()=>{
      todoApp=new TodoApp();
      todoApp.addUser('madhuri','admin@123');
      todoApp.addTodo('madhuri','today','planning');
      todoApp.addItem('madhuri',1001,'good morning');
    });
    it('should display all items from given todoID of given user',(done)=>{
      let viewItemsHandler = new ViewItemsHandler(todoApp);
      request(viewItemsHandler.getRequestHandler(),{user:{userName:"madhuri"},body:{todoID:1001}},(res) =>{
        assert.equal(res.statusCode,200);
        th.body_contains(res,'good morning');
        done();
    });
  });
  });
});
