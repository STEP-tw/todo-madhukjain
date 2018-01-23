const DefaultHandler = require('./defaultHandler.js');

class UpdateItemHandler extends DefaultHandler{
  constructor(todoApp) {
    super();
    this.todoApp = todoApp;
  }
  execute(req,res){
    const user = req.user;
    const todoID = req.body.todoID;
    const itemID = req.body.itemID;
    const objective = req.body.objective;
    this.todoApp.updateItem(user.userName,todoID,itemID,objective);
    res.end();
  }
}

module.exports = UpdateItemHandler;
