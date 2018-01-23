const DefaultHandler = require('./defaultHandler.js');

class UpdateTodoHandler extends DefaultHandler{
  constructor(todoApp) {
    super();
    this.todoApp = todoApp;
  }
  execute(req,res){
    const user = req.user;
    const todoID = req.body.todoID;
    const title = req.body.title;
    const description = req.body.description;
    this.todoApp.updateTodo(user.userName,todoID,title,description);
    res.end();
  }
}

module.exports = UpdateTodoHandler;
