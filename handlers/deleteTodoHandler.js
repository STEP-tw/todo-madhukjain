let DefaultHandler = require('./defaultHandler.js');

class DeleteTodoHandler extends DefaultHandler{
  constructor(todoApp) {
    super();
    this.todoApp=todoApp;
  }
  execute(req,res){
    let user = req.user;
    let todoID = req.body.todoID;
    this.todoApp.deleteTodo(user.userName,todoID);
    res.end()
  }
};

module.exports=DeleteTodoHandler;
