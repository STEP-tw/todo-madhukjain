const DeleteItemHandler = require('../handlers/deleteItemHandler.js');
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
      const deleteItemHandler = new DeleteItemHandler(todoApp);
      const options ={
        user:{userName:"madhuri"},
        body:{todoID:1001,itemID:1}
      };
      request(deleteItemHandler.getRequestHandler(),options,(res) => {
        res.statusCode = 200;
        th.body_contains(res,'');
        done();
      });
    });
  });
});
