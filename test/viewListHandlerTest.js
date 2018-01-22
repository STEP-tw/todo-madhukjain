const chai = require('chai');
const assert = chai.assert;
const ViewListHandler = require('../handlers/viewListHandler');
const request = require('./handlerRequestSimulator.js');
const th = require('./testHelper.js');
const TodoApp = require('../lib/todoApp');

let todoApp;

describe('ViewListHandler',()=>{
  describe('',()=>{
    beforeEach(()=>{
      todoApp=new TodoApp();
      todoApp.addUser('madhuri','admin@123');
      todoApp.addTodo('madhuri','today','planning');
    });
    it("should return todos from given user's todoList",()=>{
      let viewListHandler = new ViewListHandler(todoApp);
      let options = {user:{userName:"madhuri"}}
      request(viewListHandler.getRequestHandler(),options,(res) =>{
        assert.equal(res.statusCode,200);
        th.body_contains(res,'today');
      });
    });
  });
});
