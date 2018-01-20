let DefaultHandler = require('./defaultHandler.js');

class UpdateTodoHandler extends DefaultHandler{
  constructor(todoApp) {
    super();
    this.todoApp = todoApp;
  }
  execute(req,res){
    let user = req.user;
    let todoID = req.body.todoID;
    let title = req.body.title;
    let description = req.body.description;
    this.todoApp.updateTodo(user.userName,todoID,title,description);
    res.end();
  }
}

module.exports = UpdateTodoHandler;
