let DefaultHandler = require('./defaultHandler.js');

class DeleteTodoHandler extends DefaultHandler{
  constructor(todoApp) {
    super();
    this.todoApp=todoApp;
  }
  execute(req,res){
    let user = req.user;
    let todoID = req.body.todoID;
    if(this.todoApp[user.userName]){
      this.todoApp.deleteTodo(user.userName,todoID);
    }
  }
};

module.exports=DeleteTodoHandler;
