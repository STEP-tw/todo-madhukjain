let DefaultHandler = require('./defaultHandler.js');

class UpdateItemHandler extends DefaultHandler{
  constructor(todoApp) {
    super();
    this.todoApp = todoApp;
  }
  execute(req,res){
    let user = req.user;
    let todoID = req.body.todoID;
    let itemID = req.body.itemID;
    let objective = req.body.objective;
    this.todoApp.updateItem(user.userName,todoID,itemID,objective);
    res.end();
  }
}

module.exports = UpdateItemHandler;
