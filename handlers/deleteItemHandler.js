let DefaultHandler = require('./defaultHandler.js');

class DeleteItemHandler extends DefaultHandler{
  constructor(todoApp) {
    super();
    this.todoApp=todoApp;
  }
  execute(req,res){
    let user = req.user;
    let todoID = req.body.todoID;
    let itemID = req.body.itemID;
    this.todoApp.deleteItem(user.userName,todoID,itemID);
    res.end();
  }
}

module.exports = DeleteItemHandler;
