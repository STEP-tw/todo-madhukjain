const DefaultHandler = require('./defaultHandler.js');

class DeleteItemHandler extends DefaultHandler{
  constructor(todoApp) {
    super();
    this.todoApp=todoApp;
  }
  execute(req,res){
    const user = req.user;
    const todoID = req.body.todoID;
    const itemID = req.body.itemID;
    this.todoApp.deleteItem(user.userName,todoID,itemID);
    res.end();
  }
}

module.exports = DeleteItemHandler;
