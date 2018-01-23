const DefaultHandler = require('./defaultHandler.js');

class DeleteTodoHandler extends DefaultHandler{
  constructor(todoApp) {
    super();
    this.todoApp=todoApp;
  }
  execute(req,res){
    const user = req.user;
    const todoID = req.body.todoID;
    this.todoApp.deleteTodo(user.userName,todoID);
    res.end();
  }
};

module.exports=DeleteTodoHandler;
