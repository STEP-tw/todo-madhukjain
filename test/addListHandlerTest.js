const chai = require('chai');
const assert = chai.assert;
const AddListHandler = require('../handlers/addListHandler');
const request = require('./handlerRequestSimulator.js');
const th = require('./testHelper.js');
const TodoApp = require('../lib/todoApp');

let todoApp;

describe('AddListHandler',() => {
  describe('add todo when details are enough',() => {
    beforeEach(() => {
      todoApp=new TodoApp();
      todoApp.addUser('veera','admin@123');
    });
    it("should add todo to given user's todo list ",() => {
      const addListHandler=new AddListHandler(todoApp);
      const options = {
        user:{userName:"veera"},
        body:{title:'something',
          description:'hello'}
      };
      request(addListHandler.getRequestHandler(),options,(res) => {
        th.should_be_redirected_to(res,'index.html');
      });
    });
  });
  describe(' ignores adding  todo when details are not sufficient',() => {
    beforeEach(() => {
      todoApp=new TodoApp();
      todoApp.addUser('madhuri','admin@123');
    });
    it("should add todo to given user's todo list ",() => {
      const addListHandler=new AddListHandler(todoApp);
      const options = {
        user:{userName:"madhuri"},
        body:{description:'hello'}
      };
      request(addListHandler.getRequestHandler(),options,(res) => {
        th.status_is_ok(res);
        assert.equal(res.body,"");
      });
    });
  });
});
