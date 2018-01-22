const chai = require('chai');
const assert = chai.assert;
const UpdateItemHandler = require('../handlers/updateItemHandler.js');
const request = require('./handlerRequestSimulator.js');
const th = require('./testHelper.js');
const TodoApp = require('../lib/todoApp');

let todoApp;

describe('UpdateItemHandler',()=>{
  beforeEach(()=>{
    todoApp=new TodoApp();
    todoApp.addUser('madhuri','admin@123');
    todoApp.addTodo('madhuri','today','planning');
    todoApp.addItem('madhuri',1001,'good morning');
  });
  it('should update item by given objective',()=>{
    let updateItemHandler = new UpdateItemHandler(todoApp);
    let options = {
      user:{userName:"madhuri"},
      body:{todoID:1001,itemID:1,objective:'tomorrow'}
    }
    request(updateItemHandler.getRequestHandler(),options,(res) =>{
      assert.equal(res.statusCode,200);
    });
  });
});
